import { Keymap, Notice, Platform, Plugin, addIcon } from "obsidian";
import { DEFAULT, MOBILE, Homepage, Kind } from "./homepage";
import { hasRequiredPeriodicity } from "./periodic";
import { DEFAULT_SETTINGS, HomepageSettings, HomepageSettingTab } from "./settings";

const ICON: string = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5"><path d="M10.025 21H6v-7H3v-1.5L12 3l9 9.5V14h-3v7h-4v-7h-3.975v7Z" style="fill:none;stroke:currentColor;stroke-width:2px"/></svg>`

export default class HomepagePlugin extends Plugin {
	settings: HomepageSettings;
	internalPlugins: any;
	communityPlugins: any;
	
	loaded: boolean = false;
	executing: boolean = false;
	
	homepage: Homepage;
	
	async onload(): Promise<void> {
		const activeInitially = document.body.querySelector(".progress-bar") !== null;
		
		this.settings = await this.loadSettings();
		this.internalPlugins = (this.app as any).internalPlugins.plugins;
		this.communityPlugins = (this.app as any).plugins.plugins;
		this.homepage = this.getHomepage();
		
		this.app.workspace.onLayoutReady(async () => {
			const ntp = this.communityPlugins["new-tab-default-page"];

			if (ntp) {
				ntp._checkForNewTab = ntp.checkForNewTab;
				ntp.checkForNewTab = async (e: any) => {
					if (this && this.executing) { return; }
					return await ntp._checkForNewTab(e);
				}; 
			}
			
			if (activeInitially && this.homepage.data.openOnStartup) await this.homepage.open();
			this.loaded = true;
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

		console.log(
			`Homepage: ${this.homepage.data.value} `+
			`(method: ${this.homepage.data.openMode}, view: ${this.homepage.data.view}, `+
			`kind: ${this.homepage.data.kind})`
		);
	}
	
	async onunload(): Promise<void> {
		this.app.workspace.off("layout-change", this.onLayoutChange)
		
		const ntp = this.communityPlugins["new-tab-default-page"];
		if (!ntp) return;
		ntp.checkForNewTab = ntp._checkForNewTab;
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
		const settingsData: any = await this.loadData();
		
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
}
