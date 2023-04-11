import { App, PluginSettingTab, Setting, normalizePath } from "obsidian";
import HomepagePlugin from "./main";
import { DEFAULT, HomepageData, Kind, Mode, View } from "./homepage";
import { FileSuggest, WorkspaceSuggest } from "./suggest";
import { getDailynotesAutorun } from "./utils";

type HomepageObject = { [key: string | symbol]: HomepageData }

export interface HomepageSettings {
	version: number,
	homepages: HomepageObject,
	separateMobile: boolean
}

export const DEFAULT_SETTINGS: HomepageSettings = {
	version: 3,
	homepages: {
		[DEFAULT]: {
			value: "Home",
			kind: Kind.File,
			openOnStartup: true,
			hasRibbonIcon: true,
			openMode: Mode.ReplaceAll,
			manualOpenMode: Mode.Retain,
			view: View.Default,
			revertView: true,
			refreshDataview: false,
			autoCreate: true,
			autoScroll: false,
			pin: false
		}
	},
	separateMobile: false
}

export const DEFAULT_DATA: HomepageData = DEFAULT_SETTINGS.homepages[DEFAULT];

const HIDDEN: string = "nv-workspace-hidden";
const UNCHANGEABLE: Kind[] = [Kind.Random, Kind.DailyNote, Kind.WeeklyNote, Kind.MonthlyNote];

export class HomepageSettingTab extends PluginSettingTab {
	plugin: HomepagePlugin;
	settings: HomepageSettings;

	constructor(app: App, plugin: HomepagePlugin) {
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
		const hasWorkspaces = this.plugin.homepage.data.kind == Kind.Workspace;
		const dailynotesAutorun = getDailynotesAutorun(this.plugin);
		
		const descContainer = document.createElement("article");
		const suggestor = hasWorkspaces ? WorkspaceSuggest : FileSuggest;

		this.containerEl.empty();
		descContainer.id = "nv-desc";
		
		const mainSetting = new Setting(this.containerEl)
			.setName("Homepage")
			.addDropdown(async dropdown => {
				for (let key of Object.values(Kind)) {
					if (!this.plugin.hasRequiredPlugin(key)) continue;
					dropdown.addOption(key, key);
				}
				dropdown.setValue(this.plugin.homepage.data.kind);
				dropdown.onChange(async option => {
					this.plugin.homepage.data.kind = option;
					await this.plugin.homepage.save();
					this.display();
				});
			});
		
		mainSetting.settingEl.id = "nv-main-setting";
		mainSetting.settingEl.append(descContainer);
		
		switch (this.plugin.homepage.data.kind) {
			case Kind.File:
				descContainer.innerHTML = `Enter a note or canvas to use.`;
				break;
			case Kind.Workspace:
				descContainer.innerHTML = `Enter an Obsidian workspace to use.`;
				break;
			case Kind.MomentDate:
				descContainer.innerHTML = 
				`Enter a note or canvas to use based on <a href="https://momentjs.com/docs/#/displaying/format/" target="_blank" rel="noopener">Moment date formatting</a>.<small>This is separate from Daily or Periodic Notes, but can be set so it corresponds to the same files. Surround words in <code style="padding:0">[brackets]</code> to include them unmodified.
				<br> Currently, your specification will produce: </small>`;
				break;
			case Kind.Random:
				descContainer.innerHTML = `A random note or canvas from your Obsidian folder will be selected.`;
				break;
			case Kind.DailyNote:
				descContainer.innerHTML = `Your Daily Note will be used.`;
				break;
		}
		
		if (this.plugin.homepage.data.kind == Kind.MomentDate) {
			const sample = descContainer.lastChild.createEl("b", {attr: {class: "u-pop"}});
			
			mainSetting.addMomentFormat(text => text
				.setDefaultFormat("YYYY-MM-DD")
				.setValue(this.plugin.homepage.data.value)
				.onChange(async value => {
					this.plugin.homepage.data.value = value;
					await this.plugin.homepage.save();
				})
				.setSampleEl(sample)
			);
		} 
		else if (UNCHANGEABLE.includes(this.plugin.homepage.data.kind as Kind)) {
			mainSetting.addText(text => {
				text.setDisabled(true);
			});
		}
		else {
			mainSetting.addText(text => {
				new suggestor(this.app, text.inputEl);
				text.setPlaceholder(DEFAULT_DATA.value)
					text.setValue(DEFAULT_DATA.value == this.plugin.homepage.data.value ? "" : this.plugin.homepage.data.value)
					text.onChange(async (value) => {
						this.plugin.homepage.data.value = this.sanitiseNote(value) || DEFAULT_DATA.value;
						await this.plugin.homepage.save();
					});
			});
		}
		
		let startupSetting = this.addToggle(
			"Open on startup", "When launching Obsidian, open the homepage.",
			"openOnStartup",
			(_) => this.display(),
			true
		);
		
		if (dailynotesAutorun) {
			startupSetting.descEl.createDiv({
				text: `This setting has been disabled, as it isn't compatible with Daily Notes' "Open daily note on startup" functionality. To use it, disable the Daily Notes setting.`, 
				attr: {class: "mod-warning"}
			});
			this.disableSetting(startupSetting.settingEl);
		}
		startupSetting.settingEl.style.cssText += "padding-top: 30px; border-top: none !important";
		
		this.addToggle(
			"Use ribbon icon", "Show a little house on the ribbon, allowing you to quickly access the homepage.",
			"hasRibbonIcon",
			(value) => this.plugin.setIcon(value),
			true
		);
		
		new Setting(this.containerEl)
			.setName("Separate mobile homepage")
			.setDesc("For mobile devices, store the homepage and its settings separately.")
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.separateMobile)
				.onChange(async value => {
					this.plugin.settings.separateMobile = value;
					this.plugin.homepage = this.plugin.getHomepage();
					await this.plugin.saveSettings();
					this.display();
				})
			);

		this.addHeading("Vault environment");
		let openingSetting = this.addDropdown(
			"Opening method", "Determine how extant tabs and panes are affected on startup.", 
			"openMode",
			Mode
		);
		this.addDropdown(
			"Manual opening method", "Determine how extant tabs and panes are affected when opening with commands or the ribbon button.", 
			"manualOpenMode",
			Mode
		);
		this.addToggle("Auto-create", "If the homepage doesn't exist, create a note with the specified name.", "autoCreate");
		this.addToggle("Pin", "Pin the homepage when opening.", "pin");
		
		this.addHeading("Pane");
		this.addDropdown(
			"Homepage view", "Choose what view to open the homepage in.", 
			"view",
			View
		);
		this.addToggle(
			"Revert view on close", "When navigating away from the homepage, restore the default view.", 
			"revertView",
			(value) => this.plugin.homepage.setReversion(value)
		);
		this.addToggle("Auto-scroll", "When opening the homepage, scroll to the bottom and focus on the last line.", "autoScroll");
		
		if ("dataview" in this.plugin.communityPlugins) {
			this.addToggle(
				"Refresh Dataview", "Always attempt to reload Dataview views when opening the homepage.", "refreshDataview"
			).descEl.createDiv({
				text: "Requires Dataview auto-refresh to be enabled.", attr: {class: "mod-warning"}
			});
		}
		
		if (hasWorkspaces) Array.from(document.getElementsByClassName(HIDDEN)).forEach(this.disableSetting);
		if (!this.plugin.homepage.data.openOnStartup || dailynotesAutorun) this.disableSetting(openingSetting.settingEl);
	}
	
	disableSetting(setting: Element): void {
		setting.setAttribute("nv-greyed", "");
	}
	
	addHeading(name: string): Setting {
		const heading = new Setting(this.containerEl).setHeading().setName(name);
		heading.settingEl.addClass(HIDDEN);
		return heading;
	}
	
	addDropdown(name: string, desc: string, setting: string, source: object, callback?: (v: any) => any): Setting {
		const dropdown = new Setting(this.containerEl)
			.setName(name).setDesc(desc)
			.addDropdown(async dropdown => {
				for (let key of Object.values(source)) {
					dropdown.addOption(key, key);
				}
				dropdown.setValue(this.plugin.homepage.data[setting]);
				dropdown.onChange(async option => {
					this.plugin.homepage.data[setting] = option;
					await this.plugin.homepage.save();
					if (callback) callback(option);
				});
			});
		
		dropdown.settingEl.addClass(HIDDEN);
		return dropdown;
	}
	
	addToggle(name: string, desc: string, setting: string, callback?: (v: any) => any, workspaces: boolean = false): Setting {
		const toggle = new Setting(this.containerEl)
			.setName(name).setDesc(desc)
			.addToggle(toggle => toggle
				.setValue(this.plugin.homepage.data[setting])
				.onChange(async value => {
					this.plugin.homepage.data[setting] = value;
					await this.plugin.homepage.save();
					if (callback) callback(value);
				})
			);
		
		if (!workspaces) toggle.settingEl.addClass(HIDDEN);
		return toggle;
	}
}
