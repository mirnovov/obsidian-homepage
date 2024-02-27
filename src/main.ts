import { Keymap, ObsidianProtocolData, Platform, Plugin, addIcon } from "obsidian";
import { DEFAULT, MOBILE, Homepage, Kind } from "./homepage";
import { hasRequiredPeriodicity } from "./periodic";
import { DEFAULT_SETTINGS, HomepageSettings, HomepageSettingTab } from "./settings";

declare const DEV: boolean;
if (DEV) import("./dev");

const ICON: string = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5"><path d="M10.025 21H6v-7H3v-1.5L12 3l9 9.5V14h-3v7h-4v-7h-3.975v7Z" style="fill:none;stroke:currentColor;stroke-width:2px"/></svg>`

export default class HomepagePlugin extends Plugin {
	homepage: Homepage;
	settings: HomepageSettings;

	internalPlugins: Record<string, any>;
	communityPlugins: Record<string, any>;
	newRelease: boolean = false;
	
	loaded: boolean = false;
	executing: boolean = false;
	
	async onload(): Promise<void> {
		const appStartup = document.body.querySelector(".progress-bar") !== null;

		this.patchReleaseNotes();
		
		this.settings = await this.loadSettings();
		this.internalPlugins = this.app.internalPlugins.plugins;
		this.communityPlugins = this.app.plugins.plugins;
		this.homepage = this.getHomepage();
		
		this.app.workspace.onLayoutReady(async () => {
			const openInitially = (
				this.homepage.data.openOnStartup &&
				appStartup && !(await this.hasUrlParams())
			);
			
			this.patchNewTabPage();
					
			if (openInitially) await this.homepage.open();
			this.loaded = true;
			
			this.unpatchReleaseNotes();
		});

		addIcon("homepage", ICON);
		this.addRibbonIcon(
			"homepage", 
			"Open homepage", 
			e => this.homepage.open(
				e.button == 1 || e.button == 2 || Keymap.isModifier(e, "Mod")
				//right click, middle click, or ctrl/cmd
			)
		)
		.setAttribute("id", "nv-homepage-icon");
				
		this.registerEvent(this.app.workspace.on("layout-change", this.onLayoutChange));
		this.addSettingTab(new HomepageSettingTab(this.app, this));

		this.addCommand({
			id: "open-homepage",
			name: "Open homepage",
			callback: () => this.homepage.open(),
		});
		
		this.addCommand({
			id: "set-to-active-file",
			name: "Set to active file",
			checkCallback: checking => {
				if (checking) return this.homepage.canSetToFile();
				this.homepage.setToActiveFile();
			}
		});

		console.log(
			`Homepage: ${this.homepage.data.value} `+
			`(method: ${this.homepage.data.openMode}, view: ${this.homepage.data.view}, `+
			`kind: ${this.homepage.data.kind})`
		);
	}
	
	async onunload(): Promise<void> {
		this.app.workspace.off("layout-change", this.onLayoutChange)
		this.unpatchNewTabPage();
	}
	
	onLayoutChange = async (): Promise<void> => {
		if (this.homepage.data.revertView) await this.homepage.revertView();
		if (this.homepage.data.openWhenEmpty) await this.homepage.openWhenEmpty();
		if (this.homepage.data.alwaysApply) await this.homepage.apply();
	}
	
	getHomepage(): Homepage {
		if (this.settings.separateMobile && Platform.isMobile) {
			if (!(MOBILE in this.settings.homepages)) {
				this.settings.homepages[MOBILE] = { ...this.settings.homepages[DEFAULT] };
			}
			
			return new Homepage(MOBILE, this);
		}
		return new Homepage(DEFAULT, this);
	}
	
	async loadSettings(): Promise<HomepageSettings> {
		const settingsData = await this.loadData();
		
		if (!settingsData || settingsData.version !== 2) {
			return Object.assign({}, DEFAULT_SETTINGS, settingsData);
		}
		else {
			//Upgrade settings from v2.x
			const settings: HomepageSettings = {
				version: 3,
				homepages: {},
				separateMobile: false
			}
			
			const data = settingsData;
			
			if (settingsData.workspaceEnabled) {
				data.value = data.workspace;
				data.kind = Kind.Workspace;
			}
			else if (settingsData.useMoment) {
				data.value = data.momentFormat;
				data.kind = Kind.MomentDate;
			}
			else {
				data.value = data.defaultNote;
				data.kind = Kind.File;
			}
			
			data.commands = [];
			
			delete data.workspace;
			delete data.momentFormat;
			delete data.defaultNote;
			delete data.useMoment;
			delete data.workspaceEnabled;
			settings.homepages[DEFAULT] = data;
			
			return settings;
		}
	}
	
	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
	
	async hasUrlParams(): Promise<boolean> {
		let action: string, params: Array<string>;
		
		if (Platform.isMobile) {
			const launchUrl = await window.Capacitor.Plugins.App.getLaunchUrl();
			if (!launchUrl) return false;
			
			const url = new URL(launchUrl.url);
			params = Array.from(url.searchParams.keys());
			action = url.hostname;
		}
		else if (window.OBS_ACT) {
			params = Object.keys(window.OBS_ACT);
			action = window.OBS_ACT.action
		}
		else return false;
		
		return (
			["open", "advanced-uri"].includes(action) &&
			["file", "filepath", "workspace"].some(e => params.includes(e))
		)
	}

	hasRequiredPlugin(kind: Kind): boolean {
		switch (kind) {
			case Kind.Workspace:
				return this.internalPlugins["workspaces"]?.enabled;
			case Kind.Graph:
				return this.internalPlugins["graph"]?.enabled;
			case Kind.DailyNote:
			case Kind.WeeklyNote:
			case Kind.MonthlyNote:
			case Kind.YearlyNote:
				return hasRequiredPeriodicity(kind, this);
			default:
				return true;
		}
	}
	
	patchNewTabPage(): void {
		const ntp = this.communityPlugins["new-tab-default-page"];
		if (!ntp) return;
		
		ntp.nvOrig_checkForNewTab = ntp.checkForNewTab;
		ntp.checkForNewTab = async (e: any) => {
			if (this && this.executing) { return; }
			return await ntp.nvOrig_checkForNewTab(e);
		}; 
	}
	
	unpatchNewTabPage(): void {
		const ntp = this.communityPlugins["new-tab-default-page"];
		if (!ntp) return;
		
		ntp.checkForNewTab = ntp._checkForNewTab;
	}
	
	patchReleaseNotes(): void {
		this.app.nvOrig_showReleaseNotes = this.app.showReleaseNotes;
		this.app.showReleaseNotes = () => this.newRelease = true;
	}
	
	unpatchReleaseNotes(): void {
		if (this.newRelease && !this.homepage.data.hideReleaseNotes) {
			this.app.nvOrig_showReleaseNotes();
		}
		
		this.app.showReleaseNotes = this.app.nvOrig_showReleaseNotes;
	}
}
