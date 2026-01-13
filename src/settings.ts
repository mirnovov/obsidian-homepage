import { App, ButtonComponent, Notice, Platform, PluginSettingTab, Setting, SettingGroup, normalizePath } from "obsidian";
import HomepagePlugin from "./main";
import { UNCHANGEABLE, HomepageData, Kind, Mode, View } from "./homepage";
import { PERIODIC_KINDS } from "./periodic";
import { SUGGESTORS, CommandBox } from "./ui";
import { tr } from "./locale";

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
			name: tr("copyDebugInfo"),
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
				.setName(tr("homepageSettingTitle"))
				.addDropdown(async dropdown => {
					for (const key of Object.values(Kind)) {
						if (!this.plugin.hasRequiredPlugin(key)) {
							if (key == this.plugin.homepage.data.kind) pluginDisabled = true;
							else {
								dropdown.selectEl.createEl(
									"option", { text: tr(key), attr: { disabled: true } }
								);
								continue;
							}
						}
						
						dropdown.addOption(key, tr(key));
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
					"text": tr(kind + "Desc"),
					"attr": { "id": "nv-desc" }
				})
		
				if (pluginDisabled) {
					descContainer.createDiv({
						text: tr("pluginUnavailableSettings"), 
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
				"openOnStartup",
				(_) => this.display()
			)
			.addToggle("openWhenEmpty")
			.addToggle("alwaysApply")
			.addSetting(setting => {
				setting
				.setName(tr("separateMobile"))
					.setDesc(tr("separateMobileDesc"))
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
					const mobileInfo = document.createElement("div");
				
					setting.setClass("nv-mobile-setting");			
					mobileInfo.className = "mod-warning nv-mobile-info";
					mobileInfo.innerHTML = tr(
						Platform.isMobile ? "separateMobileWarnMobile" : "separateMobileWarnDesktop"
					);
					
					setting.settingEl.append(mobileInfo);
				}
			});
				
		primaryGroup.elements.openOnStartup.descEl.createDiv({
			text: tr("openOnStartupWarn"), 
			attr: {class: "mod-warning"}
		});
		
		this.commandBox = new CommandBox(this, new HomepageSettingGroup(this, "commandsGroup"));
		
		const vaultGroup = new HomepageSettingGroup(this, "vaultGroup")
			.addDropdown("openMode", Mode)
			.addDropdown("manualOpenMode", Mode)
			.addToggle("pin")
			.addToggle("hideReleaseNotes")
			.addToggle("autoCreate")
		
		vaultGroup.elements.autoCreate.descEl.createDiv({ text: tr("autoCreateWarn"), cls: "mod-warning" });
		
		const openingGroup = new HomepageSettingGroup(this, "openingGroup")
			.addDropdown("view", View)
			.addToggle("revertView")
			.addToggle("autoScroll");
		
		if ("dataview" in this.plugin.communityPlugins) {
			openingGroup.addToggle("refreshDataview");
			
			openingGroup.elements.refreshDataview.descEl.createDiv({
				text: tr("refreshDataviewWarn"), attr: {class: "mod-warning"}
			});
		}
		
		if (!Platform.isMobile) {	
			new ButtonComponent(this.containerEl)
				.setButtonText(tr("copyDebugInfo"))
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
		new Notice(tr("copyDebugInfoNotice"));
	}
}

class HomepageSettingGroup extends SettingGroup {
	elements: Record<string, Setting> = {};
	plugin: HomepagePlugin;
	settings: HomepageSettings;
	
	constructor(tab: HomepageSettingTab, name?: string) {
		super(tab.containerEl);
		if (name) this.setHeading(tr(name));
		
		this.plugin = tab.plugin;
		this.settings = tab.settings;
	}
	
	addDropdown(key: HomepageKey<string>, source: object, callback?: Callback<string>): HomepageSettingGroup {
		this.addSetting(setting => {
			setting
			.setName(tr(key))
			.setDesc(tr(key + "Desc"))
			.addDropdown(async dropdown => {
				for (const key of Object.values(source)) {
					dropdown.addOption(key, tr(key));
				}
				dropdown.setValue(this.plugin.homepage.data[key]);
				dropdown.onChange(async option => {
					this.plugin.homepage.data[key] = option;
					await this.plugin.homepage.save();
					if (callback) callback(option);
				});
			});
			
			this.elements[key] = setting;
		});
		
		return this;
	}
	
	addToggle(key: HomepageKey<boolean>, callback?: Callback<boolean>): HomepageSettingGroup {
		this.addSetting(setting => {
			setting
			.setName(tr(key))
			.setDesc(tr(key + "Desc"))
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
