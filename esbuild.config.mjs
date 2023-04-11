import esbuild from "esbuild";
import process from "process";
import copy from "esbuild-plugin-copy";
import fs from "fs";
import { dirname } from "path";

const prod = (process.argv[2] === "production");
const outPath = (process.argv[2] != undefined && !prod) ? process.argv[2] : "./out/main.js";
const outDir = dirname(outPath);

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

esbuild.build({
	entryPoints: ["src/main.ts"],
	bundle: true,
	external: ["obsidian", "electron"],
	format: "cjs",
	watch: !prod,
	target: "es2021",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
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
	]
}).catch(e => { throw e });