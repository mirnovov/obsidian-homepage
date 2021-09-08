import { App, PluginSettingTab, Setting } from "obsidian";
import Homepage from "./main";

export enum Mode {
	ReplaceAll = "Replace all open notes",
	ReplaceLast = "Replace last note",
	Retain = "Keep open notes"
}

export interface HomepageSettings {
	defaultNote: string,
	workspaceEnabled: boolean,
	hasRibbonIcon: boolean,
	openMode: string
}

export const DEFAULT: HomepageSettings = {
	defaultNote: "Home",
	workspaceEnabled: false,
	hasRibbonIcon: true,
	openMode: Mode.ReplaceAll
}

export class HomepageSettingTab extends PluginSettingTab {
	plugin: Homepage;
	settings: HomepageSettings;

	constructor(app: App, plugin: Homepage) {
		super(app, plugin);
		this.plugin = plugin;
		this.settings = plugin.settings;
	}

	display(): void {
		let {containerEl} = this;
		containerEl.empty();
		
		new Setting(containerEl)
			.setName("Open on startup")
			.setDesc(
				this.plugin.workspacesMode() ?
				"The name of the workspace to open on startup." :
				"The name of the note to open on startup. If it doesn't exist, a new note will be created."
			)
			.addText(text => text
				.setPlaceholder("Home")
				.setValue(DEFAULT.defaultNote == this.settings.defaultNote ? "" : this.settings.defaultNote)
				.onChange(async (value) => {
					this.settings.defaultNote = value.replace(/\\+/g, "/") || DEFAULT.defaultNote;
					await this.plugin.saveSettings();
				}
			)
		);
		
		if(this.plugin.workspacePlugin?.enabled) {
			new Setting(containerEl)
				.setName("Use workspaces")
				.setDesc("Open a workspace, instead of a note, as the homepage.")
				.addToggle(toggle => toggle
					.setValue(this.settings.workspaceEnabled)
					.onChange(async value => {
						this.settings.workspaceEnabled = value;
						await this.plugin.saveSettings();
						this.display(); //update open on startup's text
					}
				)
			);
		}
		
		let ribbonSetting = new Setting(containerEl)
			.setName("Display ribbon icon")
			.setDesc("Show a little house on the ribbon, allowing you to quickly access the homepage.")
			.addToggle(toggle => toggle
				.setValue(this.settings.hasRibbonIcon)
				.onChange(async value => {
					this.settings.hasRibbonIcon = value;
					await this.plugin.saveSettings();
				}
			)
		);
		ribbonSetting.descEl.createDiv({ text: "Takes effect on startup.", attr: {class: "mod-warning"}});
		
		
		if(!this.plugin.workspacesMode()) {
			new Setting(containerEl)
				.setName("Opening mode")
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
				}
			);
		}
	}
}
