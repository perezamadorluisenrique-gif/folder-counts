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
| What to count | Notes | Notes (Markdown files), all files, or only the file types you list. |
| Extensions | `md` | With "Files with these extensions": the types to count, such as `md, canvas, pdf`. |
| Count everything except these | off | Turns the extension list into a list of types to skip. |
| Include subfolders | on | Count everything below a folder, or only the files directly inside it. |
| Excluded folders | none | One folder per line. Excluded folders get no number and add nothing to their parents. Wildcards work: `Archive/**`, `**/attachments`. |

**Display**

| Setting | Default | What it does |
|---|---|---|
| Show counts on expanded folders | off | An open folder with subfolders hides its number, since its contents are on screen. Turn on to always show it. |
| Hide zero counts | off | Leave empty folders blank. |
| Compact numbers | off | `1.2k` instead of `1234`. |
| Vault total in the status bar | off | How many notes (or files) the whole vault holds. |

Right-click a folder and choose **Exclude from folder counts** to add it to
the excluded list, or **Count this folder again** to take it off.

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
opened or read), then each folder's number is placed in the explorer. Changes
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

All of them are in the community directory: Settings -> Community plugins ->
Browse, then search for the name.

## License

MIT
