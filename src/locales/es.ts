import type { Messages } from '../i18n.ts';

const es: Messages = {
  // Commands and the folder menu
  'command.toggle': 'Mostrar u ocultar los recuentos',
  'command.refresh': 'Recontar todas las carpetas',
  'menu.excludeFolder': 'Excluir del recuento de carpetas',
  'menu.includeFolder': 'Volver a contar esta carpeta',

  // How many of something
  'count.notes.one': '1 nota',
  'count.notes.other': '{count} notas',
  'count.words.one': '1 palabra',
  'count.words.other': '{count} palabras',
  'count.files.one': '1 archivo',
  'count.files.other': '{count} archivos',
  'count.subfolders.one': '1 subcarpeta',
  'count.subfolders.other': '{count} subcarpetas',
  'count.otherFiles.one': '1 archivo más',
  'count.otherFiles.other': '{count} archivos más',

  // The tooltip of a folder's badge
  'tooltip.inTotal': '{amount} en total',
  'tooltip.directlyInside': '{amount} directamente dentro',
  'tooltip.stillCounting': 'aún contando {notes}',
  'tooltip.vault': 'Folder Counts: {description} en esta bóveda',

  // Notices
  'notice.adopted':
    'Se importaron tus ajustes del complemento original de recuento de notas. Desactiva ese complemento para evitar dos números por carpeta.',
  'notice.imported': 'Se importaron los ajustes del complemento original de recuento de notas.',
  'notice.noLegacy': 'El complemento original de recuento de notas no tiene ajustes en esta bóveda.',

  // Settings: headings and options
  'heading.counting': 'Recuento',
  'heading.display': 'Visualización',
  'mode.notes': 'Notas (archivos Markdown)',
  'mode.files': 'Todos los archivos',
  'mode.custom': 'Archivos con estas extensiones',
  'mode.words': 'Palabras en las notas',
  'mode.size': 'Tamaño de los archivos',

  // Settings
  'setting.mode.name': 'Qué contar',
  'setting.mode.desc': 'Notas, todos los archivos, los tipos de archivo que indiques abajo, el total de palabras de las notas o el tamaño total de los archivos.',
  'setting.extensions.name': 'Extensiones',
  'setting.extensions.desc': 'Separadas por comas o espacios, sin el punto. Por ejemplo: md, canvas, pdf.',
  'setting.excludeExtensions.name': 'Contar todo excepto esto',
  'setting.excludeExtensions.desc': 'Convierte la lista de arriba en una lista de tipos de archivo que se omiten.',
  'setting.recursive.name': 'Incluir subcarpetas',
  'setting.recursive.desc': 'Cuenta todo lo que hay debajo de una carpeta. Desactívalo para contar solo los archivos que están directamente dentro.',
  'setting.showOnExpanded.name': 'Mostrar recuentos en las carpetas expandidas',
  'setting.showOnExpanded.desc': 'De forma predeterminada, una carpeta abierta con subcarpetas oculta su número, ya que su contenido está a la vista.',
  'setting.hideZero.name': 'Ocultar los recuentos en cero',
  'setting.hideZero.desc': 'Deja en blanco las carpetas que no tienen nada que contar.',
  'setting.compact.name': 'Números compactos',
  'setting.compact.desc': 'Muestra 1.2k en lugar de 1234.',
  'setting.showVaultTotal.name': 'Total de la bóveda en la barra de estado',
  'setting.showVaultTotal.desc': 'Muestra lo que contiene toda la bóveda: notas, archivos, palabras o tamaño, según lo que cuentes.',
  'setting.excludedFolders.name': 'Carpetas excluidas',
  'setting.excludedFolders.desc':
    'Una ruta de carpeta por línea. Su contenido no se cuenta en ningún sitio. Se admiten comodines: Archive/** o **/attachments. También puedes hacer clic derecho en una carpeta.',
  'setting.legacy.name': 'Importar desde File Explorer Note Count',
  'setting.legacy.desc': 'Copia los ajustes del complemento original, si está instalado en esta bóveda.',
  'setting.legacy.button': 'Importar',
};

export default es;
