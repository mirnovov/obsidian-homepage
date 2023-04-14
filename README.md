<h1 align="center">Homepage</h1>
<p align="center">Open a specified note, canvas, or workspace upon launching <a href="https://obsidian.md">Obsidian</a>.</p>
<br>

* Use any note, canvas, or workspace as a homepage. Alternatively, choose a random note, use your Daily Note, or create advanced schedules using [Moment syntax](https://momentjs.com/docs/#/displaying/format/).
* Decide what happens to old tabs that were left open - keep them, replace the last note, or remove them all.
<!---->
* Jump back after startup using the `Open homepage` command, or click the dedicated ribbon button.
* Open in in any view: Reading, Source, Live Preview, or the default. Optionally revert the view when opening another note.
<!---->
* Run any Obsidian command upon opening the homepage, allowing integration with hundreds of plugins. 
* Works effectively with tools such as [Dataview](https://github.com/blacksmithgu/obsidian-dataview) to create advanced landing pages.

### Installation

The easiest way to install Homepage is to use Obsidian's built-in plugin browser - or for pre-release versions, a tool such as [BRAT](https://github.com/TfTHacker/obsidian42-brat).

But if you've a developer, you can install it manually: download the directory and initialise sources using `npm install`. Once installed, you can get ESBuild to rebuild the plugin every time you've changed something:

```sh
npm dev path/to/test/vault/.obsidian/plugins/homepage/main.js
```

You can also run `npm run build` to create production sources in an `./out` folder. These can then be copied to `path/to/vault/.obsidian/plugins/homepage` in your vault to use as a plugin.