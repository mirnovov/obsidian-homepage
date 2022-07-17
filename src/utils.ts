import { App, Setting, TFile } from "obsidian";
import Homepage from "./main";
import { View } from "./settings";

export function trimFile(file: TFile): string {
	return file.path.slice(0, -3);
}

export function wrapAround(value: number, size: number): number {
	return ((value % size) + size) % size;
};

export function getDailynotesAutorun(app: App): any { 
	return (app as any).internalPlugins.getPluginById("daily-notes").instance.options.autorun; 
};

export function getWorkspacePlugin(app: App): any { 
	return (app as any).internalPlugins.plugins.workspaces; 
};

export function disableSetting(setting: Setting): void {
	setting.settingEl.setAttribute("style", "opacity: .5; pointer-events: none !important")		
}

export async function upgradeSettings(plugin: Homepage): Promise<void> {
	plugin.settings.workspace = plugin.settings.defaultNote;
	
	if ((plugin.settings as any).alwaysPreview) {
		plugin.settings.openMode = View.Reading;
	}
	
	plugin.settings.version = 2;
	await plugin.saveSettings();
}

export function hasDataview(app: App): boolean {
	return (app as any).plugins.plugins.dataview != null;
}

export function touchDataview(app: App): void {
	(app as any).plugins.plugins.dataview?.index.touch();
}