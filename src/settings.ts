import { App, PluginSettingTab, Setting, TAbstractFile, TFile, normalizePath } from "obsidian";
import Homepage from "./main";
import { TextInputSuggest } from "./suggest";
import { trimFile, getWorkspacePlugin } from "./utils";

export enum Mode {
	ReplaceAll = "Replace all open notes",
	ReplaceLast = "Replace last note",
	Retain = "Keep open notes"
}

export enum View {
	Default = "Default view",
	Reading = "Reading view",
	Source = "Editing view (Source)",
	LivePreview = "Editing view (Live Preview)"
}

export interface HomepageSettings {
	version: number,
	defaultNote: string,
	workspace: string,
	workspaceEnabled: boolean,
	hasRibbonIcon: boolean,
	openMode: string,
	view: string
}

export const DEFAULT: HomepageSettings = {
	version: 0,
	defaultNote: "Home",
	workspace: "Homepage",
	workspaceEnabled: false,
	hasRibbonIcon: true,
	openMode: Mode.ReplaceAll,
	view: View.Default
}

function disable(setting: Setting) {
	setting.settingEl.setAttribute("style", "opacity: .5; pointer-events: none !important")		
}

export class HomepageSettingTab extends PluginSettingTab {
	plugin: Homepage;
	settings: HomepageSettings;

	constructor(app: App, plugin: Homepage) {
		super(app, plugin);
		this.plugin = plugin;
		this.settings = plugin.settings;
	}
	
	sanitiseNote(value: string): string { 
		if (value === null || value.match(/^\s*$/) !== null) {
			return null;
		}
		return normalizePath(value);
	};

	display(): void {
		const workspacesMode = this.plugin.workspacesMode();
		this.containerEl.empty();
		
		const suggestor = workspacesMode ? WorkspaceSuggest : FileSuggest;
		const homepageDesc = workspacesMode ?
			"The name of the workspace to open on startup." :
			"The name of the note to open on startup. If it doesn't exist, a new note will be created.";
		const homepage = workspacesMode ? "workspace" : "defaultNote";
		
		new Setting(this.containerEl)
			.setName("Homepage")
			.setDesc(homepageDesc)
			.addText(text => {
				new suggestor(this.app, text.inputEl);
				text.setPlaceholder(DEFAULT[homepage])
					.setValue(DEFAULT[homepage] == this.settings[homepage] ? "" : this.settings[homepage])
					.onChange(async (value) => {
						this.settings[homepage] = this.sanitiseNote(value) || DEFAULT[homepage];
						await this.plugin.saveSettings();
					});
			});
			
		if(this.plugin.workspacePlugin?.enabled) {
			new Setting(this.containerEl)
				.setName("Use workspaces")
				.setDesc("Open a workspace, instead of a note, as the homepage.")
				.addToggle(toggle => toggle
					.setValue(this.settings.workspaceEnabled)
					.onChange(async value => {
						this.settings.workspaceEnabled = value;
						await this.plugin.saveSettings();
						this.display(); //update stuff
					})
				);
		}
		
		let ribbonSetting = new Setting(this.containerEl)
			.setName("Display ribbon icon")
			.setDesc("Show a little house on the ribbon, allowing you to quickly access the homepage.")
			.addToggle(toggle => toggle
				.setValue(this.settings.hasRibbonIcon)
				.onChange(async value => {
					this.settings.hasRibbonIcon = value;
					await this.plugin.saveSettings();
				})
			);
		
		ribbonSetting.settingEl.setAttribute("style", "padding-top: 70px; border-top: none !important");	
		ribbonSetting.descEl.createDiv({ text: "Takes effect on startup.", attr: {class: "mod-warning"}});
		
		let viewSetting = new Setting(this.containerEl)
			.setName("Homepage view")
			.setDesc("Choose what view to open the homepage in.")
			.addDropdown(async dropdown => {
				for (let key of Object.values(View)) {
					dropdown.addOption(key, key);
				}
				dropdown.setValue(this.settings.view);
				dropdown.onChange(async option => { 
					this.settings.view = option; 
					await this.plugin.saveSettings();
				});
			});
			
		let modeSetting = new Setting(this.containerEl)
			.setName("Opening method")
			.setDesc("Determine how existing notes are affected on startup.")
			.addDropdown(async dropdown => {
				for (let key of Object.values(Mode)) {
					dropdown.addOption(key, key);
				}
				dropdown.setValue(this.settings.openMode);
				dropdown.onChange(async option => { 
					this.settings.openMode = option; 
					await this.plugin.saveSettings();
				});
			});

		if (workspacesMode) {
			[viewSetting, modeSetting].forEach(disable)
		}
	}
}

class FileSuggest extends TextInputSuggest<TFile> {
	getSuggestions(inputStr: string): TFile[] {
		const abstractFiles = this.app.vault.getAllLoadedFiles();
		const files: TFile[] = [];
		const inputLower = inputStr.toLowerCase();

		abstractFiles.forEach((file: TAbstractFile) => {
			if (
				file instanceof TFile && file.extension === "md" && 
				file.path.toLowerCase().contains(inputLower)
			) {
				files.push(file);
			}
		});
	
		return files;
	}
	
	renderSuggestion(file: TFile, el: HTMLElement): void {
		el.setText(trimFile(file));
	 }

	selectSuggestion(file: TFile): void {
		this.inputEl.value = trimFile(file);
		this.inputEl.trigger("input");
		this.close();
	}
}

class WorkspaceSuggest extends TextInputSuggest<string> {
	getSuggestions(inputStr: string): string[] {
		const workspaces = Object.keys(getWorkspacePlugin(this.app)?.instance.workspaces);
		const inputLower = inputStr.toLowerCase();
		
		return workspaces.filter((workspace: string) => workspace.toLowerCase().contains(inputLower));
	}
	
	renderSuggestion(workspace: string, el: HTMLElement): void {
		el.setText(workspace);
	 }

	selectSuggestion(workspace: string): void {
		this.inputEl.value = workspace;
		this.inputEl.trigger("input");
		this.close();
	}
}
