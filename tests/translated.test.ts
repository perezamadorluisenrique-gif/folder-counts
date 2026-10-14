import assert from 'node:assert/strict';
import test from 'node:test';

import { DEFAULT_OPTIONS, countPhrase, countTree, describe, statusText } from '../src/count.ts';
import { setLocale } from '../src/i18n.ts';

const tree = {
  path: '/',
  children: [
    { path: 'A', children: [{ path: 'A/x.md', extension: 'md', stat: { size: 10, mtime: 1 } }, { path: 'A/y.png', extension: 'png', stat: { size: 10, mtime: 1 } }] },
  ],
};

test('the tooltip and the status bar are worded in the app language, and English again afterwards', () => {
  const counts = countTree(tree, DEFAULT_OPTIONS);
  const a = counts.get('A')!;
  try {
    setLocale('de');
    assert.equal(describe(a, DEFAULT_OPTIONS), '1 Notiz insgesamt · 1 weitere Datei');
    assert.equal(countPhrase('notes', 12000, '12k'), '12k Notizen');
    setLocale('ru');
    assert.equal(countPhrase('notes', 3), 'заметок: 3');
    assert.match(statusText(counts.get('/')!, DEFAULT_OPTIONS, false), /^заметок: 1/);
  } finally {
    setLocale('en');
  }
  assert.equal(describe(a, DEFAULT_OPTIONS), '1 note in total · 1 other file');
});
