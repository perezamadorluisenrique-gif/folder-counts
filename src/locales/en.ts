// The source of the message keys and the fallback language. Every other file in
// this folder must have exactly these keys and the same {placeholders}; the
// build fails on a missing or extra key and `tests/i18n.test.ts` checks the rest.
// Not here: the numbers the badges show and the units of size (B, KB, MB).
const en = {
  // Commands and the folder menu
  'command.toggle': 'Show or hide the counts',
  'command.refresh': 'Recount all folders',
  'menu.excludeFolder': 'Exclude from folder counts',
  'menu.includeFolder': 'Count this folder again',

  // How many of something: used in the tooltips and the status bar. {count} may be "1.2k".
  'count.notes.one': '1 note',
  'count.notes.other': '{count} notes',
  'count.words.one': '1 word',
  'count.words.other': '{count} words',
  'count.files.one': '1 file',
  'count.files.other': '{count} files',
  'count.subfolders.one': '1 subfolder',
  'count.subfolders.other': '{count} subfolders',
  'count.otherFiles.one': '1 other file',
  'count.otherFiles.other': '{count} other files',

  // The tooltip of a folder's badge: its parts are joined with " · "
  'tooltip.inTotal': '{amount} in total',
  'tooltip.directlyInside': '{amount} directly inside',
  'tooltip.stillCounting': 'still counting {notes}',
  'tooltip.vault': 'Folder Counts: {description} in this vault',

  // Notices
  'notice.adopted':
    'Imported your settings from the original note count plugin. Turn that plugin off to avoid two numbers per folder.',
  'notice.imported': 'Imported the settings of the original note count plugin.',
  'notice.noLegacy': 'The original note count plugin has no settings in this vault.',

  // Settings: headings and options
  'heading.counting': 'Counting',
  'heading.display': 'Display',
  'mode.notes': 'Notes (Markdown files)',
  'mode.files': 'All files',
  'mode.custom': 'Files with these extensions',
  'mode.words': 'Words in notes',
  'mode.size': 'Size of files',

  // Settings
  'setting.mode.name': 'What to count',
  'setting.mode.desc': 'Notes, every file, the file types you list below, the total words of the notes, or the total size of the files.',
  'setting.extensions.name': 'Extensions',
  'setting.extensions.desc': 'Separated by commas or spaces, without the dot. For example: md, canvas, pdf.',
  'setting.excludeExtensions.name': 'Count everything except these',
  'setting.excludeExtensions.desc': 'Turn the list above into a list of file types to skip.',
  'setting.recursive.name': 'Include subfolders',
  'setting.recursive.desc': 'Count everything below a folder. Turn off to count only the files directly inside it.',
  'setting.showOnExpanded.name': 'Show counts on expanded folders',
  'setting.showOnExpanded.desc': 'By default an open folder with subfolders hides its number, since its contents are on screen.',
  'setting.hideZero.name': 'Hide zero counts',
  'setting.hideZero.desc': 'Leave folders with nothing to count blank.',
  'setting.compact.name': 'Compact numbers',
  'setting.compact.desc': 'Show 1.2k instead of 1234.',
  'setting.showVaultTotal.name': 'Vault total in the status bar',
  'setting.showVaultTotal.desc': 'Show what the whole vault holds: notes, files, words or size, following what you count.',
  'setting.excludedFolders.name': 'Excluded folders',
  'setting.excludedFolders.desc':
    'One folder path per line. Their contents are not counted anywhere. Wildcards work: Archive/** or **/attachments. You can also right-click a folder.',
  'setting.legacy.name': 'Import from File Explorer Note Count',
  'setting.legacy.desc': 'Copy the settings of the original plugin, if it is installed in this vault.',
  'setting.legacy.button': 'Import',
} as const;

export default en;
