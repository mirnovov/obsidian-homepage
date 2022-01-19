<h1 align="center">Homepage</h1>
<p align="center">Open a specified note upon launching <a href="https://obsidian.md">Obsidian</a>, instead of the most recent one.</p>
<br>

* Choose **any note or workspace** in the vault to open. If a specified note doesn't exist, it is automatically created.
* Use a variety of **opening methods** to decide what happens to any notes that were left open - keep them, replace the last note, or remove them all.
* Access the homepage layout **at any time** using the `Open homepage` command, or clicking the dedicated ribbon button.
* Open notes in **any viewing mode** - Reading, Source, and Obsidian's new Live Preview mode.
* Works effectively with **other plugins** such as [Dataview](https://github.com/blacksmithgu/obsidian-dataview), allowing advanced landing pages that keep tabs on every note.

### Installation

The easiest way to install Homepage is to use Obsidian's built-in plugin browser - or for pre-release versions, a tool such as [BRAT](https://github.com/TfTHacker/obsidian42-brat). 

But if you've a developer, you can install it manually: download the directory and initialise sources using `npm install`. Once installed, you can get ESBuild to rebuild the plugin every time you've changed something:

```bash	
npm dev path/to/test/vault/.obsidian/plugins/homepage/main.js
```

You can also run `npm run build` to create production sources in an `./out` folder. These can then be copied to `path/to/vault/.obsidian/plugins/homepage` in your vault to use as a plugin.