import esbuild from "esbuild";
import copy from "esbuild-plugin-copy";
import { typecheckPlugin } from "@jgoz/esbuild-plugin-typecheck";
import process from "process";
import fs from "fs";
import { dirname } from "path";

const prod = process.argv[2] === "production";
const outPath = process.argv[2] && !prod ? process.argv[2] : "./out/main.js";
const outDir = dirname(outPath);

const context = await esbuild.context({
	entryPoints: ["src/main.ts"],
	bundle: true,
	external: ["obsidian", "electron"],
	format: "cjs",
	target: "es2021",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	minify: prod,
	outfile: outPath,
	plugins: [
		copy({
			resolveFrom: "cwd",
			assets: [
				{ from: "./styles.css", to: `${outDir}/styles.css` },
				{ from: "./manifest.json", to: `${outDir}/manifest.json` }
			],
			watch: !prod
		})
	].concat(prod ? typecheckPlugin() : [])
});

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

if (prod) {
	await context.rebuild();
	await context.dispose();
}
else {
	await context.watch();
}
	