import type { Messages } from '../i18n.ts';

const ja: Messages = {
  // Commands and the folder menu
  'command.toggle': 'カウントの表示／非表示',
  'command.refresh': 'すべてのフォルダを再カウント',
  'menu.excludeFolder': 'フォルダのカウントから除外',
  'menu.includeFolder': 'このフォルダを再びカウントする',

  // How many of something
  'count.notes.one': 'ノート 1 件',
  'count.notes.other': 'ノート {count} 件',
  'count.words.one': '1 語',
  'count.words.other': '{count} 語',
  'count.files.one': 'ファイル 1 個',
  'count.files.other': 'ファイル {count} 個',
  'count.subfolders.one': 'サブフォルダ 1 個',
  'count.subfolders.other': 'サブフォルダ {count} 個',
  'count.otherFiles.one': 'その他のファイル 1 個',
  'count.otherFiles.other': 'その他のファイル {count} 個',

  // The tooltip of a folder's badge
  'tooltip.inTotal': '合計 {amount}',
  'tooltip.directlyInside': '直下に {amount}',
  'tooltip.stillCounting': '{notes} を集計中',
  'tooltip.vault': 'Folder Counts: この保管庫に {description}',

  // Notices
  'notice.adopted': '元のノートカウントプラグインから設定をインポートしました。フォルダごとに数字が2つ出ないよう、そのプラグインをオフにしてください。',
  'notice.imported': '元のノートカウントプラグインの設定をインポートしました。',
  'notice.noLegacy': 'この保管庫には、元のノートカウントプラグインの設定がありません。',

  // Settings: headings and options
  'heading.counting': 'カウント',
  'heading.display': '表示',
  'mode.notes': 'ノート（Markdown ファイル）',
  'mode.files': 'すべてのファイル',
  'mode.custom': 'これらの拡張子のファイル',
  'mode.words': 'ノート内の語数',
  'mode.size': 'ファイルのサイズ',

  // Settings
  'setting.mode.name': 'カウントする対象',
  'setting.mode.desc': 'ノート、すべてのファイル、下に挙げたファイルの種類、ノートの総語数、またはファイルの総サイズ。',
  'setting.extensions.name': '拡張子',
  'setting.extensions.desc': 'カンマまたはスペース区切りで、ドットなしで入力します。例: md, canvas, pdf。',
  'setting.excludeExtensions.name': 'これら以外をすべてカウント',
  'setting.excludeExtensions.desc': '上のリストを、除外するファイルの種類のリストに変えます。',
  'setting.recursive.name': 'サブフォルダを含める',
  'setting.recursive.desc': 'フォルダ以下のすべてをカウントします。オフにすると、直下のファイルだけをカウントします。',
  'setting.showOnExpanded.name': '展開したフォルダにもカウントを表示',
  'setting.showOnExpanded.desc': '初期設定では、サブフォルダのある開いたフォルダは、中身が画面に表示されているため数字を隠します。',
  'setting.hideZero.name': '0 のカウントを隠す',
  'setting.hideZero.desc': 'カウントするものがないフォルダは空白のままにします。',
  'setting.compact.name': '数字を短縮表示',
  'setting.compact.desc': '1234 の代わりに 1.2k と表示します。',
  'setting.showVaultTotal.name': 'ステータスバーに保管庫の合計を表示',
  'setting.showVaultTotal.desc': '保管庫全体の内容（ノート、ファイル、語数、サイズのいずれか。カウント対象に従います）を表示します。',
  'setting.excludedFolders.name': '除外するフォルダ',
  'setting.excludedFolders.desc':
    '1 行に 1 つのフォルダパス。その中身はどこでもカウントされません。ワイルドカードが使えます: Archive/** や **/attachments。フォルダを右クリックしても設定できます。',
  'setting.legacy.name': 'File Explorer Note Count からインポート',
  'setting.legacy.desc': 'この保管庫に元のプラグインが入っていれば、その設定をコピーします。',
  'setting.legacy.button': 'インポート',
};

export default ja;
