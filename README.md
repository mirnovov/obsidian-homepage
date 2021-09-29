## Homepage Obsidian Plugin
#### Opens a specified note upon launching Obsidian, instead of the most recent note.

By default, this plugin opens a note called `Home` in the root directory on startup. If such a note is already open, it will be kept. This can be changed in the plugin settings:

* Enable `Use workspaces` to open a workspace of that name instead.
* Use `Open on startup` to change the note or workspace to open. If a specified note is nonexistent, it will be created.
* Choose an `Open mode` to decide what happens to any notes that were left open.

The homepage can also be opened at any time with the `Open homepage` command, or by clicking on the house icon on Obsidian's ribbon (this can be disabled in the plugin settings).

## Installation

You can either obtain the plugin using Obsidian's built-in browser, or install it manually by putting it in your vault's `.obsidian/plugins` folder. If doing the latter, you'll need to run `npm i` in the plugin directory to initialise the npm package and download required sources. Then execute `npm run build`, which will compile the package's TypeScript files into JavaScript.