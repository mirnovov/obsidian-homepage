import esbuild from "esbuild";
import process from "process";
import copyStaticFiles from "esbuild-copy-static-files";
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
		copyStaticFiles({
			src: "./static",
			dest: outDir,
			dereference: false,
			preserveTimestamps: false,
			recursive: false
		})
	]
}).catch(e => { throw e });