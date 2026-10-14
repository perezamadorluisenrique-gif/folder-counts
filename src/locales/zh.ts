import type { Messages } from '../i18n.ts';

const zh: Messages = {
  // Commands and the folder menu
  'command.toggle': '显示或隐藏计数',
  'command.refresh': '重新统计所有文件夹',
  'menu.excludeFolder': '从文件夹计数中排除',
  'menu.includeFolder': '重新统计此文件夹',

  // How many of something
  'count.notes.one': '1 篇笔记',
  'count.notes.other': '{count} 篇笔记',
  'count.words.one': '1 个词',
  'count.words.other': '{count} 个词',
  'count.files.one': '1 个文件',
  'count.files.other': '{count} 个文件',
  'count.subfolders.one': '1 个子文件夹',
  'count.subfolders.other': '{count} 个子文件夹',
  'count.otherFiles.one': '1 个其他文件',
  'count.otherFiles.other': '{count} 个其他文件',

  // The tooltip of a folder's badge
  'tooltip.inTotal': '共 {amount}',
  'tooltip.directlyInside': '直接包含 {amount}',
  'tooltip.stillCounting': '仍在统计 {notes}',
  'tooltip.vault': 'Folder Counts：此仓库共 {description}',

  // Notices
  'notice.adopted': '已从原版笔记计数插件导入你的设置。请关闭那个插件，以免每个文件夹显示两个数字。',
  'notice.imported': '已导入原版笔记计数插件的设置。',
  'notice.noLegacy': '此仓库中没有原版笔记计数插件的设置。',

  // Settings: headings and options
  'heading.counting': '统计',
  'heading.display': '显示',
  'mode.notes': '笔记（Markdown 文件）',
  'mode.files': '所有文件',
  'mode.custom': '具有这些扩展名的文件',
  'mode.words': '笔记中的词数',
  'mode.size': '文件大小',

  // Settings
  'setting.mode.name': '统计内容',
  'setting.mode.desc': '笔记、所有文件、你在下面列出的文件类型、笔记的总词数，或文件的总大小。',
  'setting.extensions.name': '扩展名',
  'setting.extensions.desc': '用逗号或空格分隔，不带点。例如：md, canvas, pdf。',
  'setting.excludeExtensions.name': '统计除这些以外的所有文件',
  'setting.excludeExtensions.desc': '将上面的列表变为要跳过的文件类型列表。',
  'setting.recursive.name': '包含子文件夹',
  'setting.recursive.desc': '统计文件夹下的所有内容。关闭后仅统计直接位于其中的文件。',
  'setting.showOnExpanded.name': '在展开的文件夹上显示计数',
  'setting.showOnExpanded.desc': '默认情况下，带有子文件夹的已展开文件夹会隐藏其数字，因为其内容已显示在屏幕上。',
  'setting.hideZero.name': '隐藏为零的计数',
  'setting.hideZero.desc': '没有可统计内容的文件夹保持空白。',
  'setting.compact.name': '紧凑数字',
  'setting.compact.desc': '显示 1.2k 而不是 1234。',
  'setting.showVaultTotal.name': '在状态栏显示仓库总数',
  'setting.showVaultTotal.desc': '显示整个仓库包含的内容：笔记、文件、词数或大小，取决于你统计的内容。',
  'setting.excludedFolders.name': '排除的文件夹',
  'setting.excludedFolders.desc': '每行一个文件夹路径。其内容不会在任何地方被统计。支持通配符：Archive/** 或 **/attachments。你也可以右键单击文件夹。',
  'setting.legacy.name': '从 File Explorer Note Count 导入',
  'setting.legacy.desc': '如果此仓库中安装了原版插件，则复制它的设置。',
  'setting.legacy.button': '导入',
};

export default zh;
