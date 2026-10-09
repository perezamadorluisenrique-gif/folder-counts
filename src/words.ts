// Pure logic: no `obsidian` import. Counts the words a reader would see.

/** Han, kana and the prolonged sound mark: written without spaces, so each character is one word. */
const CJK = '\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}\\u30FC';
const WORD_CHAR = `(?:(?![${CJK}])[\\p{L}\\p{N}\\p{M}])`;
/** A word, or one CJK character. Apostrophes, hyphens and decimal points inside a word keep it whole: don't, well-known, 3.14. */
const TOKEN = new RegExp(`[${CJK}]|${WORD_CHAR}+(?:['’\\-.,]${WORD_CHAR}+)*`, 'gu');

/** The text without a leading front matter block (`---` ... `---`). An unclosed block is kept as text. */
export function stripFrontMatter(text: string): string {
  const body = text.replace(/^\uFEFF/, '');
  if (!/^---[ \t]*\r?\n/.test(body)) return body;
  const lines = body.split('\n');
  for (let i = 1; i < lines.length; i++) {
    if (/^(---|\.\.\.)[ \t]*\r?$/.test(lines[i])) return lines.slice(i + 1).join('\n');
  }
  return body;
}

/** Drops fenced code blocks (``` or ~~~). A fence left open runs to the end of the note. */
export function stripFencedCode(text: string): string {
  const out: string[] = [];
  let fence: { char: string; len: number } | null = null;
  for (const line of text.split('\n')) {
    if (fence) {
      const close = /^\s*(`{3,}|~{3,})[ \t]*\r?$/.exec(line);
      if (close && close[1][0] === fence.char && close[1].length >= fence.len) fence = null;
      continue;
    }
    const open = /^\s*(`{3,}|~{3,})/.exec(line);
    if (open) {
      fence = { char: open[1][0], len: open[1].length };
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
}

/** Drops `%%comments%%`, inline or over several lines. An unclosed one runs to the end. */
export function stripComments(text: string): string {
  return text.replace(/%%[\s\S]*?%%/g, ' ').replace(/%%[\s\S]*$/, ' ');
}

/** Links and embeds reduced to what is displayed: `[[a|b]]` is `b`, `[t](url)` is `t`, embeds and images are nothing. */
export function stripLinks(text: string): string {
  return text
    .replace(/!\[\[[^\]\n]*\]\]/g, ' ')
    .replace(/\[\[([^\]\n]*)\]\]/g, (_m, inner: string) => {
      const bar = inner.indexOf('|');
      return bar >= 0 ? inner.slice(bar + 1) : inner.replace(/[#^]/g, ' ');
    })
    .replace(/!\[[^\]\n]*\]\([^)\n]*\)/g, ' ')
    .replace(/\[([^\]\n]*)\]\([^)\n]*\)/g, '$1');
}

/** Words in a Markdown note: front matter, fenced code, comments, embeds, block ids and HTML tags do not count. */
export function countWords(markdown: string): number {
  let text = stripFrontMatter(markdown);
  text = stripFencedCode(text);
  text = stripComments(text);
  text = stripLinks(text);
  text = text.replace(/<\/?[a-zA-Z][^>\n]*>/g, ' ').replace(/[ \t]\^[\w-]+[ \t]*$/gm, '');
  return text.match(TOKEN)?.length ?? 0;
}

/** Words per note, remembered by path and modification time so an unchanged note is never read twice. */
export class WordCache {
  private entries = new Map<string, { mtime: number; words: number }>();

  get(path: string, mtime: number): number | undefined {
    const entry = this.entries.get(path);
    return entry && entry.mtime === mtime ? entry.words : undefined;
  }

  set(path: string, mtime: number, words: number): void {
    this.entries.set(path, { mtime, words });
  }

  delete(path: string): void {
    this.entries.delete(path);
  }

  /** A moved note keeps its words; a moved folder moves everything below it. */
  rename(from: string, to: string): void {
    const moved: [string, { mtime: number; words: number }][] = [];
    for (const [path, entry] of this.entries) {
      if (path === from) moved.push([to, entry]);
      else if (path.startsWith(`${from}/`)) moved.push([to + path.slice(from.length), entry]);
      else continue;
      this.entries.delete(path);
    }
    for (const [path, entry] of moved) this.entries.set(path, entry);
  }

  get size(): number {
    return this.entries.size;
  }
}
