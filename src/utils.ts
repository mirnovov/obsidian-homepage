import { App, TFile, View as OView } from "obsidian";

export function trimFile(file: TFile): string {
	if (!file) return "";
	return file.extension == "md" ? file.path.slice(0, -3): file.path;
}

export function untrimName(name: string): string {
	const hasExtension = name.split("/").slice(-1)[0].contains(".");
	return hasExtension ? name : `${name}.md`;
}

export function wrapAround(value: number, size: number): number {
	return ((value % size) + size) % size;
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

export function emptyActiveView(app: App): boolean {
	return app.workspace.getActiveViewOfType(OView)?.getViewType() == "empty";
}

