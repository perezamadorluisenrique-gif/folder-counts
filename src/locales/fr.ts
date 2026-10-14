import type { Messages } from '../i18n.ts';

const fr: Messages = {
  // Commands and the folder menu
  'command.toggle': 'Afficher ou masquer les compteurs',
  'command.refresh': 'Recompter tous les dossiers',
  'menu.excludeFolder': 'Exclure du comptage des dossiers',
  'menu.includeFolder': 'Compter de nouveau ce dossier',

  // How many of something
  'count.notes.one': '1 note',
  'count.notes.other': '{count} notes',
  'count.words.one': '1 mot',
  'count.words.other': '{count} mots',
  'count.files.one': '1 fichier',
  'count.files.other': '{count} fichiers',
  'count.subfolders.one': '1 sous-dossier',
  'count.subfolders.other': '{count} sous-dossiers',
  'count.otherFiles.one': '1 autre fichier',
  'count.otherFiles.other': '{count} autres fichiers',

  // The tooltip of a folder's badge
  'tooltip.inTotal': '{amount} au total',
  'tooltip.directlyInside': '{amount} directement à l’intérieur',
  'tooltip.stillCounting': 'comptage en cours : {notes}',
  'tooltip.vault': 'Folder Counts : {description} dans ce coffre',

  // Notices
  'notice.adopted':
    'Vos réglages du module de comptage de notes d’origine ont été importés. Désactivez ce module pour éviter deux nombres par dossier.',
  'notice.imported': 'Les réglages du module de comptage de notes d’origine ont été importés.',
  'notice.noLegacy': 'Le module de comptage de notes d’origine n’a aucun réglage dans ce coffre.',

  // Settings: headings and options
  'heading.counting': 'Comptage',
  'heading.display': 'Affichage',
  'mode.notes': 'Notes (fichiers Markdown)',
  'mode.files': 'Tous les fichiers',
  'mode.custom': 'Fichiers avec ces extensions',
  'mode.words': 'Mots dans les notes',
  'mode.size': 'Taille des fichiers',

  // Settings
  'setting.mode.name': 'Ce qu’il faut compter',
  'setting.mode.desc': 'Les notes, tous les fichiers, les types de fichiers listés ci-dessous, le total des mots des notes, ou la taille totale des fichiers.',
  'setting.extensions.name': 'Extensions',
  'setting.extensions.desc': 'Séparées par des virgules ou des espaces, sans le point. Par exemple : md, canvas, pdf.',
  'setting.excludeExtensions.name': 'Tout compter sauf ceux-ci',
  'setting.excludeExtensions.desc': 'Transforme la liste ci-dessus en liste de types de fichiers à ignorer.',
  'setting.recursive.name': 'Inclure les sous-dossiers',
  'setting.recursive.desc': 'Compte tout ce qui se trouve sous un dossier. Désactivez pour ne compter que les fichiers directement à l’intérieur.',
  'setting.showOnExpanded.name': 'Afficher les compteurs sur les dossiers dépliés',
  'setting.showOnExpanded.desc': 'Par défaut, un dossier ouvert qui a des sous-dossiers masque son nombre, puisque son contenu est à l’écran.',
  'setting.hideZero.name': 'Masquer les compteurs à zéro',
  'setting.hideZero.desc': 'Laisse vides les dossiers où il n’y a rien à compter.',
  'setting.compact.name': 'Nombres abrégés',
  'setting.compact.desc': 'Affiche 1.2k au lieu de 1234.',
  'setting.showVaultTotal.name': 'Total du coffre dans la barre d’état',
  'setting.showVaultTotal.desc': 'Affiche ce que contient tout le coffre : notes, fichiers, mots ou taille, selon ce que vous comptez.',
  'setting.excludedFolders.name': 'Dossiers exclus',
  'setting.excludedFolders.desc':
    'Un chemin de dossier par ligne. Leur contenu n’est compté nulle part. Les jokers fonctionnent : Archive/** ou **/attachments. Vous pouvez aussi faire un clic droit sur un dossier.',
  'setting.legacy.name': 'Importer depuis File Explorer Note Count',
  'setting.legacy.desc': 'Copie les réglages du module d’origine, s’il est installé dans ce coffre.',
  'setting.legacy.button': 'Importer',
};

export default fr;
