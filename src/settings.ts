import { App, PluginSettingTab, Setting, TAbstractFile, TFile, normalizePath } from "obsidian";
import Homepage from "./main";
import { TextInputSuggest } from "./suggest";
import { disableSetting, getDailynotesAutorun, getDataviewPlugin, getWorkspacePlugin, trimFile } from "./utils";

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
	useMoment: boolean,
	momentFormat: string,
	workspace: string,
	workspaceEnabled: boolean,
	hasRibbonIcon: boolean,
	openMode: string,
	manualOpenMode: string,
	view: string,
	refreshDataview: boolean
}

export const DEFAULT: HomepageSettings = {
	version: 0,
	defaultNote: "Home",
	useMoment: false,
	momentFormat: "YYYY-MM-DD",
	workspace: "Home",
	workspaceEnabled: false,
	hasRibbonIcon: true,
	openMode: Mode.ReplaceAll,
	manualOpenMode: Mode.Retain,
	view: View.Default,
	refreshDataview: false
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
	}

	display(): void {
		const workspacesMode = this.plugin.workspacesMode();
		this.containerEl.empty();
		
		if (getDailynotesAutorun(this.app)) {
			this.containerEl.insertAdjacentHTML("afterbegin",
				"<div class='mod-warning' style='margin-bottom: 20px'>Daily Notes' 'Open daily note on startup'" +
				" setting is not compatible with this plugin, so functionality has been disabled.</div>"
			);
		}

		const suggestor = workspacesMode ? WorkspaceSuggest : FileSuggest;
		const homepageDesc = workspacesMode ?
			"The name of the workspace to open on startup." :
			"The name of the note to open on startup. If it doesn't exist, a new note will be created.";
		const homepage = workspacesMode ? "workspace" : "defaultNote";

		// only show the moment field if they're enabled and the workspace isn't, other show the regular entry field
		if (this.plugin.settings.useMoment && !this.plugin.settings.workspaceEnabled) {
			let dateSetting = new Setting(this.containerEl)
				.setName("Homepage format")
				.setDesc(
					"A valid Moment format specification determining the note to be opened on startup." +
					" If the resulting note doesn't exist, a new one will be created."
				)
				.addMomentFormat(text => text
					.setDefaultFormat("YYYY-MM-DD")
					.setValue(this.plugin.settings.momentFormat)
					.onChange(value => {
						this.plugin.settings.momentFormat = value;
						this.plugin.saveSettings();
					})
				);
			
			dateSetting.descEl.createEl("br");	
			dateSetting.descEl.createEl("a", {
				text: "Moment formatting info", attr: {href: "https://momentjs.com/docs/#/displaying/format/"}
			});
		} else {
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
		}

		new Setting(this.containerEl)
			.setName("Use date formatting")
			.setDesc(
				"Open the homepage using Moment date syntax. This allows opening different homepages at different times or dates."
			)
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.useMoment)
				.onChange(value => {
					this.plugin.settings.useMoment = value;
					this.plugin.saveSettings();
					this.display();
				})
			);

		if (this.plugin.workspacePlugin?.enabled) {
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
					this.plugin.setIcon(value);
				})
			);

		ribbonSetting.settingEl.setAttribute("style", "padding-top: 70px; border-top: none !important");

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
			
		let manualModeSetting = new Setting(this.containerEl)
			.setName("Manual opening method")
			.setDesc("Determine how existing notes are affected when opening with commands or the ribbon button.")
			.addDropdown(async dropdown => {
				for (let key of Object.values(Mode)) {
					dropdown.addOption(key, key);
				}
				dropdown.setValue(this.settings.manualOpenMode);
				dropdown.onChange(async option => {
					this.settings.manualOpenMode = option;
					await this.plugin.saveSettings();
				});
			});

		if (workspacesMode) {
			[viewSetting, modeSetting, manualModeSetting].forEach(disableSetting);
		}

		if (getDataviewPlugin(this.plugin.app)) {
			let refreshSetting = new Setting(this.containerEl)
				.setName("Refresh Dataview")
				.setDesc("Always attempt to reload Dataview views when opening the homepage.")
				.addToggle(toggle => toggle
					.setValue(this.settings.refreshDataview)
					.onChange(async value => {
						this.settings.refreshDataview = value;
						await this.plugin.saveSettings();
					})
				);

			refreshSetting.descEl.createDiv({
				text: "Requires Dataview auto-refresh to be enabled.", attr: {class: "mod-warning"}
			});
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

	renderSuggestion(file: TFile, el: HTMLElement) {
		el.setText(trimFile(file));
	 }

	selectSuggestion(file: TFile) {
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

	renderSuggestion(workspace: string, el: HTMLElement) {
		el.setText(workspace);
	 }

	selectSuggestion(workspace: string) {
		this.inputEl.value = workspace;
		this.inputEl.trigger("input");
		this.close();
	}
}
