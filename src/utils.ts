import { App, TFile } from "obsidian";
import HomepagePlugin from "./main";

export function trimFile(file: TFile): string {
	return file.extension == "md" ? file.path.slice(0, -3): file.path;
}

export function untrimName(name: string): string {
	return name.endsWith(".canvas") ? name : `${name}.md`;
}

export function wrapAround(value: number, size: number): number {
	return ((value % size) + size) % size;
};

export function getDailynotesAutorun(plugin: HomepagePlugin): any { 
	const dailyNotes = plugin.internalPlugins["daily-notes"];
	return dailyNotes?.enabled && dailyNotes?.instance.options.autorun; 
};

export function randomFile(app: App): string | undefined {
	const files = app.vault.getFiles().filter(
		(f: TFile) => ["md", "canvas"].contains(f.extension)
	);
	
	if (files.length) {
		const indice = Math.floor(Math.random() * files.length);
		return trimFile(files[indice]);
	}

	return undefined;
}

