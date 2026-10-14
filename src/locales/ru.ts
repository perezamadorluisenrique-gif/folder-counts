import type { Messages } from '../i18n.ts';

const ru: Messages = {
  // Commands and the folder menu
  'command.toggle': 'Показать или скрыть счётчики',
  'command.refresh': 'Пересчитать все папки',
  'menu.excludeFolder': 'Исключить из подсчёта папок',
  'menu.includeFolder': 'Снова считать эту папку',

  // How many of something
  'count.notes.one': 'заметок: 1',
  'count.notes.other': 'заметок: {count}',
  'count.words.one': 'слов: 1',
  'count.words.other': 'слов: {count}',
  'count.files.one': 'файлов: 1',
  'count.files.other': 'файлов: {count}',
  'count.subfolders.one': 'вложенных папок: 1',
  'count.subfolders.other': 'вложенных папок: {count}',
  'count.otherFiles.one': 'других файлов: 1',
  'count.otherFiles.other': 'других файлов: {count}',

  // The tooltip of a folder's badge
  'tooltip.inTotal': 'всего — {amount}',
  'tooltip.directlyInside': 'непосредственно внутри — {amount}',
  'tooltip.stillCounting': 'ещё считается — {notes}',
  'tooltip.vault': 'Folder Counts: в этом хранилище — {description}',

  // Notices
  'notice.adopted':
    'Ваши настройки импортированы из исходного плагина для подсчёта заметок. Отключите тот плагин, чтобы не было двух чисел у каждой папки.',
  'notice.imported': 'Настройки исходного плагина для подсчёта заметок импортированы.',
  'notice.noLegacy': 'У исходного плагина для подсчёта заметок нет настроек в этом хранилище.',

  // Settings: headings and options
  'heading.counting': 'Подсчёт',
  'heading.display': 'Отображение',
  'mode.notes': 'Заметки (файлы Markdown)',
  'mode.files': 'Все файлы',
  'mode.custom': 'Файлы с этими расширениями',
  'mode.words': 'Слова в заметках',
  'mode.size': 'Размер файлов',

  // Settings
  'setting.mode.name': 'Что считать',
  'setting.mode.desc': 'Заметки, все файлы, перечисленные ниже типы файлов, общее число слов в заметках или общий размер файлов.',
  'setting.extensions.name': 'Расширения',
  'setting.extensions.desc': 'Через запятую или пробел, без точки. Например: md, canvas, pdf.',
  'setting.excludeExtensions.name': 'Считать всё, кроме этих',
  'setting.excludeExtensions.desc': 'Превращает список выше в список типов файлов, которые нужно пропустить.',
  'setting.recursive.name': 'Включать вложенные папки',
  'setting.recursive.desc': 'Считает всё, что находится ниже папки. Отключите, чтобы считать только файлы непосредственно внутри неё.',
  'setting.showOnExpanded.name': 'Показывать счётчики у развёрнутых папок',
  'setting.showOnExpanded.desc': 'По умолчанию открытая папка с вложенными папками скрывает своё число, так как её содержимое видно на экране.',
  'setting.hideZero.name': 'Скрывать нулевые счётчики',
  'setting.hideZero.desc': 'Оставляет пустыми папки, в которых нечего считать.',
  'setting.compact.name': 'Краткие числа',
  'setting.compact.desc': 'Показывает 1.2k вместо 1234.',
  'setting.showVaultTotal.name': 'Итог по хранилищу в строке состояния',
  'setting.showVaultTotal.desc': 'Показывает, что содержит всё хранилище: заметки, файлы, слова или размер — в зависимости от того, что вы считаете.',
  'setting.excludedFolders.name': 'Исключённые папки',
  'setting.excludedFolders.desc':
    'По одному пути к папке на строку. Их содержимое нигде не учитывается. Работают подстановочные знаки: Archive/** или **/attachments. Можно также щёлкнуть папку правой кнопкой мыши.',
  'setting.legacy.name': 'Импортировать из File Explorer Note Count',
  'setting.legacy.desc': 'Копирует настройки исходного плагина, если он установлен в этом хранилище.',
  'setting.legacy.button': 'Импортировать',
};

export default ru;
