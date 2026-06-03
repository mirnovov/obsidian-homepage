import { App, Notice, Platform, PluginSettingTab, Setting, SettingDefinitionItem, SettingGroupItem, SettingDefinitionControl, TFile } from "obsidian";
import HomepagePlugin from "./main";
import { UNCHANGEABLE, HomepageData, Kind, Mode, View } from "./homepage";
import { PERIODIC_KINDS } from "./periodic";
import { CommandBox, JournalSuggest, Suggestor, WorkspaceSuggest } from "./ui";
import { isSupportedExtension } from "./utils";
import { tr } from "./locale";

type HomepageKey<T> = { [K in keyof HomepageData]: HomepageData[K] extends T ? K : never }[keyof HomepageData];
type HomepageObject = { [key: string]: HomepageData }

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

const DISABLED_KINDS: Partial<Record<HomepageKey<boolean | string>, Kind[]>> = {
	openWhenEmpty: [Kind.Workspace, Kind.None],
	alwaysApply: [Kind.Workspace, Kind.None],
	openMode: [Kind.Workspace, Kind.None],
	manualOpenMode: [Kind.Workspace, Kind.None],
	autoCreate: [Kind.Workspace, Kind.None],
	pin: [Kind.Workspace, Kind.None],
	view: [Kind.Workspace, Kind.None, Kind.Graph],
	revertView: [Kind.Workspace, Kind.None, Kind.Graph],
	autoScroll: [Kind.Workspace, Kind.None, Kind.Graph],
	refreshDataview: [Kind.Workspace, Kind.None, Kind.Graph]
}

export class HomepageSettingTab extends PluginSettingTab {
	icon = "house";
	
	plugin: HomepagePlugin;
	commandBox: CommandBox;

	constructor(app: App, plugin: HomepagePlugin) {
		super(app, plugin);
		this.plugin = plugin;
		
		this.plugin.addCommand({
			id: "copy-debug-info",
			name: tr("copyDebugInfo"),
			callback: async () => await this.copyDebugInfo()
		});
	}

	getControlValue(key: string): unknown {
		return this.plugin.homepage.data[key as keyof HomepageData];
	}
	
	async setControlValue(key: string, value: unknown): Promise<void> {
		(this.plugin.homepage.data as unknown as Record<string, unknown>)[key] = value;
		await this.plugin.homepage.save();
	}
		
	getSettingDefinitions(): SettingDefinitionItem[] {
		let kindControls: SettingGroupItem[] = [];
		
		for (const kind of Object.values(Kind)) {
			if (UNCHANGEABLE.contains(kind)) continue;
			
			let setting: Record<string, unknown> = {
				name: tr(kind),
				desc: tr(kind + "Desc"),
				visible: () => this.plugin.homepage.data.kind as Kind == kind,
			};
						
			switch(kind) {
				case Kind.File:
					setting.control = { 
						type: "file", key: "value", filter: (f: TFile) => isSupportedExtension(this.app, f) 
					}
					break;
				case Kind.Workspace:
					setting.render = (s: Setting) => this.renderSuggestor(s, WorkspaceSuggest);
					break;
				case Kind.RandomFolder:
					setting.control = { type: "folder", key: "value" }
					break;
				case Kind.NewNote:
					setting.control = { type: "text", key: "value" }
					break;
				case Kind.Journal:
					setting.render = (s: Setting) => this.renderSuggestor(s, JournalSuggest);
					break;
			}
			
			kindControls.push(setting as unknown as SettingGroupItem);
		}
		
		return [
			{
				type: "group",
				cls: "nv-primary-settings-group",
				items: [
					{
						name: tr("homepageKind"),
						desc: tr("homepageKindDesc"),
						render: s => this.renderKindDropdown(s)
					},
					...kindControls
				]
			},
			{
				type: "group",
				cls: "nv-settings-group",
				items: [
					{
						name: tr("openOnStartup"),
						desc: tr("openOnStartupDesc"),
						render: s => this.renderOpenOnStartup(s),
					},
					this.createToggle("openWhenEmpty"),
					this.createToggle("alwaysApply"),
					{
						name: tr("separateMobile"),
						desc: tr("separateMobileDesc"),
						render: s => this.renderSeparateMobileToggle(s),
					}
				],
			},
			{
				type: "group",
				cls: "nv-settings-group",
				heading: tr("commandsGroup"),
				items: [
					{
						name: tr("commandsGroup"),
						desc: tr("commandsDesc"),
						render: s => this.renderCommands(s),
					}
				],
			},
			{
				type: "group",
				cls: "nv-settings-group",
				heading: tr("vaultGroup"),
				items: [
					this.createDropdown("openMode", Mode),
					this.createDropdown("manualOpenMode", Mode),
					this.createToggle("pin"),
					this.createToggle("hideReleaseNotes"),
					{
						name: tr("autoCreate"),
						desc: tr("autoCreateDesc"),
						render: s => this.renderAutoCreate(s),
					}			  	
				],
			},
			{
				type: "group",
				cls: "nv-settings-group",
				heading: tr("openingGroup"), 
				items: [
					this.createDropdown("view", View),
					this.createToggle("revertView"),
					this.createToggle("autoScroll"),
					{
						name: tr("refreshDataview"),
						desc: tr("refreshDataviewDesc"),
						visible: () => "dataview" in this.plugin.communityPlugins,
						render: s => this.renderRefreshDataview(s),
					}
				],
			}
		];
	}
	
	createToggle(key: HomepageKey<boolean>): SettingDefinitionControl<string>  {
		return {
			name: tr(key),
			desc: tr(key + "Desc"),
			control: { type: "toggle", key, disabled: () => this.shouldDisable(key) }
		};
	}
	
	createDropdown(key: HomepageKey<string>, source: Record<string, string>): SettingDefinitionControl<string>  {
		return {
			name: tr(key),
			desc: tr(key + "Desc"),
			control: { 
				type: "dropdown",
				options: Object.fromEntries(Object.values(source).map(k => [k, tr(k)])),
				key, 
				disabled: () => this.shouldDisable(key) 
			}
		};
	}
	
	shouldDisable(key: HomepageKey<boolean | string>) {
		if (
			DISABLED_KINDS[key]?.includes(this.plugin.homepage.data.kind as Kind) ||
			(key === "openMode" && !this.plugin.homepage.data.openOnStartup)
		) return true;
				
		return false;
	}
	
	renderKindDropdown(setting: Setting) {
		const kind = this.plugin.homepage.data.kind as Kind;
		let pluginDisabled = false;
		
		setting.controlEl.replaceChildren();
		setting.settingEl.querySelector("#nv-desc")?.remove();
		setting.setErrorMessage(null);
		setting.settingEl.id = "nv-setting-homepage-kind";

		setting.addDropdown(async dropdown => {
			for (const key of Object.values(Kind)) {
				if (!this.plugin.hasRequiredPlugin(key)) {
					if (key == kind) pluginDisabled = true;
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
				if (option as Kind == Kind.Random) this.plugin.homepage.data.value = "";
				
				await this.plugin.homepage.save();
				
				this.refreshDomState();
				this.renderKindDropdown(setting);
			});
		});

		if (UNCHANGEABLE.contains(kind)) {
			setting.settingEl.createEl("article", {
				text: tr(this.plugin.homepage.data.kind as Kind + "Desc"),
				attr: { id: "nv-desc" }
			});
		}
		if (pluginDisabled) setting.setErrorMessage(tr("pluginUnavailableSettings"));
	}
	
	renderSuggestor(setting: Setting, suggestor: Suggestor) {
		setting.addText(text => {
			new suggestor(this.app, text.inputEl);
			
			text.setPlaceholder(DEFAULT_DATA.value)
			text.setValue(this.plugin.homepage.data.value)
			text.onChange(async (value) => {
				this.plugin.homepage.data.value = value || DEFAULT_DATA.value;
				await this.plugin.homepage.save();
			});
		})
	}
	
	renderCommands(setting: Setting) {
		setting.settingEl.addClass("nv-command-setting");
		this.commandBox = new CommandBox(this, setting);
	}
	
	renderOpenOnStartup(setting: Setting) {
		setting.addToggle(toggle => toggle
			.setValue(this.plugin.homepage.data.openOnStartup)
			.onChange(async value => await this.setControlValue("openOnStartup", value))
		);
		
		setting.descEl.createDiv({
			text: tr("openOnStartupWarn"), attr: { class: "mod-warning" }
		});
	}
	
	renderSeparateMobileToggle(setting: Setting) {
		setting.settingEl.querySelector(".mod-warning.nv-mobile-info")?.remove();
		setting.setClass("nv-mobile-setting");			
		
		if (setting.controlEl.children.length < 1) {
			setting.addToggle(toggle => toggle
				.setValue(this.plugin.settings.separateMobile)
				.onChange(async value => {
					this.plugin.settings.separateMobile = value;
					this.plugin.homepage = this.plugin.getHomepage();
					await this.plugin.saveSettings();
					
					this.refreshDomState();
					this.renderSeparateMobileToggle(setting);
				})
			);
		}
		
		if (this.plugin.settings.separateMobile) {
			const mobileInfo = createDiv();
		
			mobileInfo.className = "mod-warning nv-mobile-info";
			mobileInfo.createEl("b", { text: tr("separateMobileWarnPrefix") });
			
			mobileInfo.append(" " + tr(
				Platform.isMobile ? "separateMobileWarnMobile" : "separateMobileWarnDesktop"
			));
			
			setting.settingEl.append(mobileInfo);
		}
	}
	
	renderAutoCreate(setting: Setting) {
		const kind = this.plugin.homepage.data.kind as Kind;

		setting.addToggle(toggle => toggle
			.setValue(this.plugin.homepage.data.autoCreate)
			.onChange(async value => await this.setControlValue("autoCreate", value))
		);
		
		if ([...PERIODIC_KINDS, Kind.Journal, Kind.Workspace, Kind.None].includes(kind)) {
			setting.setDisabled(true);
		}
		
		setting.descEl.createDiv({
			text: tr("autoCreateWarn"), attr: {class: "mod-warning"}
		});
	}	
	
	renderRefreshDataview(setting: Setting) {
		setting.addToggle(toggle => toggle
			.setValue(this.plugin.homepage.data.refreshDataview)
			.onChange(async value => await this.setControlValue("refreshDataview", value))
		);
		
		setting.descEl.createDiv({
			text: tr("refreshDataviewWarn"), attr: {class: "mod-warning"}
		});
	}	
	
	async copyDebugInfo(): Promise<void> {
		const config = this.app.vault.config;
		const info = {
			...this.plugin.settings,
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
