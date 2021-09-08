import { App, TFile } from "obsidian";

export function trimFile(file: TFile): string {
	return file.path.slice(0, -3);
}

export function wrapAround(value: number, size: number): number {
	return ((value % size) + size) % size;
};

export function getWorkspacePlugin(app: App) { 
	return (<any> app)?.internalPlugins?.plugins?.workspaces; 
};