import { App, TFile } from "obsidian";

export function trimFile(file: TFile): string {
	return file.path.slice(0, -3);
}

export function wrapAround(value: number, size: number): number {
	return ((value % size) + size) % size;
};

export function getDailynotesAutorun(app: App): any { 
	let dailyNotes = (app as any).internalPlugins.getPluginById("daily-notes");
	return dailyNotes?.enabled && dailyNotes?.instance.options.autorun; 
};

export function getDataviewPlugin(app: App): any {
	return (app as any).plugins.plugins.dataview;
}

export function getWorkspacePlugin(app: App): any { 
	return (app as any).internalPlugins.plugins.workspaces; 
};

export function getNewTabPagePlugin(app: App): any {
	return (app as any).plugins.plugins["new-tab-default-page"];
}