import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_OPTIONS,
  countTree,
  describe,
  excludedBy,
  fileCounts,
  formatCount,
  fromLegacy,
  parseExtensions,
  parseFolders,
  shownCount,
  toggleFolder,
} from '../src/count.ts';
import type { CountOptions, TreeFile, TreeFolder } from '../src/count.ts';

function file(path: string): TreeFile {
  return { path, extension: path.includes('.') ? path.slice(path.lastIndexOf('.') + 1) : '' };
}
function folder(path: string, ...children: (TreeFile | TreeFolder)[]): TreeFolder {
  return { path, children };
}

const vault = folder(
  '/',
  file('Welcome.md'),
  folder('Projects', file('Projects/a.md'), file('Projects/b.md'), file('Projects/plan.pdf'),
    folder('Projects/Archive', file('Projects/Archive/old.md'), file('Projects/Archive/img.PNG')),
    folder('Projects/Empty')),
  folder('Templates', file('Templates/daily.md')),
  folder('Attachments', file('Attachments/x.png')),
);

const opts = (o: Partial<CountOptions> = {}): CountOptions => ({ ...DEFAULT_OPTIONS, ...o });

test('notes are counted recursively by default', () => {
  const c = countTree(vault, opts());
  assert.equal(c.get('Projects')?.total, 3);
  assert.equal(c.get('Projects')?.direct, 2);
  assert.equal(c.get('Projects')?.subfolders, 2);
  assert.equal(c.get('Projects')?.otherFiles, 1);
  assert.equal(c.get('Projects/Archive')?.total, 1);
  assert.equal(c.get('Projects/Empty')?.total, 0);
  assert.equal(c.get('/')?.total, 5);
});

test('all files and custom extensions', () => {
  assert.equal(countTree(vault, opts({ mode: 'files' })).get('/')?.total, 8);
  const images = countTree(vault, opts({ mode: 'custom', extensions: ['png'] }));
  assert.equal(images.get('/')?.total, 2, 'extension match ignores case');
  const notImages = countTree(vault, opts({ mode: 'custom', extensions: ['png'], excludeExtensions: true }));
  assert.equal(notImages.get('/')?.total, 6);
});

test('excluded folders vanish from their parents too', () => {
  const c = countTree(vault, opts({ excludedFolders: ['Projects/Archive', 'Templates'] }));
  assert.equal(c.has('Projects/Archive'), false);
  assert.equal(c.has('Templates'), false);
  assert.equal(c.get('Projects')?.total, 2);
  assert.equal(c.get('Projects')?.subfolders, 1);
  assert.equal(c.get('/')?.total, 3);
});

test('exclusion patterns: paths cover children, globs match whole paths', () => {
  const ex = excludedBy(['Projects', '**/Archive', 'T*', ' /Slashes/ ']);
  assert.equal(ex('Projects'), true);
  assert.equal(ex('projects/sub'), true, 'plain paths ignore case');
  assert.equal(ex('ProjectsX'), false, 'a prefix is not a parent');
  assert.equal(ex('Notes/Archive'), true);
  assert.equal(ex('Templates'), true);
  assert.equal(ex('Templates/x'), false, '* does not cross a slash');
  assert.equal(ex('Slashes/deep'), true);
  assert.equal(excludedBy(['', '  '])('anything'), false);
  const archive = excludedBy(['Archive/**']);
  assert.equal(archive('Archive'), true, 'a trailing /** covers the folder itself');
  assert.equal(archive('Archive/2024'), true);
  assert.equal(archive('Archived'), false);
});

test('shown count follows the recursive setting', () => {
  const c = countTree(vault, opts()).get('Projects')!;
  assert.equal(shownCount(c, true), 3);
  assert.equal(shownCount(c, false), 2);
});

test('fileCounts by mode', () => {
  assert.equal(fileCounts('MD', opts()), true);
  assert.equal(fileCounts('canvas', opts()), false);
  assert.equal(fileCounts('', opts({ mode: 'files' })), true);
});

test('compact numbers', () => {
  assert.equal(formatCount(999, true), '999');
  assert.equal(formatCount(1000, true), '1k');
  assert.equal(formatCount(1234, true), '1.2k');
  assert.equal(formatCount(1299, true), '1.2k', 'rounds down so 1.2k never means 1250+');
  assert.equal(formatCount(12500, true), '12k');
  assert.equal(formatCount(2_500_000, true), '2.5M');
  assert.equal(formatCount(1234, false), '1234');
});

test('tooltip describes the count', () => {
  const c = countTree(vault, opts());
  assert.equal(describe(c.get('Projects')!, opts()), '3 notes in total · 2 directly inside · 2 subfolders · 1 other file');
  assert.equal(describe(c.get('Templates')!, opts()), '1 note in total');
  assert.equal(describe(c.get('Projects')!, opts({ recursive: false })), '2 notes directly inside · 2 subfolders · 1 other file');
  const all = countTree(vault, opts({ mode: 'files' }));
  assert.equal(describe(all.get('Attachments')!, opts({ mode: 'files' })), '1 file in total');
});

test('parsing the settings text', () => {
  assert.deepEqual(parseExtensions('md, PDF , .canvas\npng md'), ['md', 'pdf', 'canvas', 'png']);
  assert.deepEqual(parseFolders('Archive\n\n /Templates/ \nArchive'), ['Archive', 'Templates']);
  assert.deepEqual(toggleFolder(['A'], 'B'), ['A', 'B']);
  assert.deepEqual(toggleFolder(['A', 'B'], 'A'), ['B']);
});

test('importing File Explorer Note Count settings', () => {
  assert.deepEqual(fromLegacy({}), {
    mode: 'notes', extensions: ['md'], excludeExtensions: false, showOnExpanded: false, showVaultTotal: false,
  });
  assert.equal(fromLegacy({ filterList: [] }).mode, 'files');
  assert.deepEqual(fromLegacy({ filterList: ['md', 'pdf'], blacklist: false, showAllNumbers: true, addRootFolder: true }), {
    mode: 'custom', extensions: ['md', 'pdf'], excludeExtensions: false, showOnExpanded: true, showVaultTotal: true,
  });
  assert.deepEqual(fromLegacy({ filterList: ['png'], blacklist: true }).excludeExtensions, true);
  assert.equal(fromLegacy({ filterList: ['md'], blacklist: true }).mode, 'custom', 'everything but notes');
});

test('a deep vault does not overflow the stack', () => {
  let leaf: TreeFolder = folder('d', file('d/x.md'));
  for (let i = 0; i < 20000; i++) leaf = folder(`p${i}`, leaf);
  assert.equal(countTree(folder('/', leaf), opts()).get('/')?.total, 1);
});
