import esbuild from "esbuild";
import process from "process";
import fs from "fs";
import { dirname } from "path";

const prod = (process.argv[2] === "production");
const outPath = (process.argv[2] != undefined && !prod) ? process.argv[2] : "./out/main.js";
const outDir = dirname(outPath);

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
fs.copyFile("manifest.json", `${outDir}/manifest.json`, e => { if (e) throw e });

esbuild.build({
	entryPoints: ["src/main.ts"],
	bundle: true,
	external: ["obsidian", "electron"],
	format: "cjs",
	watch: !prod,
	target: "es2016",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outfile: outPath
}).catch(e => { throw e });