import type { Messages } from '../i18n.ts';

const ptBR: Messages = {
  // Commands and the folder menu
  'command.toggle': 'Mostrar ou ocultar as contagens',
  'command.refresh': 'Recontar todas as pastas',
  'menu.excludeFolder': 'Excluir da contagem de pastas',
  'menu.includeFolder': 'Contar esta pasta novamente',

  // How many of something
  'count.notes.one': '1 nota',
  'count.notes.other': '{count} notas',
  'count.words.one': '1 palavra',
  'count.words.other': '{count} palavras',
  'count.files.one': '1 arquivo',
  'count.files.other': '{count} arquivos',
  'count.subfolders.one': '1 subpasta',
  'count.subfolders.other': '{count} subpastas',
  'count.otherFiles.one': '1 outro arquivo',
  'count.otherFiles.other': '{count} outros arquivos',

  // The tooltip of a folder's badge
  'tooltip.inTotal': '{amount} no total',
  'tooltip.directlyInside': '{amount} diretamente dentro',
  'tooltip.stillCounting': 'ainda contando {notes}',
  'tooltip.vault': 'Folder Counts: {description} neste cofre',

  // Notices
  'notice.adopted':
    'Suas configurações do plugin original de contagem de notas foram importadas. Desative esse plugin para evitar dois números por pasta.',
  'notice.imported': 'As configurações do plugin original de contagem de notas foram importadas.',
  'notice.noLegacy': 'O plugin original de contagem de notas não tem configurações neste cofre.',

  // Settings: headings and options
  'heading.counting': 'Contagem',
  'heading.display': 'Exibição',
  'mode.notes': 'Notas (arquivos Markdown)',
  'mode.files': 'Todos os arquivos',
  'mode.custom': 'Arquivos com estas extensões',
  'mode.words': 'Palavras nas notas',
  'mode.size': 'Tamanho dos arquivos',

  // Settings
  'setting.mode.name': 'O que contar',
  'setting.mode.desc': 'Notas, todos os arquivos, os tipos de arquivo listados abaixo, o total de palavras das notas ou o tamanho total dos arquivos.',
  'setting.extensions.name': 'Extensões',
  'setting.extensions.desc': 'Separadas por vírgulas ou espaços, sem o ponto. Por exemplo: md, canvas, pdf.',
  'setting.excludeExtensions.name': 'Contar tudo, exceto estes',
  'setting.excludeExtensions.desc': 'Transforma a lista acima em uma lista de tipos de arquivo a ignorar.',
  'setting.recursive.name': 'Incluir subpastas',
  'setting.recursive.desc': 'Conta tudo que está abaixo de uma pasta. Desative para contar apenas os arquivos diretamente dentro dela.',
  'setting.showOnExpanded.name': 'Mostrar contagens em pastas expandidas',
  'setting.showOnExpanded.desc': 'Por padrão, uma pasta aberta com subpastas esconde seu número, já que o conteúdo está na tela.',
  'setting.hideZero.name': 'Ocultar contagens zeradas',
  'setting.hideZero.desc': 'Deixa em branco as pastas sem nada para contar.',
  'setting.compact.name': 'Números compactos',
  'setting.compact.desc': 'Mostra 1.2k em vez de 1234.',
  'setting.showVaultTotal.name': 'Total do cofre na barra de status',
  'setting.showVaultTotal.desc': 'Mostra o que o cofre inteiro contém: notas, arquivos, palavras ou tamanho, conforme o que você conta.',
  'setting.excludedFolders.name': 'Pastas excluídas',
  'setting.excludedFolders.desc':
    'Um caminho de pasta por linha. O conteúdo delas não é contado em lugar nenhum. Curingas funcionam: Archive/** ou **/attachments. Você também pode clicar com o botão direito em uma pasta.',
  'setting.legacy.name': 'Importar do File Explorer Note Count',
  'setting.legacy.desc': 'Copia as configurações do plugin original, se ele estiver instalado neste cofre.',
  'setting.legacy.button': 'Importar',
};

export default ptBR;
