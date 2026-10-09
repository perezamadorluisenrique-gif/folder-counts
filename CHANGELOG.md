# Changelog

The release workflow uses the section named after the version being released
as the release description, so every version needs one. `npm version <x.y.z>`
renames the `Unreleased` heading below to that version.

## Unreleased

- New "What to count" modes: total words of the notes in a folder (skipping front matter, code blocks and comments, counting each CJK character), and total size of the files (`12 KB`, `3.4 MB`). The hover breakdown and the status-bar total follow the mode.
- Words are read in the background and remembered until a note changes, so large vaults stay responsive.

## 0.1.0

- A number beside every folder in the file explorer: how many notes, files or chosen file types it holds, with or without its subfolders. Hover it for the breakdown.
- Updates by itself on create, delete, move and rename, with one recount per burst of changes.
- Excluded folders (paths or wildcards), from the settings or a folder's right-click menu.
- Options to show counts on expanded folders, hide zeros, use compact numbers (1.2k) and show the vault total in the status bar.
- Imports the settings of File Explorer Note Count on first run.
