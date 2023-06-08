import { App, ButtonComponent, Notice, Platform, PluginSettingTab, Setting, normalizePath } from "obsidian";
import HomepagePlugin from "./main";
import { DEFAULT, HomepageData, Kind, Mode, View } from "./homepage";
import { PERIODIC_KINDS, getAutorun } from "./periodic";
import { CommandSuggestModal, FileSuggest, WorkspaceSuggest } from "./ui";

type HomepageObject = { [key: string]: HomepageData }

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
			openWhenEmpty: false,
			refreshDataview: false,
			autoCreate: true,
			autoScroll: false,
			pin: false,
			commands: []
		}
	},
	separateMobile: false
}

export const DEFAULT_DATA: HomepageData = DEFAULT_SETTINGS.homepages[DEFAULT];
const UNCHANGEABLE: Kind[] = [Kind.Random, Kind.DailyNote, ...PERIODIC_KINDS];

export class HomepageSettingTab extends PluginSettingTab {
	plugin: HomepagePlugin;
	settings: HomepageSettings;
	
	commandBox: HTMLElement;
	workspaceHidden: HTMLElement[] = [];

	constructor(app: App, plugin: HomepagePlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.settings = plugin.settings;
	}

	sanitiseNote(value: string): string | null {
		if (value === null || value.match(/^\s*$/) !== null) {
			return null;
		}
		return normalizePath(value);
	}
	
	display(): void {
		const hasWorkspaces = this.plugin.homepage.data.kind == Kind.Workspace;
		const autorun = getAutorun(this.plugin);
		let pluginDisabled = false;
		
		const descContainer = document.createElement("article");
		const suggestor = hasWorkspaces ? WorkspaceSuggest : FileSuggest;

		this.containerEl.empty();
		descContainer.id = "nv-desc";
		
		const mainSetting = new Setting(this.containerEl)
			.setName("Homepage")
			.addDropdown(async dropdown => {
				for (const key of Object.values(Kind)) {
					if (!this.plugin.hasRequiredPlugin(key)) {
						if (key == this.plugin.homepage.data.kind) pluginDisabled = true;
						else continue;
					}
					
					let desc = key as string;
					if (key == Kind.MomentDate) desc = "Moment (legacy)";
					
					dropdown.addOption(key, desc);
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
				`<span class="mod-warning">This type is deprecated and will eventually be removed. Use Daily/Weekly/Monthly/Yearly Note instead, which works natively with Daily and Periodic Notes.</span><br>
				Enter a note or canvas to use based on <a href="https://momentjs.com/docs/#/displaying/format/" target="_blank" rel="noopener">Moment date formatting</a>.<small> Surround words in <code>[brackets]</code> to include them unmodified.
				<br> Currently, your specification will produce: </small>`;
				break;
			case Kind.Random:
				descContainer.innerHTML = `A random note or canvas from your Obsidian folder will be selected.`;
				break;
			case Kind.DailyNote:
				descContainer.innerHTML = `Your Daily Note or Periodic Daily Note will be used.`;
				break;
			case Kind.WeeklyNote:
			case Kind.MonthlyNote:
			case Kind.YearlyNote:
				descContainer.innerHTML = `Your Periodic ${this.plugin.homepage.data.kind} will be used.`;
				break;
		}
		
		if (pluginDisabled) {
			descContainer.createDiv({
				text: `The plugin required for this homepage type isn't available.`, 
				attr: {class: "mod-warning"}
			});
		}
		
		if (this.plugin.homepage.data.kind == Kind.MomentDate) {
			const sample = descContainer.lastChild!.createEl("b", {attr: {class: "u-pop"}});
			
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
		
		const startupSetting = this.addToggle(
			"Open on startup", "When launching Obsidian, open the homepage.",
			"openOnStartup",
			(_) => this.display(),
			true
		);
		
		if (autorun) {
			startupSetting.descEl.createDiv({
				text: `This setting has been disabled, as it isn't compatible with Daily Notes' "Open daily note on startup" functionality. To use it, disable the Daily Notes setting.`, 
				attr: {class: "mod-warning"}
			});
			this.disableSetting(startupSetting.settingEl);
		}
		
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
					
		this.addHeading("Commands", true);
		this.containerEl.createDiv({ 
			cls: "nv-command-desc setting-item-description", 
			text: "Select commands that will be executed when opening the homepage." }
		);
		this.commandBox = this.containerEl.createDiv({ cls: "nv-command-box" });
		this.updateCommandBox();
		
		this.addHeading("Vault environment");
		const openingSetting = this.addDropdown(
			"Opening method", "Determine how extant tabs and views are affected on startup.", 
			"openMode",
			Mode
		);
		this.addDropdown(
			"Manual opening method", "Determine how extant tabs and views are affected when opening with commands or the ribbon button.", 
			"manualOpenMode",
			Mode
		);
		const autoCreateSetting = this.addToggle(
			"Auto-create", "If the homepage doesn't exist, create a note with the specified name.", "autoCreate"
		);
		this.addToggle(
			"Pin", "Pin the homepage when opening.", "pin"
		);
		this.addToggle(
			"Open when empty", "When there are no tabs open, open the homepage.", 
			"openWhenEmpty",
			value => this.plugin.homepage.setEmpty(value)
		);
		
		this.addHeading("Opened view");
		this.addDropdown(
			"Homepage view", "Choose what view to open the homepage in.", 
			"view",
			View
		);
		this.addToggle(
			"Revert view on close", "When navigating away from the homepage, restore the default view.", 
			"revertView",
			value => this.plugin.homepage.setReversion(value)
		);
		this.addToggle("Auto-scroll", "When opening the homepage, scroll to the bottom and focus on the last line.", "autoScroll");
		
		if ("dataview" in this.plugin.communityPlugins) {
			this.addToggle(
				"Refresh Dataview", "Always attempt to reload Dataview views when opening the homepage.", "refreshDataview"
			).descEl.createDiv({
				text: "Requires Dataview auto-refresh to be enabled.", attr: {class: "mod-warning"}
			});
		}
		
		if (!Platform.isMobile) {	
			new ButtonComponent(this.containerEl)
				.setButtonText("Copy debug info")
				.setClass("nv-debug-button")
				.onClick(async () => await this.copyDebugInfo());
		}
		
		if (hasWorkspaces) this.workspaceHidden.forEach(this.disableSetting);
		if (!this.plugin.homepage.data.openOnStartup || autorun) this.disableSetting(openingSetting.settingEl);
		if (PERIODIC_KINDS.includes(this.plugin.homepage.data.kind as Kind)) this.disableSetting(autoCreateSetting.settingEl);
	}
	
	disableSetting(setting: Element): void {
		setting.setAttribute("nv-greyed", "");
	}
	
	addHeading(name: string, workspaces: boolean = false): Setting {
		const heading = new Setting(this.containerEl).setHeading().setName(name);
		
		if (!workspaces) this.workspaceHidden.push(heading.settingEl);
		return heading;
	}
	
	addDropdown(name: string, desc: string, setting: string, source: object, callback?: (v: any) => any): Setting {
		const dropdown = new Setting(this.containerEl)
			.setName(name).setDesc(desc)
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
		
		this.workspaceHidden.push(dropdown.settingEl);
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
		
		if (!workspaces) this.workspaceHidden.push(toggle.settingEl);
		return toggle;
	}
	
	updateCommandBox(): void {
		this.commandBox.innerHTML = "";
		
		for (const [index, id] of this.plugin.homepage.data.commands.entries()) {
			const command = (this.app as any).commands.findCommand(id);
			if (!command) continue;
			
			const pill = this.commandBox.createDiv({ cls: "nv-command-pill", text: command.name });
			
			new ButtonComponent(pill)
				.setIcon("trash-2")
				.setClass("clickable-icon")
				.onClick(() => {
					this.plugin.homepage.data.commands.splice(index, 1);
					this.plugin.homepage.save();
					this.updateCommandBox();
				});
		}
		
		new ButtonComponent(this.commandBox)
			.setClass("nv-command-add-button")
			.setButtonText("Add...")
			.onClick(() => {
				const modal = new CommandSuggestModal(this);
				modal.open();
			});
	} 
	
	async copyDebugInfo(): Promise<void> {
		const config = (this.app.vault as any).config;
		const info: any = {
			...this.settings,
			_defaultViewMode: config.defaultViewMode || "default",
			_livePreview: config.livePreview || "default",
			_focusNewTab: config.focusNewTab || "default",
			_plugins: Object.keys(this.plugin.communityPlugins),
			_internalPlugins: Object.values(this.plugin.internalPlugins).flatMap(
				(p: any) => p.enabled ? [p.instance.id] : []
			),
			_obsidianVersion: (window as any).electron.ipcRenderer.sendSync("version")
		};
		
		await navigator.clipboard.writeText(JSON.stringify(info));
		new Notice("Copied homepage debug information to clipboard");
	}
}
