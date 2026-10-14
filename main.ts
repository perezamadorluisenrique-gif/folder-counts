import {
  App,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  TAbstractFile,
  TFile,
  TFolder,
  WorkspaceLeaf,
  debounce,
  setTooltip,
} from 'obsidian';
import type { SettingDefinitionItem } from 'obsidian';

import {
  countTree,
  describe,
  emptyCount,
  formatAmount,
  fromLegacy,
  parseExtensions,
  parseFolders,
  shownCount,
  statusText,
  toggleFolder,
} from './src/count.ts';
import type { CountMode, CountOptions, FolderCount, LegacySettings, TreeFile } from './src/count.ts';
import { t } from './src/i18n.ts';
import { WordCache, countWords } from './src/words.ts';

interface FolderCountsSettings extends CountOptions {
  /** Keep the number on an expanded folder that has subfolders. */
  showOnExpanded: boolean;
  /** Leave folders with nothing to count blank. */
  hideZero: boolean;
  /** 1.2k instead of 1234. */
  compact: boolean;
  /** The whole vault's count in the status bar. */
  showVaultTotal: boolean;
  /** Set once the File Explorer Note Count settings have been offered. */
  legacyChecked: boolean;
}

const DEFAULT_SETTINGS: FolderCountsSettings = {
  mode: 'notes',
  extensions: ['md'],
  excludeExtensions: false,
  recursive: true,
  excludedFolders: [],
  showOnExpanded: false,
  hideZero: false,
  compact: false,
  showVaultTotal: false,
  legacyChecked: false,
};

/** Where File Explorer Note Count keeps its settings, relative to the config folder. */
const LEGACY_DATA = 'plugins/file-explorer-note-count/data.json';

const BADGE = 'folder-counts-badge';

/** The file explorer's own item table. Not public API, but stable since 0.x and used by every plugin in this niche. */
interface ExplorerItem {
  file: TAbstractFile;
  selfEl: HTMLElement;
}
interface ExplorerView {
  fileItems?: Record<string, ExplorerItem>;
}

const MODES: Record<CountMode, string> = {
  notes: t('mode.notes'),
  files: t('mode.files'),
  custom: t('mode.custom'),
  words: t('mode.words'),
  size: t('mode.size'),
};

/** Notes read per batch when counting words, and the pause between batches. */
const WORD_BATCH = 20;
/** Typing saves a note every couple of seconds; recount words once it has been quiet this long. */
const MODIFY_DELAY = 1500;

/** Names and descriptions shared by the 1.13+ declarative tab and the older `display()`. */
const TEXT = {
  mode: { name: t('setting.mode.name'), desc: t('setting.mode.desc') },
  extensions: { name: t('setting.extensions.name'), desc: t('setting.extensions.desc') },
  excludeExtensions: { name: t('setting.excludeExtensions.name'), desc: t('setting.excludeExtensions.desc') },
  recursive: { name: t('setting.recursive.name'), desc: t('setting.recursive.desc') },
  showOnExpanded: { name: t('setting.showOnExpanded.name'), desc: t('setting.showOnExpanded.desc') },
  hideZero: { name: t('setting.hideZero.name'), desc: t('setting.hideZero.desc') },
  compact: { name: t('setting.compact.name'), desc: t('setting.compact.desc') },
  showVaultTotal: { name: t('setting.showVaultTotal.name'), desc: t('setting.showVaultTotal.desc') },
  excludedFolders: { name: t('setting.excludedFolders.name'), desc: t('setting.excludedFolders.desc') },
  legacy: { name: t('setting.legacy.name'), desc: t('setting.legacy.desc') },
};

export default class FolderCountsPlugin extends Plugin {
  settings: FolderCountsSettings = { ...DEFAULT_SETTINGS };
  private counts = new Map<string, FolderCount>();
  private statusEl: HTMLElement | null = null;
  private enabled = true;
  private words = new WordCache();
  /** Notes whose words are not known yet; the background job drains it. */
  private pending: TreeFile[] = [];
  private wordsJobRunning = false;
  private lastPaint = 0;

  /** Vault events arrive in bursts (a sync, a folder move); count once they settle. */
  private scheduleRefresh = debounce(() => this.refresh(), 200, true);
  /** Edits to a note change its words and size, but only matter in those modes. */
  private scheduleModifyRefresh = debounce(() => this.refresh(), MODIFY_DELAY, true);

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new FolderCountsSettingTab(this.app, this));
    this.applyBodyClasses();

    this.addCommand({
      id: 'toggle',
      name: t('command.toggle'),
      icon: 'hash',
      callback: () => {
        this.enabled = !this.enabled;
        if (this.enabled) this.refresh();
        else this.clearBadges();
        this.updateStatusBar();
      },
    });
    this.addCommand({
      id: 'refresh',
      name: t('command.refresh'),
      icon: 'refresh-cw',
      callback: () => this.refresh(),
    });

    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file) => {
        if (!(file instanceof TFolder) || file.isRoot()) return;
        const excluded = this.settings.excludedFolders.includes(file.path);
        menu.addItem((item) =>
          item
            .setTitle(excluded ? t('menu.includeFolder') : t('menu.excludeFolder'))
            .setIcon(excluded ? 'eye' : 'eye-off')
            .setSection('action')
            .onClick(() => void this.toggleExcluded(file.path)),
        );
      }),
    );

    this.app.workspace.onLayoutReady(() => {
      this.refresh();
      this.registerEvent(this.app.vault.on('create', () => this.scheduleRefresh()));
      this.registerEvent(
        this.app.vault.on('delete', (file) => {
          this.words.delete(file.path);
          this.scheduleRefresh();
        }),
      );
      this.registerEvent(
        this.app.vault.on('rename', (file, oldPath) => {
          this.words.rename(oldPath, file.path);
          this.scheduleRefresh();
        }),
      );
      this.registerEvent(
        this.app.vault.on('modify', (file) => {
          if (file instanceof TFile && (this.settings.mode === 'words' || this.settings.mode === 'size')) this.scheduleModifyRefresh();
        }),
      );
      // A file explorer opened later (or re-created by a workspace change) starts without badges.
      this.registerEvent(this.app.workspace.on('layout-change', () => this.paint()));
      void this.offerLegacyImport();
    });
  }

  onunload() {
    this.enabled = false;
    this.clearBadges();
    activeDocument.body.removeClass('folder-counts-show-expanded');
  }

  async loadSettings() {
    const data = (await this.loadData()) as Partial<FolderCountsSettings> | null;
    this.settings = { ...DEFAULT_SETTINGS, ...(data ?? {}) };
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.applyBodyClasses();
    this.refresh();
  }

  private applyBodyClasses() {
    activeDocument.body.toggleClass('folder-counts-show-expanded', this.settings.showOnExpanded);
  }

  async toggleExcluded(path: string) {
    this.settings.excludedFolders = toggleFolder(this.settings.excludedFolders, path);
    await this.saveSettings();
  }

  private explorers(): ExplorerView[] {
    return this.app.workspace
      .getLeavesOfType('file-explorer')
      .map((leaf: WorkspaceLeaf) => leaf.view as unknown as ExplorerView)
      .filter((view) => view.fileItems);
  }

  /** Count the whole vault in one pass, then draw. */
  refresh() {
    if (!this.enabled) return;
    const pending: TreeFile[] = [];
    this.counts = countTree(
      this.app.vault.getRoot(),
      this.settings,
      (file) => this.words.get(file.path, file.stat?.mtime ?? 0),
      pending,
    );
    this.pending = pending;
    this.lastPaint = Date.now();
    this.paint();
    this.updateStatusBar();
    if (pending.length > 0) void this.countWordsInBackground();
  }

  /**
   * Read the notes whose words are unknown a few at a time, handing the
   * thread back between batches so a big vault never freezes the app, and
   * redraw now and then so the numbers fill in as they go.
   */
  private async countWordsInBackground() {
    if (this.wordsJobRunning) return;
    this.wordsJobRunning = true;
    try {
      while (this.enabled && this.settings.mode === 'words' && this.pending.length > 0) {
        const batch = this.pending.splice(0, WORD_BATCH);
        for (const item of batch) {
          const file = this.app.vault.getAbstractFileByPath(item.path);
          if (!(file instanceof TFile)) continue;
          const mtime = file.stat.mtime;
          try {
            this.words.set(file.path, mtime, countWords(await this.app.vault.cachedRead(file)));
          } catch {
            // Unreadable: remember it as empty until it changes, so it is not retried in a loop.
            this.words.set(file.path, mtime, 0);
          }
        }
        if (Date.now() - this.lastPaint > 400 && this.pending.length > 0) this.refresh();
        await new Promise<void>((resolve) => window.setTimeout(resolve, 10));
      }
    } finally {
      this.wordsJobRunning = false;
    }
    // Whatever was read last, or changed on the way, goes up now.
    if (this.enabled && this.settings.mode === 'words') this.refresh();
  }

  /** Put the current counts on every folder of every file explorer. */
  private paint() {
    if (!this.enabled) return;
    for (const view of this.explorers()) {
      for (const [path, item] of Object.entries(view.fileItems ?? {})) {
        if (!(item.file instanceof TFolder)) continue;
        const count = this.counts.get(path);
        this.paintFolder(item.selfEl, count);
      }
    }
  }

  private paintFolder(selfEl: HTMLElement, count: FolderCount | undefined) {
    let badge = selfEl.querySelector<HTMLElement>(`:scope > .${BADGE}`);
    const n = count ? shownCount(count, this.settings.recursive) : 0;
    if (!count || (this.settings.hideZero && n === 0)) {
      badge?.remove();
      return;
    }
    if (!badge) badge = selfEl.createDiv({ cls: BADGE });
    const text = formatAmount(n, this.settings, this.settings.compact);
    badge.toggleClass('is-pending', (this.settings.recursive ? count.totalTally : count.directTally).pending > 0);
    if (badge.textContent !== text) badge.setText(text);
    badge.toggleClass('has-subfolders', count.subfolders > 0);
    const tooltip = describe(count, this.settings);
    if (badge.dataset.tooltip !== tooltip) {
      badge.dataset.tooltip = tooltip;
      setTooltip(badge, tooltip, { placement: 'right' });
    }
  }

  private clearBadges() {
    for (const view of this.explorers()) {
      for (const item of Object.values(view.fileItems ?? {})) item.selfEl.querySelector(`:scope > .${BADGE}`)?.remove();
    }
  }

  private updateStatusBar() {
    const show = this.enabled && this.settings.showVaultTotal;
    if (!show) {
      this.statusEl?.remove();
      this.statusEl = null;
      return;
    }
    this.statusEl ??= this.addStatusBarItem();
    this.statusEl.addClass('folder-counts-status');
    const root = this.counts.get('/') ?? emptyCount();
    this.statusEl.setText(statusText(root, this.settings, this.settings.compact));
    setTooltip(this.statusEl, t('tooltip.vault', { description: describe(root, this.settings) }), { placement: 'top' });
  }

  private async readLegacy(): Promise<LegacySettings | null> {
    const path = `${this.app.vault.configDir}/${LEGACY_DATA}`;
    if (!(await this.app.vault.adapter.exists(path))) return null;
    try {
      return JSON.parse(await this.app.vault.adapter.read(path)) as LegacySettings;
    } catch {
      return null;
    }
  }

  /** Copy File Explorer Note Count's settings. Returns false if there were none. */
  async importLegacy(): Promise<boolean> {
    const legacy = await this.readLegacy();
    if (!legacy) return false;
    Object.assign(this.settings, fromLegacy(legacy), { legacyChecked: true });
    await this.saveSettings();
    return true;
  }

  /** On first run, adopt the original's settings silently and say so once. */
  private async offerLegacyImport() {
    if (this.settings.legacyChecked) return;
    const imported = await this.importLegacy();
    if (imported) new Notice(t('notice.adopted'), 10000);
    this.settings.legacyChecked = true;
    await this.saveData(this.settings);
  }
}

class FolderCountsSettingTab extends PluginSettingTab {
  constructor(
    app: App,
    private plugin: FolderCountsPlugin,
  ) {
    super(app, plugin);
  }

  /**
   * The settings, described rather than drawn. Obsidian 1.13 and later
   * renders this itself and indexes it for the settings search. Older
   * versions ignore it and call `display()`.
   */
  getSettingDefinitions(): SettingDefinitionItem[] {
    const s = this.plugin.settings;
    return [
      {
        type: 'group',
        heading: t('heading.counting'),
        items: [
          { ...TEXT.mode, control: { type: 'dropdown', key: 'mode', options: MODES, defaultValue: DEFAULT_SETTINGS.mode } },
          {
            ...TEXT.extensions,
            visible: () => s.mode === 'custom',
            control: { type: 'text', key: 'extensions', placeholder: 'md, canvas, pdf', defaultValue: 'md' },
          },
          {
            ...TEXT.excludeExtensions,
            visible: () => s.mode === 'custom',
            control: { type: 'toggle', key: 'excludeExtensions', defaultValue: false },
          },
          { ...TEXT.recursive, control: { type: 'toggle', key: 'recursive', defaultValue: true } },
          {
            ...TEXT.excludedFolders,
            control: { type: 'textarea', key: 'excludedFolders', rows: 4, placeholder: 'Archive\n**/attachments', defaultValue: '' },
          },
        ],
      },
      {
        type: 'group',
        heading: t('heading.display'),
        items: [
          { ...TEXT.showOnExpanded, control: { type: 'toggle', key: 'showOnExpanded', defaultValue: false } },
          { ...TEXT.hideZero, control: { type: 'toggle', key: 'hideZero', defaultValue: false } },
          { ...TEXT.compact, control: { type: 'toggle', key: 'compact', defaultValue: false } },
          { ...TEXT.showVaultTotal, control: { type: 'toggle', key: 'showVaultTotal', defaultValue: false } },
        ],
      },
      { ...TEXT.legacy, action: () => void this.importLegacy() },
    ];
  }

  /** The lists are stored as arrays but edited as text. */
  getControlValue(key: string): unknown {
    const s = this.plugin.settings;
    if (key === 'extensions') return s.extensions.join(', ');
    if (key === 'excludedFolders') return s.excludedFolders.join('\n');
    return (s as unknown as Record<string, unknown>)[key];
  }

  async setControlValue(key: string, value: unknown): Promise<void> {
    const s = this.plugin.settings;
    if (key === 'extensions') s.extensions = parseExtensions(String(value));
    else if (key === 'excludedFolders') s.excludedFolders = parseFolders(String(value));
    else Object.assign(s, { [key]: value });
    await this.plugin.saveSettings();
    // Obsidian 1.13's re-check of `visible`, looked up because older versions lack it.
    if (key === 'mode') (this as unknown as { refreshDomState?: () => void }).refreshDomState?.();
  }

  private async importLegacy() {
    if (await this.plugin.importLegacy()) {
      new Notice(t('notice.imported'));
      this.redraw();
    } else new Notice(t('notice.noLegacy'));
  }

  private redraw() {
    if (this.legacy) {
      this.draw();
      return;
    }
    // Obsidian 1.13's re-render of the declarative definitions, looked up because older versions lack it.
    (this as unknown as { update?: () => void }).update?.();
  }

  private legacy = false;

  /** The pre-1.13 rendering, from the same text. Obsidian skips it once `getSettingDefinitions()` returns anything. */
  display(): void {
    this.legacy = true;
    this.draw();
  }

  private draw(): void {
    const { containerEl } = this;
    const s = this.plugin.settings;
    containerEl.empty();
    new Setting(containerEl).setName(t('heading.counting')).setHeading();
    new Setting(containerEl)
      .setName(TEXT.mode.name)
      .setDesc(TEXT.mode.desc)
      .addDropdown((d) =>
        d
          .addOptions(MODES)
          .setValue(s.mode)
          .onChange(async (v) => {
            await this.setControlValue('mode', v);
            this.draw();
          }),
      );
    if (s.mode === 'custom') {
      new Setting(containerEl)
        .setName(TEXT.extensions.name)
        .setDesc(TEXT.extensions.desc)
        .addText((t) => t.setValue(String(this.getControlValue('extensions'))).onChange((v) => this.setControlValue('extensions', v)));
      this.toggle('excludeExtensions', TEXT.excludeExtensions);
    }
    this.toggle('recursive', TEXT.recursive);
    new Setting(containerEl)
      .setName(TEXT.excludedFolders.name)
      .setDesc(TEXT.excludedFolders.desc)
      .addTextArea((t) => {
        t.setValue(String(this.getControlValue('excludedFolders'))).onChange((v) => this.setControlValue('excludedFolders', v));
        t.inputEl.rows = 4;
      });
    new Setting(containerEl).setName(t('heading.display')).setHeading();
    this.toggle('showOnExpanded', TEXT.showOnExpanded);
    this.toggle('hideZero', TEXT.hideZero);
    this.toggle('compact', TEXT.compact);
    this.toggle('showVaultTotal', TEXT.showVaultTotal);
    new Setting(containerEl)
      .setName(TEXT.legacy.name)
      .setDesc(TEXT.legacy.desc)
      .addButton((b) => b.setButtonText(t('setting.legacy.button')).onClick(() => void this.importLegacy()));
  }

  private toggle(key: keyof FolderCountsSettings, text: { name: string; desc: string }) {
    new Setting(this.containerEl)
      .setName(text.name)
      .setDesc(text.desc)
      .addToggle((t) => t.setValue(Boolean(this.plugin.settings[key])).onChange((v) => this.setControlValue(key, v)));
  }
}
