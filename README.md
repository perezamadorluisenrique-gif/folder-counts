# Folder Counts

See how many notes each folder holds, right in the file explorer.

![The file explorer with a number beside each folder: Journal 353, Projects 91 (Archive 64, Garden 7, Website 19), Reading 32, Templates 5, Attachments 0](https://raw.githubusercontent.com/perezamadorluisenrique-gif/folder-counts/main/docs/explorer.png)

The numbers update by themselves as you create, delete, move and rename
files. Hover a number to see what is behind it, for example
"91 notes in total · 1 directly inside · 3 subfolders".

Works on desktop and mobile.

## Settings

**Counting**

| Setting | Default | What it does |
|---|---|---|
| What to count | Notes | Notes (Markdown files), all files, only the file types you list, the total words of your notes, or the total size of your files. |
| Extensions | `md` | With "Files with these extensions": the types to count, such as `md, canvas, pdf`. |
| Count everything except these | off | Turns the extension list into a list of types to skip. |
| Include subfolders | on | Count everything below a folder, or only the files directly inside it. |
| Excluded folders | none | One folder per line. Excluded folders get no number and add nothing to their parents. Wildcards work: `Archive/**`, `**/attachments`. |

**Display**

| Setting | Default | What it does |
|---|---|---|
| Show counts on expanded folders | off | An open folder with subfolders hides its number, since its contents are on screen. Turn on to always show it. |
| Hide zero counts | off | Leave empty folders blank. |
| Compact numbers | off | `1.2k` instead of `1234`. Applies to counts and words; sizes are always short (`12 KB`, `3.4 MB`). |
| Vault total in the status bar | off | What the whole vault holds, following what you count: notes, files, words or size. |

Right-click a folder and choose **Exclude from folder counts** to add it to
the excluded list, or **Count this folder again** to take it off.

## Words and sizes

Choose **Words in notes** under "What to count" and each folder shows the
total words of the notes inside it, the way writers track a project. Choose
**Size of files** to see how much space a folder takes, as `12 KB` or
`3.4 MB`. Hover a number for the breakdown, for example
"12400 words in total · 18 notes · 96 KB · 2 subfolders".

How words are counted: front matter, fenced code blocks and `%%comments%%`
are skipped; a link like `[[Note|shown text]]` counts the text you see;
embeds and image links count nothing; each Chinese, Japanese kana or Kanji
character counts as one word.

Words are read from your notes in the background, a few at a time, so a big
vault never stalls Obsidian. Numbers still being counted are shown in italics
and fill in as the reading goes. Each note is read once and remembered until
it changes. Editing a note updates its folder a moment after you pause.
Size mode needs no reading at all.

## Commands

| Command | What it does |
|---|---|
| Show or hide the counts | Turns the numbers off and on for this session. |
| Recount all folders | Counts again from scratch. You should never need it. |

## Coming from File Explorer Note Count

This plugin does what
[File Explorer Note Count](https://github.com/ozntel/file-explorer-note-count)
does and adds excluded folders, direct-only counts, hiding zeros, compact
numbers, a vault total in the status bar and the tooltip. On first run it
copies that plugin's settings (what to count, the extension filter, "show all
numbers" and the root folder total), and **Settings → Import from File
Explorer Note Count** does it again at any time. Turn the old plugin off, or
each folder will show two numbers.

## How it works

The whole vault is counted in one pass over Obsidian's file tree (no file is
opened or read, except in words mode), then each folder's number is placed in the explorer. Changes
are collected for a moment and counted once, so a sync that brings in a
thousand files costs one recount, not a thousand.

## Styling

Each number is a `.folder-counts-badge` element inside the folder's title.
Folders that have subfolders also carry `.has-subfolders`. A CSS snippet can
restyle them, for example:

```css
.folder-counts-badge { color: var(--text-accent); }
```

## Installation

In Obsidian, open **Settings → Community plugins → Browse** and search for
"Folder Counts".

## More plugins by Siulved54

| Plugin | What it does | Source |
| --- | --- | --- |
| [Shared Blocks](https://obsidian.md/plugins?id=shared-blocks) | Write a block of text once and reuse it in any note. Edit the source and every reference re-renders live. | [shared-blocks](https://github.com/perezamadorluisenrique-gif/shared-blocks) |
| [Text Case and Cleanup](https://obsidian.md/plugins?id=text-format) | Change case, make camelCase or slugs, sort lines and remove duplicates, and repair text pasted out of a PDF, without touching code or URLs. | [text-format](https://github.com/perezamadorluisenrique-gif/text-format) |
| [Typography as You Type](https://obsidian.md/plugins?id=typography-as-you-type) | Curly quotes, dashes and ellipses as you type, kept out of code and maths, with Backspace to take one back. | [smart-typography-plugin](https://github.com/perezamadorluisenrique-gif/smart-typography-plugin) |
| [Section Numbering](https://obsidian.md/plugins?id=section-numbering) | Number headings as an outline (1, 1.1, 1.2) and keep every link to them working when they renumber. | [section-numbering](https://github.com/perezamadorluisenrique-gif/section-numbering) |
| [Spreadsheet to Table](https://obsidian.md/plugins?id=spreadsheet-to-table) | Paste cells from Excel or Google Sheets as a Markdown table with a real header, insert CSV files, and copy tables back out. | [spreadsheet-to-table](https://github.com/perezamadorluisenrique-gif/spreadsheet-to-table) |
| [Hybrid Line Numbers](https://obsidian.md/plugins?id=hybrid-line-numbers) | Relative and hybrid line numbers for Vim-style jumps, where a folded section counts as one line. | [hybrid-line-numbers](https://github.com/perezamadorluisenrique-gif/hybrid-line-numbers) |
| [List Item Callouts](https://obsidian.md/plugins?id=list-item-callouts) | Colour a single list item as a callout by starting it with a character such as `&`, `!` or `?`. | [list-item-callouts](https://github.com/perezamadorluisenrique-gif/list-item-callouts) |
| [Note Reading Time](https://obsidian.md/plugins?id=note-reading-time) | Reading time of the current note or your selection in the status bar, optionally saved to a property. | [note-reading-time](https://github.com/perezamadorluisenrique-gif/note-reading-time) |
| [Task Rollover](https://obsidian.md/plugins?id=task-rollover) | Roll unfinished tasks from your last daily note into today's when it is created, with a real undo. | [task-rollover](https://github.com/perezamadorluisenrique-gif/task-rollover) |
| [Zoom Into Section](https://obsidian.md/plugins?id=zoom-into-section) | Zoom into a heading or list item to see only it and its contents, with a breadcrumb bar to climb back out. | [zoom-into-section](https://github.com/perezamadorluisenrique-gif/zoom-into-section) |
| [Link Title on Paste](https://obsidian.md/plugins?id=link-title-on-paste) | Paste a web address and get a Markdown link with the page's title, fetched in the background and undone in one step. | [link-title-on-paste](https://github.com/perezamadorluisenrique-gif/link-title-on-paste) |
| [Update Radar](https://obsidian.md/plugins?id=update-radar) | Checks your installed community plugins for updates in the background, shows what changed, and flags the ones that look abandoned. | [community-update-checker](https://github.com/perezamadorluisenrique-gif/community-update-checker) |
| [Dataview to Bases](https://obsidian.md/plugins?id=dataview-to-bases) | Convert Dataview queries into Bases blocks, and see which queries in your vault can be converted. | [dataview-to-bases](https://github.com/perezamadorluisenrique-gif/dataview-to-bases) |
| [Line Editing Commands](https://obsidian.md/plugins?id=line-editing-commands) | Duplicate, join, sort and reverse lines, insert blank lines and jump to a line number, with multi-cursor support. | [line-editing-commands](https://github.com/perezamadorluisenrique-gif/line-editing-commands) |
| [Note Mover Rules](https://obsidian.md/plugins?id=note-mover-rules) | Move notes into folders by ordered rules on tags, properties, titles and paths, with a preview before any bulk move. | [note-mover-rules](https://github.com/perezamadorluisenrique-gif/note-mover-rules) |
| [Tab History](https://obsidian.md/plugins?id=tab-history) | Keeps each tab's back and forward history across restarts, and adds commands to move, maximize and close tabs. | [tab-history](https://github.com/perezamadorluisenrique-gif/tab-history) |
| [URL Cards](https://obsidian.md/plugins?id=url-cards) | Shows web addresses as cards with title, description and image, and reads existing cardlink blocks. | [url-cards](https://github.com/perezamadorluisenrique-gif/url-cards) |
| [Vim Config](https://obsidian.md/plugins?id=vim-config) | Loads a vimrc-style file from your vault so your key mappings and editor commands are ready when vim mode starts. | [vim-config](https://github.com/perezamadorluisenrique-gif/vim-config) |
| [Task Archive](https://obsidian.md/plugins?id=task-archive) | Moves completed tasks, with their sub-items, into an archive section or note. | [task-archive](https://github.com/perezamadorluisenrique-gif/task-archive) |
| [Revisit Later](https://obsidian.md/plugins?id=revisit-later) | Link the current note into a future daily note, with a date typed in plain English, so it comes back when you want to review it. | [revisit-later](https://github.com/perezamadorluisenrique-gif/revisit-later) |
| [Explorer Colors Plus](https://obsidian.md/plugins?id=explorer-colors-plus) | Color files and folders in the file explorer, with a palette, cascading to children, and import from File Color. | [explorer-colors-plus](https://github.com/perezamadorluisenrique-gif/explorer-colors-plus) |
| [Book Lookup](https://obsidian.md/plugins?id=book-lookup) | Create book notes from Open Library or Google Books, with cover images, ISBN search and Book Search compatible templates. | [book-lookup](https://github.com/perezamadorluisenrique-gif/book-lookup) |
| [Web Search Menu](https://obsidian.md/plugins?id=web-search-menu) | Search the web for selected text or the note title from the right-click menu, with engines you define. | [web-search-menu](https://github.com/perezamadorluisenrique-gif/web-search-menu) |

All of them are in the community directory: Settings -> Community plugins ->
Browse, then search for the name.

## License

MIT
