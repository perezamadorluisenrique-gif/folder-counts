import type { Messages } from '../i18n.ts';

const de: Messages = {
  // Commands and the folder menu
  'command.toggle': 'Zähler ein- oder ausblenden',
  'command.refresh': 'Alle Ordner neu zählen',
  'menu.excludeFolder': 'Von der Ordnerzählung ausschließen',
  'menu.includeFolder': 'Diesen Ordner wieder zählen',

  // How many of something
  'count.notes.one': '1 Notiz',
  'count.notes.other': '{count} Notizen',
  'count.words.one': '1 Wort',
  'count.words.other': '{count} Wörter',
  'count.files.one': '1 Datei',
  'count.files.other': '{count} Dateien',
  'count.subfolders.one': '1 Unterordner',
  'count.subfolders.other': '{count} Unterordner',
  'count.otherFiles.one': '1 weitere Datei',
  'count.otherFiles.other': '{count} weitere Dateien',

  // The tooltip of a folder's badge
  'tooltip.inTotal': '{amount} insgesamt',
  'tooltip.directlyInside': '{amount} direkt darin',
  'tooltip.stillCounting': 'zählt noch {notes}',
  'tooltip.vault': 'Folder Counts: {description} in diesem Vault',

  // Notices
  'notice.adopted':
    'Deine Einstellungen aus der ursprünglichen Notizzähler-Erweiterung wurden importiert. Schalte diese Erweiterung aus, um zwei Zahlen pro Ordner zu vermeiden.',
  'notice.imported': 'Die Einstellungen der ursprünglichen Notizzähler-Erweiterung wurden importiert.',
  'notice.noLegacy': 'Die ursprüngliche Notizzähler-Erweiterung hat in diesem Vault keine Einstellungen.',

  // Settings: headings and options
  'heading.counting': 'Zählen',
  'heading.display': 'Anzeige',
  'mode.notes': 'Notizen (Markdown-Dateien)',
  'mode.files': 'Alle Dateien',
  'mode.custom': 'Dateien mit diesen Endungen',
  'mode.words': 'Wörter in Notizen',
  'mode.size': 'Größe der Dateien',

  // Settings
  'setting.mode.name': 'Was gezählt wird',
  'setting.mode.desc': 'Notizen, alle Dateien, die unten aufgeführten Dateitypen, die Wörter aller Notizen zusammen oder die Gesamtgröße der Dateien.',
  'setting.extensions.name': 'Endungen',
  'setting.extensions.desc': 'Durch Kommas oder Leerzeichen getrennt, ohne den Punkt. Zum Beispiel: md, canvas, pdf.',
  'setting.excludeExtensions.name': 'Alles außer diesen zählen',
  'setting.excludeExtensions.desc': 'Macht aus der Liste oben eine Liste von Dateitypen, die übersprungen werden.',
  'setting.recursive.name': 'Unterordner einbeziehen',
  'setting.recursive.desc': 'Zählt alles unterhalb eines Ordners. Ausschalten, um nur die Dateien direkt darin zu zählen.',
  'setting.showOnExpanded.name': 'Zähler an aufgeklappten Ordnern anzeigen',
  'setting.showOnExpanded.desc': 'Standardmäßig blendet ein geöffneter Ordner mit Unterordnern seine Zahl aus, da sein Inhalt sichtbar ist.',
  'setting.hideZero.name': 'Nullzähler ausblenden',
  'setting.hideZero.desc': 'Lässt Ordner ohne Zählbares leer.',
  'setting.compact.name': 'Kompakte Zahlen',
  'setting.compact.desc': 'Zeigt 1.2k statt 1234.',
  'setting.showVaultTotal.name': 'Vault-Summe in der Statusleiste',
  'setting.showVaultTotal.desc': 'Zeigt, was der ganze Vault enthält: Notizen, Dateien, Wörter oder Größe, je nachdem, was du zählst.',
  'setting.excludedFolders.name': 'Ausgeschlossene Ordner',
  'setting.excludedFolders.desc':
    'Ein Ordnerpfad pro Zeile. Ihr Inhalt wird nirgends gezählt. Platzhalter funktionieren: Archive/** oder **/attachments. Du kannst auch einen Ordner rechtsklicken.',
  'setting.legacy.name': 'Aus File Explorer Note Count importieren',
  'setting.legacy.desc': 'Kopiert die Einstellungen der ursprünglichen Erweiterung, falls sie in diesem Vault installiert ist.',
  'setting.legacy.button': 'Importieren',
};

export default de;
