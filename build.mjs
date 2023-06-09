import esbuild from "esbuild";
import copy from "esbuild-plugin-copy";
import { typecheckPlugin } from "@jgoz/esbuild-plugin-typecheck";
import opener from "opener";

import fs from "fs/promises";
import { dirname, resolve } from "path";
import process from "process";

function getMode(keyword) {
	if (["production", "prod"].includes(keyword)) return "prod";
	else if (keyword === "test") return "test";
	else return "dev";
}

async function generateContext(mode) {
	let outPath, inPath, outDir, plugins;
	
	switch (mode) {
		case "prod":
			break;
		case "test":
			outPath = "./tests/vault/.obsidian/plugins/homepage/main.js";
			inPath = "./tests/harness.ts";
			break;
		case "dev":
		default:
			outPath = process.argv[2];
			break;
	}
	
	inPath = inPath || "./src/main.ts";
	outPath = outPath || "./out/main.js";
	outDir = dirname(outPath);
	plugins = [
		copy({
			resolveFrom: "cwd",
			assets: [
				{ from: "./styles.css", to: `${outDir}/styles.css` },
				{ from: "./manifest.json", to: `${outDir}/manifest.json` }
			],
			watch: mode != "prod"
		})
	];
	
	if (mode == "prod") plugins.push(typecheckPlugin());
	await fs.mkdir(outDir, { recursive: true });
	
	return esbuild.context({
		entryPoints: [inPath],
		bundle: true,
		external: ["obsidian", "electron"],
		format: "cjs",
		target: "es2021",
		logLevel: "info",
		sourcemap: mode == "prod" ? false : "inline",
		treeShaking: true,
		minify: mode == "prod",
		outfile: outPath,
		plugins: plugins
	});
}

async function startTests() {
	await ensurePlugin("blacksmithgu/obsidian-dataview", "master", "dataview")
	await ensurePlugin("liamcain/obsidian-periodic-notes", "main", "periodic-notes")
	
	opener("obsidian://nv-testing-restart");
	
	setTimeout(() => {
		const path = encodeURI(resolve("./tests/vault"))
		opener(`obsidian://open?path=${path}`)
	}, 500);
}

async function ensurePlugin(url, branch, name) {
	let version = "0";
	const latest = (await fetch(
		`https://raw.githubusercontent.com/${url}/${branch}/manifest.json`
	).then(r => r.json())).version;
	
	try {
		const manifest = JSON.parse(await fs.readFile(
			`./tests/vault/.obsidian/plugins/${name}/manifest.json`
		));
		
		version = manifest.version;
	}
	catch (e) {
		if (e.code !== "ENOENT") throw e;
	}
	
	if (latest !== version) {
		await fs.mkdir(`./tests/vault/.obsidian/plugins/${name}/`, { recursive: true });

		const info = await fetch(
			`https://api.github.com/repos/${url}/releases/tags/${latest}`
		).then(r => r.json());
		
		for (const file of info.assets) {
			if (!["main.js", "manifest.json", "styles.css"].includes(file.name)) continue; 
			
			const content = await fetch(file.browser_download_url).then(r => r.text());
			await fs.writeFile(
				`./tests/vault/.obsidian/plugins/${name}/${file.name}`, content
			);
		}
	}
	
	console.log(`${name} ${latest} installed for testing`);
}

const mode = getMode(process.argv[2]);
const context = await generateContext(mode);

if (mode !== "dev") {
	await context.rebuild();
	await context.dispose();
}
else {
	await context.watch();
}

if (mode === "test") await startTests();
	