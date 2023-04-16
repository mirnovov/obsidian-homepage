import esbuild from "esbuild";
import copy from "esbuild-plugin-copy";
import { typecheckPlugin } from "@jgoz/esbuild-plugin-typecheck";
import opener from "opener";

import fs from "fs";
import { dirname, resolve } from "path";
import process from "process";

let mode, outPath, inPath, outDir, plugins;

switch (process.argv[2]) {
	case "production":
	case "prod":
		mode = "prod";
		break;
	case "test":
		mode = "test";
		outPath = "./test/vault/.obsidian/plugins/homepage/main.js";
		inPath = "test/main.ts";
		break;
	default:
		mode = "dev";
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
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const context = await esbuild.context({
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

if (mode != "dev") {
	await context.rebuild();
	await context.dispose();
}
else {
	await context.watch();
}

if (mode == "test") {
	opener("obsidian://nv-testing-restart");
	
	setTimeout(() => {
		const path = encodeURI(resolve("./test/vault"))
		opener(`obsidian://open?path=${path}`)
	}, 500);
}
	