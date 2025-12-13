import { App, ButtonComponent, Notice, Platform, PluginSettingTab, Setting, SettingGroup, normalizePath } from "obsidian";
import HomepagePlugin from "./main";
import { UNCHANGEABLE, HomepageData, Kind, Mode, View } from "./homepage";
import { PERIODIC_KINDS } from "./periodic";
import { SUGGESTORS, CommandBox } from "./ui";

type HomepageKey<T> = { [K in keyof HomepageData]: HomepageData[K] extends T ? K : never }[keyof HomepageData];
type HomepageObject = { [key: string]: HomepageData }
type Callback<T> = (v: T) => void;

export interface HomepageSettings {
	version: number,
	homepages: HomepageObject,
	separateMobile: boolean
}

export const DEFAULT_SETTINGS: HomepageSettings = {
	version: 4,
	homepages: {},
	separateMobile: false
}

export const DEFAULT_DATA: HomepageData = {
	value: "Home",
	kind: Kind.File,
	openOnStartup: true,
	openMode: Mode.ReplaceAll,
	manualOpenMode: Mode.Retain,
	view: View.Default,
	revertView: true,
	openWhenEmpty: false,
	refreshDataview: false,
	autoCreate: false,
	autoScroll: false,
	pin: false,
	commands: [],
	alwaysApply: false,
	hideReleaseNotes: false
};

const DESCRIPTIONS = {
	[Kind.File]: "Enter a note, base, or canvas to use.",
	[Kind.Workspace]: "Enter an Obsidian workspace to use.",
	[Kind.Graph]: "Your graph view will be used.",
	[Kind.None]: "Nothing will occur by default. Any commands added will still take effect.",
	[Kind.Random]: "A random note, base, or canvas from your Obsidian folder will be selected.",
	[Kind.RandomFolder]: "Enter a folder. A random note, base, or canvas from it will be selected.",
	[Kind.Journal]: "Enter a Journal to use.",
	[Kind.DailyNote]: "Your Daily Note or Periodic Daily Note will be used.",
	[Kind.WeeklyNote]: "Your Periodic Weekly Note will be used.",
	[Kind.MonthlyNote]: "Your Periodic Monthly Note will be used.",
	[Kind.YearlyNote]: "Your Periodic Yearly Note will be used."
}

export class HomepageSettingTab extends PluginSettingTab {
	icon = "homepage";
	
	plugin: HomepagePlugin;
	settings: HomepageSettings;
	commandBox: CommandBox;

	constructor(app: App, plugin: HomepagePlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.settings = plugin.settings;
		
		this.plugin.addCommand({
			id: "copy-debug-info",
			name: "Copy debug info",
			callback: async () => await this.copyDebugInfo()
		});
	}

	sanitiseNote(value: string): string | null {
		if (value === null || value.match(/^\s*$/) !== null) {
			return null;
		}
		return normalizePath(value);
	}
	
	display(): void {
		const kind = this.plugin.homepage.data.kind as Kind;
		let pluginDisabled = false;
		let suggestor = SUGGESTORS[kind];

		this.containerEl.empty();
		
		const mainGroup = new HomepageSettingGroup(this)
			.addSetting(setting => {
				setting
				.setName("Homepage")
				.addDropdown(async dropdown => {
					for (const key of Object.values(Kind)) {
						if (!this.plugin.hasRequiredPlugin(key)) {
							if (key == this.plugin.homepage.data.kind) pluginDisabled = true;
							else {
								dropdown.selectEl.createEl(
									"option", { text: key, attr: { disabled: true } }
								);
								continue;
							}
						}
						
						dropdown.addOption(key, key);
					}
					dropdown.setValue(this.plugin.homepage.data.kind);
					dropdown.onChange(async option => {
						this.plugin.homepage.data.kind = option;
						if (option == Kind.Random) this.plugin.homepage.data.value = "";
						
						await this.plugin.homepage.save();
						this.display();
					});
				});
			
				setting.settingEl.id = "nv-main-setting";
				
				const descContainer = setting.settingEl.createEl("article", {
					"text": DESCRIPTIONS[kind],
					"attr": { "id": "nv-desc" }
				})
		
				if (pluginDisabled) {
					descContainer.createDiv({
						text: `The plugin required for this homepage type isn't available.`, 
						cls: "mod-warning"
					});
				}
				
				if (UNCHANGEABLE.includes(kind)) {
					setting.addText(text => {
						text.setDisabled(true);
					});
				}
				else {
					setting.addText(text => {
						new suggestor!(this.app, text.inputEl);
						text.setPlaceholder(DEFAULT_DATA.value)
							text.setValue(DEFAULT_DATA.value == this.plugin.homepage.data.value ? "" : this.plugin.homepage.data.value)
							text.onChange(async (value) => {
								this.plugin.homepage.data.value = this.sanitiseNote(value) || DEFAULT_DATA.value;
								await this.plugin.homepage.save();
							});
					});
				}
			});
		
		const primaryGroup = new HomepageSettingGroup(this)
			.addToggle(
				"Open on startup", "When launching Obsidian, open the homepage.",
				"openOnStartup",
				(_) => this.display()
			)
			.addToggle(
				"Open when empty", "When there are no tabs open, open the homepage.", 
				"openWhenEmpty"
			)
			.addToggle(
				"Use when opening normally", "Use homepage settings when opening it normally, such as from a link or the file browser.",
				"alwaysApply"
			)
			.addSetting(setting => {
				setting
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
				
				if (this.plugin.settings.separateMobile) {
					const keyword = Platform.isMobile ? "desktop" : "mobile";
					const mobileInfo = document.createElement("div");
				
					setting.setClass("nv-mobile-setting");			
					mobileInfo.className = "mod-warning nv-mobile-info";
					mobileInfo.innerHTML = `<b>Mobile settings are stored separately.</b> Therefore, changes to other settings will not affect 
					${keyword} devices. To edit ${keyword} settings, use a ${keyword} device.`
					
					setting.settingEl.append(mobileInfo);
				}
			});
				
		primaryGroup.elements.openOnStartup.descEl.createDiv({
			text: `This will override the built-in "Default file to open" setting.`, 
			attr: {class: "mod-warning"}
		});
		
		this.commandBox = new CommandBox(this, new HomepageSettingGroup(this, "Commands"));
		
		const vaultGroup = new HomepageSettingGroup(this, "Vault environment")
			.addDropdown(
				"Opening method", "Determine how extant tabs and views are affected on startup.", 
				"openMode",
				Mode
			)
			.addDropdown(
				"Manual opening method", "Determine how extant tabs and views are affected when opening with commands or the ribbon button.", 
				"manualOpenMode",
				Mode
			)
			.addToggle("Pin", "Pin the homepage when opening.", "pin")
			.addToggle("Hide release notes", "Never display release notes when Obsidian updates.", "hideReleaseNotes")
			.addToggle("Auto-create", "When the homepage doesn't exist, create a note with its name.", "autoCreate")
		
		vaultGroup.elements.autoCreate.descEl.createDiv({
			text: `If this vault is synced using unofficial services, this may lead to content being overwritten.`, 
			cls: "mod-warning"
		});
		
		const openingGroup = new HomepageSettingGroup(this, "Opened view")
			.addDropdown(
				"Homepage view", "Choose what view to open the homepage in.", 
				"view",
				View
			)
			.addToggle(
				"Revert view on close", "When navigating away from the homepage, restore the default view.", 
				"revertView"
			)
			.addToggle(
				"Auto-scroll", "When opening the homepage, scroll to the bottom and focus on the last line.", 
				"autoScroll"
			);
		
		if ("dataview" in this.plugin.communityPlugins) {
			openingGroup.addToggle(
				"Refresh Dataview", "Always attempt to reload Dataview views when opening the homepage.", "refreshDataview"
			);
			
			openingGroup.elements.refreshDataview.descEl.createDiv({
				text: "Requires Dataview auto-refresh to be enabled.", attr: {class: "mod-warning"}
			});
		}
		
		if (!Platform.isMobile) {	
			new ButtonComponent(this.containerEl)
				.setButtonText("Copy debug info")
				.setClass("nv-debug-button")
				.onClick(async () => await this.copyDebugInfo());
		}
		
		if ([Kind.Workspace, Kind.None].includes(kind)) {
			primaryGroup.disableSettings("openWhenEmpty", "alwaysApply");
			vaultGroup.disableSettings("openMode", "manualOpenMode", "autoCreate", "pin")
		}
		
		if ([Kind.Workspace, Kind.None, Kind.Graph].includes(kind)) {
			openingGroup.disableAll();
		}
		
		if (!this.plugin.homepage.data.openOnStartup) {
			vaultGroup.disableSettings("openMode");
		}
		
		if (PERIODIC_KINDS.includes(kind as Kind) || kind === Kind.Journal) {
			vaultGroup.disableSettings("autoCreate");
		}
	}
	
	async copyDebugInfo(): Promise<void> {
		const config = this.app.vault.config;
		const info = {
			...this.settings,
			_defaultViewMode: config.defaultViewMode || "default",
			_livePreview: config.livePreview !== undefined ? config.livePreview : "default",
			_focusNewTab: config.focusNewTab !== undefined ? config.focusNewTab : "default",
			_plugins: Object.keys(this.plugin.communityPlugins),
			_internalPlugins: Object.values(this.plugin.internalPlugins).flatMap(
				p => p.enabled ? [p.instance.id] : []
			),
			_obsidianVersion: window.electron?.ipcRenderer.sendSync("version") || "unknown"
		};
		
		await navigator.clipboard.writeText(JSON.stringify(info));
		new Notice("Copied homepage debug information to clipboard");
	}
}

class HomepageSettingGroup extends SettingGroup {
	elements: Record<string, Setting> = {};
	plugin: HomepagePlugin;
	settings: HomepageSettings;
	
	constructor(tab: HomepageSettingTab, name?: string) {
		super(tab.containerEl);
		if (name) this.setHeading(name);
		
		this.plugin = tab.plugin;
		this.settings = tab.settings;
	}
	
	addDropdown(name: string, desc: string, setting: HomepageKey<string>, source: object, callback?: Callback<string>): HomepageSettingGroup {
		this.addSetting(s => {
			s
			.setName(name)
			.setDesc(desc)
			.addDropdown(async dropdown => {
				for (const key of Object.values(source)) {
					dropdown.addOption(key, key);
				}
				dropdown.setValue(this.plugin.homepage.data[setting]);
				dropdown.onChange(async option => {
					this.plugin.homepage.data[setting] = option;
					await this.plugin.homepage.save();
					if (callback) callback(option);
				});
			});
			
			this.elements[setting] = s;
		});
		
		return this;
	}
	
	addToggle(name: string, desc: string, key: HomepageKey<boolean>, callback?: Callback<boolean>): HomepageSettingGroup {
		this.addSetting(setting => {
			setting
			.setName(name).setDesc(desc)
			.addToggle(toggle => toggle
				.setValue(this.plugin.homepage.data[key])
				.onChange(async value => {
					this.plugin.homepage.data[key] = value; 
					await this.plugin.homepage.save();
					if (callback) callback(value);
				})
			);
		
			this.elements[key] = setting;
		});
		
		return this;
	}
	
	disableAll(): void {
		this.disableSettings(...Object.keys(this.elements));
	}
	
	disableSettings(...settings: string[]): void {
		settings.forEach(s => {
			this.elements[s]?.settingEl.setAttribute("nv-greyed", "");
		});
	}
}
