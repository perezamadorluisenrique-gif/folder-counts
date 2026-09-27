// Pure logic: no `obsidian` import, so tests/ can run it under plain Node.
// The tree is described structurally, so a TFolder from the vault fits it as is.

export interface TreeItem {
  path: string;
  /** Set on files. */
  extension?: string;
  /** Set on folders. */
  children?: TreeItem[];
}

export interface TreeFile extends TreeItem {
  extension: string;
}

export interface TreeFolder extends TreeItem {
  children: TreeItem[];
}

export type CountMode = 'notes' | 'files' | 'custom';

export interface CountOptions {
  /** Notes are Markdown files; `files` is everything; `custom` uses `extensions`. */
  mode: CountMode;
  /** Extensions for `custom`, without the dot, lower case. */
  extensions: string[];
  /** With `custom`, count every file EXCEPT these extensions. */
  excludeExtensions: boolean;
  /** Count everything below the folder, or only the files directly inside it. */
  recursive: boolean;
  /** Folder paths or globs whose contents are left out everywhere. */
  excludedFolders: string[];
}

export interface FolderCount {
  /** Matching files directly inside the folder. */
  direct: number;
  /** Matching files in the folder and every counted subfolder. */
  total: number;
  /** Direct subfolders that are not excluded. */
  subfolders: number;
  /** Files directly inside that did not match (shown in the tooltip). */
  otherFiles: number;
}

export const DEFAULT_OPTIONS: CountOptions = {
  mode: 'notes',
  extensions: ['md'],
  excludeExtensions: false,
  recursive: true,
  excludedFolders: [],
};

function isFolder(item: TreeItem): item is TreeFolder {
  return Array.isArray(item.children);
}

export function fileCounts(extension: string, options: CountOptions): boolean {
  const ext = extension.toLowerCase();
  switch (options.mode) {
    case 'notes':
      return ext === 'md';
    case 'files':
      return true;
    case 'custom': {
      const listed = options.extensions.includes(ext);
      return options.excludeExtensions ? !listed : listed;
    }
  }
}

function globToRegExp(glob: string): RegExp {
  // `Archive/**` means the folder and everything in it.
  if (glob.endsWith('/**') && !/[*?]/.test(glob.slice(0, -3))) {
    const base = glob.slice(0, -3).replace(/[.+^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${base}(/.*)?$`, 'i');
  }
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const ch = glob[i];
    if (ch === '*' && glob[i + 1] === '*') {
      re += '.*';
      i++;
    } else if (ch === '*') re += '[^/]*';
    else if (ch === '?') re += '[^/]';
    else re += ch.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp(`^${re}$`, 'i');
}

/**
 * A folder is excluded when a pattern names it or one of its parents. A
 * pattern without wildcards is a folder path; with `*`, `**` or `?` it is a
 * glob over the whole path (`**` crosses slashes, `*` does not).
 */
export function excludedBy(patterns: string[]): (path: string) => boolean {
  const plain: string[] = [];
  const globs: RegExp[] = [];
  for (const raw of patterns) {
    const p = raw.trim().replace(/^\/+|\/+$/g, '');
    if (!p) continue;
    if (/[*?]/.test(p)) globs.push(globToRegExp(p));
    else plain.push(p.toLowerCase());
  }
  return (path) => {
    const lower = path.toLowerCase();
    if (plain.some((p) => lower === p || lower.startsWith(`${p}/`))) return true;
    return globs.some((g) => g.test(path));
  };
}

/**
 * Counts every folder under `root` in one pass. Excluded folders get no entry
 * and add nothing to their parents. The root itself is keyed by its own path
 * (`/` for the vault).
 */
export function countTree(root: TreeFolder, options: CountOptions): Map<string, FolderCount> {
  const counts = new Map<string, FolderCount>();
  const excluded = excludedBy(options.excludedFolders);
  // Iterative post-order walk: vaults can nest deeper than is comfortable for recursion.
  const stack: { folder: TreeFolder; count: FolderCount; childIndex: number }[] = [];
  const open = (folder: TreeFolder) =>
    stack.push({ folder, count: { direct: 0, total: 0, subfolders: 0, otherFiles: 0 }, childIndex: 0 });
  open(root);
  while (stack.length) {
    const top = stack[stack.length - 1];
    const { folder, count } = top;
    if (top.childIndex < folder.children.length) {
      const child = folder.children[top.childIndex++];
      if (isFolder(child)) {
        if (!excluded(child.path)) {
          count.subfolders++;
          open(child);
        }
      } else if (fileCounts(child.extension ?? '', options)) count.direct++;
      else count.otherFiles++;
      continue;
    }
    stack.pop();
    count.total += count.direct;
    counts.set(folder.path, count);
    const parent = stack[stack.length - 1];
    if (parent) parent.count.total += count.total;
  }
  return counts;
}

/** The number a folder shows: its total or its direct files. */
export function shownCount(count: FolderCount, recursive: boolean): number {
  return recursive ? count.total : count.direct;
}

/** `1234` stays `1234`, or with `compact` becomes `1.2k`; `12000` becomes `12k`. */
export function formatCount(n: number, compact: boolean): string {
  if (!compact || n < 1000) return String(n);
  const units: [number, string][] = [
    [1e6, 'M'],
    [1e3, 'k'],
  ];
  for (const [size, unit] of units) {
    if (n >= size) {
      const value = n / size;
      const text = value < 10 ? (Math.floor(value * 10) / 10).toFixed(1).replace(/\.0$/, '') : String(Math.floor(value));
      return `${text}${unit}`;
    }
  }
  return String(n);
}

function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}

/** The unit counted, for the tooltip and the status bar. */
export function unitName(mode: CountMode, n: number): string {
  if (mode === 'notes') return n === 1 ? 'note' : 'notes';
  return n === 1 ? 'file' : 'files';
}

/** Tooltip text: what the number means and what else the folder holds. */
export function describe(count: FolderCount, options: CountOptions): string {
  const parts: string[] = [];
  if (options.recursive) {
    parts.push(`${count.total} ${unitName(options.mode, count.total)} in total`);
    if (count.subfolders > 0) parts.push(`${count.direct} directly inside`);
  } else {
    parts.push(`${count.direct} ${unitName(options.mode, count.direct)} directly inside`);
  }
  if (count.subfolders > 0) parts.push(plural(count.subfolders, 'subfolder', 'subfolders'));
  if (count.otherFiles > 0 && options.mode !== 'files') parts.push(plural(count.otherFiles, 'other file', 'other files'));
  return parts.join(' · ');
}

/** `md, PDF , .canvas` -> `['md', 'pdf', 'canvas']`. */
export function parseExtensions(text: string): string[] {
  return [
    ...new Set(
      text
        .split(/[,\s]+/)
        .map((e) => e.trim().replace(/^\./, '').toLowerCase())
        .filter(Boolean),
    ),
  ];
}

/** One folder path or glob per line; blank lines and duplicates dropped. */
export function parseFolders(text: string): string[] {
  return [
    ...new Set(
      text
        .split('\n')
        .map((l) => l.trim().replace(/^\/+|\/+$/g, ''))
        .filter(Boolean),
    ),
  ];
}

/** Adds the folder to the list, or removes it (and any exact duplicate) if present. */
export function toggleFolder(list: string[], path: string): string[] {
  return list.includes(path) ? list.filter((p) => p !== path) : [...list, path];
}

/**
 * File Explorer Note Count's `data.json`, mapped to these options. Its
 * `filterList` was an extension list, a whitelist unless `blacklist` was on;
 * the default `['md']` whitelist means notes, and an empty list counted
 * everything.
 */
export interface LegacySettings {
  showAllNumbers?: unknown;
  filterList?: unknown;
  blacklist?: unknown;
  addRootFolder?: unknown;
}

export interface ImportedSettings {
  mode: CountMode;
  extensions: string[];
  excludeExtensions: boolean;
  showOnExpanded: boolean;
  showVaultTotal: boolean;
}

export function fromLegacy(legacy: LegacySettings): ImportedSettings {
  const list = Array.isArray(legacy.filterList)
    ? parseExtensions(legacy.filterList.filter((e): e is string => typeof e === 'string').join(','))
    : ['md'];
  const blacklist = legacy.blacklist === true;
  let mode: CountMode = 'custom';
  if (!blacklist && list.length === 1 && list[0] === 'md') mode = 'notes';
  else if (list.length === 0) mode = 'files';
  return {
    mode,
    extensions: mode === 'custom' ? list : ['md'],
    excludeExtensions: mode === 'custom' && blacklist,
    showOnExpanded: legacy.showAllNumbers === true,
    showVaultTotal: legacy.addRootFolder === true,
  };
}
