import test from 'node:test';
import assert from 'node:assert/strict';

import { WordCache, countWords, stripComments, stripFencedCode, stripFrontMatter } from '../src/words.ts';
import { DEFAULT_OPTIONS, countTree, describe, formatAmount, formatSize, statusText, unitName } from '../src/count.ts';
import type { CountOptions, TreeFile, TreeFolder } from '../src/count.ts';

test('plain words', () => {
  assert.equal(countWords(''), 0);
  assert.equal(countWords('one two  three\nfour'), 4);
  assert.equal(countWords("don't well-known 3.14 café"), 4);
  assert.equal(countWords('# Title\n\n- item one\n- item two'), 5);
});

test('front matter is skipped, an unclosed block is text', () => {
  assert.equal(countWords('---\ntitle: A B C\ntags: x\n---\nhello world'), 2);
  assert.equal(countWords('---\r\ntitle: A\r\n---\r\nhello world'), 2);
  assert.equal(countWords('hello\n---\nnot front matter\n---\nbye'), 5);
  assert.equal(stripFrontMatter('---\na: b\n'), '---\na: b\n');
  assert.equal(countWords('---\na: b\nno end'), 4);
});

test('fenced code is skipped', () => {
  assert.equal(countWords('before\n```js\nconst a = 1;\n```\nafter'), 2);
  assert.equal(countWords('a\n~~~\ncode code\n~~~\nb'), 2);
  assert.equal(countWords('a\n````\n```\ninner\n```\n````\nb'), 2);
  assert.equal(countWords('a\n```\nnever closed\nstill code'), 1);
  assert.equal(stripFencedCode('x\n```\ny\n```\nz'), 'x\nz');
});

test('comments are skipped', () => {
  assert.equal(countWords('a %%hidden words%% b'), 2);
  assert.equal(countWords('a\n%%\nmany\nlines\n%%\nb'), 2);
  assert.equal(countWords('a %%never closed b c'), 1);
  assert.equal(stripComments('x%%y%%z').includes('y'), false);
});

test('CJK characters count one by one', () => {
  assert.equal(countWords('你好世界'), 4);
  assert.equal(countWords('こんにちは'), 5);
  assert.equal(countWords('hello 世界 world'), 4);
  assert.equal(countWords('東京tower'), 3);
});

test('links count their display text', () => {
  assert.equal(countWords('see [[Some Note|shown text]] now'), 4);
  assert.equal(countWords('see [[Some Note]] now'), 4);
  assert.equal(countWords('see [[Note#Heading]] now'), 4);
  assert.equal(countWords('a ![[embed.png]] b'), 2);
  assert.equal(countWords('a [a link](https://example.com/x) b'), 4);
  assert.equal(countWords('a ![alt](pic.png) b'), 2);
});

test('word cache keys by path and mtime', () => {
  const c = new WordCache();
  c.set('a.md', 10, 5);
  assert.equal(c.get('a.md', 10), 5);
  assert.equal(c.get('a.md', 11), undefined);
  assert.equal(c.get('b.md', 10), undefined);
  c.rename('a.md', 'x/a.md');
  assert.equal(c.get('x/a.md', 10), 5);
  assert.equal(c.get('a.md', 10), undefined);
  c.set('F/n.md', 1, 2);
  c.set('Fx/n.md', 1, 3);
  c.rename('F', 'G');
  assert.equal(c.get('G/n.md', 1), 2);
  assert.equal(c.get('Fx/n.md', 1), 3);
  c.delete('G/n.md');
  assert.equal(c.get('G/n.md', 1), undefined);
});

test('size formatting', () => {
  assert.equal(formatSize(0), '0 B');
  assert.equal(formatSize(512), '512 B');
  assert.equal(formatSize(1024), '1 KB');
  assert.equal(formatSize(1536), '1.5 KB');
  assert.equal(formatSize(12 * 1024), '12 KB');
  assert.equal(formatSize(12.4 * 1024), '12 KB');
  assert.equal(formatSize(3.4 * 1024 * 1024), '3.4 MB');
  assert.equal(formatSize(1023.99 * 1024), '1 MB');
  assert.equal(formatSize(5 * 1024 ** 3), '5 GB');
  assert.equal(formatSize(-5), '0 B');
});

function file(path: string, size: number, mtime = 1): TreeFile {
  return { path, extension: path.slice(path.lastIndexOf('.') + 1), stat: { size, mtime } };
}
const vault: TreeFolder = {
  path: '/',
  children: [
    file('top.md', 100),
    { path: 'A', children: [file('A/a.md', 2000), file('A/pic.png', 5000), { path: 'A/B', children: [file('A/B/b.md', 300)] }] },
  ],
};
const opts = (o: Partial<CountOptions>): CountOptions => ({ ...DEFAULT_OPTIONS, ...o });
const wordsOf: Record<string, number> = { 'top.md': 10, 'A/a.md': 20, 'A/B/b.md': 5 };

test('words mode sums known notes and lists the unknown ones', () => {
  const pending: TreeFile[] = [];
  const c = countTree(vault, opts({ mode: 'words' }), (f) => wordsOf[f.path], pending);
  assert.equal(c.get('/')?.total, 35);
  assert.equal(c.get('A')?.total, 25);
  assert.equal(c.get('A')?.direct, 20);
  assert.equal(c.get('/')?.totalTally.files, 3);
  assert.equal(pending.length, 0);

  const partial: TreeFile[] = [];
  const p = countTree(vault, opts({ mode: 'words' }), (f) => (f.path === 'A/a.md' ? undefined : wordsOf[f.path]), partial);
  assert.deepEqual(partial.map((f) => f.path), ['A/a.md']);
  assert.equal(p.get('/')?.total, 15);
  assert.equal(p.get('/')?.totalTally.pending, 1);
  assert.equal(p.get('A/B')?.totalTally.pending, 0);
});

test('words mode without subfolders', () => {
  const c = countTree(vault, opts({ mode: 'words', recursive: false }), (f) => wordsOf[f.path]);
  assert.equal(describe(c.get('A')!, opts({ mode: 'words', recursive: false })), '20 words directly inside · 1 note · 2 KB · 1 subfolder · 1 other file');
});

test('size mode sums bytes of every file', () => {
  const c = countTree(vault, opts({ mode: 'size' }));
  assert.equal(c.get('/')?.total, 7400);
  assert.equal(c.get('A')?.total, 7300);
  assert.equal(c.get('A')?.direct, 7000);
  assert.equal(formatAmount(c.get('A')!.total, { mode: 'size' }, true), '7.1 KB');
  assert.equal(statusText(c.get('/')!, opts({ mode: 'size' }), false), '7.2 KB');
  assert.equal(describe(c.get('A')!, opts({ mode: 'size' })), '7.1 KB in total · 3 files · 1 subfolder');
});

test('compact applies to words, not sizes', () => {
  assert.equal(formatAmount(12345, { mode: 'words' }, true), '12k');
  assert.equal(formatAmount(12345, { mode: 'words' }, false), '12345');
  assert.equal(formatAmount(2048, { mode: 'size' }, true), '2 KB');
});

test('status bar text follows the mode', () => {
  const words = countTree(vault, opts({ mode: 'words' }), (f) => wordsOf[f.path]);
  assert.equal(statusText(words.get('/')!, opts({ mode: 'words' }), false), '35 words');
  const some = countTree(vault, opts({ mode: 'words' }), (f) => (f.path === 'top.md' ? 1 : undefined));
  assert.equal(statusText(some.get('/')!, opts({ mode: 'words' }), false), '1 word …');
  assert.equal(unitName('words', 1), 'word');
  const notes = countTree(vault, opts({}));
  assert.equal(statusText(notes.get('/')!, opts({}), false), '3 notes');
});

test('notes mode is unchanged by the new fields', () => {
  const c = countTree(vault, opts({}));
  assert.equal(c.get('/')?.total, 3);
  assert.equal(describe(c.get('A')!, opts({})), '2 notes in total · 1 directly inside · 1 subfolder · 1 other file');
});
