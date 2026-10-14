import type { Messages } from '../i18n.ts';

const ko: Messages = {
  // Commands and the folder menu
  'command.toggle': '개수 표시 또는 숨기기',
  'command.refresh': '모든 폴더 다시 세기',
  'menu.excludeFolder': '폴더 개수에서 제외',
  'menu.includeFolder': '이 폴더 다시 세기',

  // How many of something
  'count.notes.one': '노트 1개',
  'count.notes.other': '노트 {count}개',
  'count.words.one': '단어 1개',
  'count.words.other': '단어 {count}개',
  'count.files.one': '파일 1개',
  'count.files.other': '파일 {count}개',
  'count.subfolders.one': '하위 폴더 1개',
  'count.subfolders.other': '하위 폴더 {count}개',
  'count.otherFiles.one': '기타 파일 1개',
  'count.otherFiles.other': '기타 파일 {count}개',

  // The tooltip of a folder's badge
  'tooltip.inTotal': '총 {amount}',
  'tooltip.directlyInside': '바로 안에 {amount}',
  'tooltip.stillCounting': '{notes} 계속 세는 중',
  'tooltip.vault': 'Folder Counts: 이 보관함에 {description}',

  // Notices
  'notice.adopted': '원래 노트 개수 플러그인의 설정을 가져왔습니다. 폴더마다 숫자가 두 개 나오지 않도록 해당 플러그인을 끄세요.',
  'notice.imported': '원래 노트 개수 플러그인의 설정을 가져왔습니다.',
  'notice.noLegacy': '이 보관함에는 원래 노트 개수 플러그인의 설정이 없습니다.',

  // Settings: headings and options
  'heading.counting': '세기',
  'heading.display': '표시',
  'mode.notes': '노트(마크다운 파일)',
  'mode.files': '모든 파일',
  'mode.custom': '이 확장자를 가진 파일',
  'mode.words': '노트의 단어 수',
  'mode.size': '파일 크기',

  // Settings
  'setting.mode.name': '세는 대상',
  'setting.mode.desc': '노트, 모든 파일, 아래에 나열한 파일 형식, 노트의 총 단어 수, 또는 파일의 총 크기.',
  'setting.extensions.name': '확장자',
  'setting.extensions.desc': '쉼표나 공백으로 구분하며 점은 쓰지 않습니다. 예: md, canvas, pdf.',
  'setting.excludeExtensions.name': '이것들을 제외한 모든 것 세기',
  'setting.excludeExtensions.desc': '위 목록을 건너뛸 파일 형식의 목록으로 바꿉니다.',
  'setting.recursive.name': '하위 폴더 포함',
  'setting.recursive.desc': '폴더 아래의 모든 것을 셉니다. 끄면 폴더 바로 안의 파일만 셉니다.',
  'setting.showOnExpanded.name': '펼친 폴더에도 개수 표시',
  'setting.showOnExpanded.desc': '기본적으로 하위 폴더가 있는 열린 폴더는 내용이 화면에 보이므로 숫자를 숨깁니다.',
  'setting.hideZero.name': '0인 개수 숨기기',
  'setting.hideZero.desc': '셀 것이 없는 폴더는 비워 둡니다.',
  'setting.compact.name': '숫자 줄여서 표시',
  'setting.compact.desc': '1234 대신 1.2k로 표시합니다.',
  'setting.showVaultTotal.name': '상태 표시줄에 보관함 합계 표시',
  'setting.showVaultTotal.desc': '보관함 전체가 담고 있는 것(세는 대상에 따라 노트, 파일, 단어 또는 크기)을 표시합니다.',
  'setting.excludedFolders.name': '제외할 폴더',
  'setting.excludedFolders.desc':
    '한 줄에 폴더 경로 하나씩. 이 폴더의 내용은 어디서도 세지 않습니다. 와일드카드를 쓸 수 있습니다: Archive/** 또는 **/attachments. 폴더를 마우스 오른쪽 버튼으로 눌러도 됩니다.',
  'setting.legacy.name': 'File Explorer Note Count에서 가져오기',
  'setting.legacy.desc': '이 보관함에 원래 플러그인이 설치되어 있다면 그 설정을 복사합니다.',
  'setting.legacy.button': '가져오기',
};

export default ko;
