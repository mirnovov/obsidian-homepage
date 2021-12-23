import { App, TFile } from "obsidian";
import Homepage from "./main";
import { View } from "./settings";

export function trimFile(file: TFile): string {
	return file.path.slice(0, -3);
}

export function wrapAround(value: number, size: number): number {
	return ((value % size) + size) % size;
};

export function getWorkspacePlugin(app: App) { 
	return (<any> app)?.internalPlugins?.plugins?.workspaces; 
};

export async function upgradeSettings(plugin: Homepage) {
	plugin.settings.defaultWorkspace = plugin.settings.defaultNote;
	
	if((plugin.settings as any).alwaysPreview) {
		plugin.settings.openMode = View.Reading;
	}
	
	plugin.settings.version = 2;
	await plugin.saveSettings();
}