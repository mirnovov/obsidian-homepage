import esbuild from "esbuild";
import process from "process";
import fs from "fs";

const prod = (process.argv[2] === "production");

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
	outfile: (process.argv[2] != undefined && !prod) ? process.argv[2] : "out/main.js"
}).catch(e => { throw e });

if (prod) {
	fs.copyFile("manifest.json", "./out/manifest.json", e => { if (e) throw e });
}