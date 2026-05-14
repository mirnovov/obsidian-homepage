import { Notice, Keymap, Platform, Plugin, WorkspaceLeaf } from "obsidian";
import { DEFAULT, MOBILE, Homepage, Kind, Period } from "./homepage";
import { hasRequiredPeriodicity, LEGACY_MOMENT_KIND } from "./periodic";
import { DEFAULT_SETTINGS, HomepageSettings, HomepageSettingTab } from "./settings";
import { tr } from "./locale";

declare const DEV: boolean;
if (DEV) void import("./dev");

export default class HomepagePlugin extends Plugin {
	homepage: Homepage;
	settings: HomepageSettings;

	internalPlugins: typeof this.app.internalPlugins.plugins;
	communityPlugins: typeof this.app.plugins.plugins;
	newRelease: boolean = false;
	
	loaded: boolean = false;
	executing: boolean = false;
	
	interstitial: HTMLElement;
	
	async onload(): Promise<void> {
		this.patchReleaseNotes();
		this.patchOpeningBehaviour();
		
		this.settings = await this.loadSettings();
		this.internalPlugins = this.app.internalPlugins.plugins;
		this.communityPlugins = this.app.plugins.plugins;
		this.homepage = this.getHomepage();

		this.addRibbonIcon(
			"house", 
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
			name: tr("openHomepage"),
			callback: () => this.homepage.open(),
		});
		
		this.addCommand({
			id: "set-to-active-file",
			name: tr("setToActiveFile"),
			checkCallback: checking => {
				if (checking) return this.homepage.canSetToFile();
				void this.homepage.setToActiveFile();
			}
		});
		
		this.registerCliHandler(
			"homepage",
			tr("cliOpenHomepageDesc"),
			null,
			async () => {
				await this.homepage.open();
				return tr("cliOpenHomepageResult");
			}
		);
		
		this.registerCliHandler(
			"homepage:read",
			tr("cliReadHomepageDesc"),
			null,
			async () => {
				const result = await this.homepage.read();
				return result !== undefined ? result : tr("cliReadHomepageIllegible");
			}
		);
		
		if (DEV) window.homepage = this;
	}
	
	onunload(): void {
		this.app.workspace.off("layout-change", this.onLayoutChange)
		this.unpatchNewTabPage();
		this.unpatchOpeningBehaviour();
		
		if (DEV) delete window.homepage;
	}
	
	onLayoutChange = async (): Promise<void> => {
		if (this.homepage.data.revertView) await this.homepage.revertView();
		if (this.homepage.data.openWhenEmpty) await this.homepage.openWhenEmpty();
		if (this.homepage.data.alwaysApply) await this.homepage.apply();
	}
	
	getHomepage(): Homepage {
		if (this.settings.separateMobile && Platform.isMobile) {
			if (!(MOBILE in this.settings.homepages)) {
				this.settings.homepages[MOBILE] = { ...this.settings.homepages?.[DEFAULT] };
				this.settings.homepages[MOBILE].commands = [ ...this.settings.homepages?.[DEFAULT]?.commands || [] ];
			}
			
			return new Homepage(MOBILE, this);
		}
		return new Homepage(DEFAULT, this);
	}
	
	async loadSettings(): Promise<HomepageSettings> {
		const settingsData: HomepageSettings = await this.loadData();
		
		if (settingsData?.version !== 4) {
			if (!settingsData) return Object.assign({}, DEFAULT_SETTINGS);
			
			return this.upgradeSettings(settingsData as HomepageLegacySettings);
		}
		
		return settingsData;
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
			case Kind.Journal:
				return "journals" in this.communityPlugins;
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
		ntp.checkForNewTab = async (e: WeakSet<WorkspaceLeaf>) => {
			if (this && this.executing) { return; }
			return await ntp.nvOrig_checkForNewTab(e);
		}; 
	}
	
	unpatchNewTabPage(): void {
		const ntp = this.communityPlugins["new-tab-default-page"];
		if (!ntp) return;
		
		ntp.checkForNewTab = ntp.nvOrig_checkForNewTab;
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
	
	patchOpeningBehaviour(): void {
		this.app.nvOrig_runOpeningBehavior = this.app.runOpeningBehavior;
		this.app.runOpeningBehavior = async (path: string) => {
			const openInitially = (
				this.homepage.data.openOnStartup && !(await this.hasUrlParams())
			);
			
			this.patchNewTabPage();
					
			if (openInitially) await this.homepage.open();
			else void this.app.nvOrig_runOpeningBehavior(path);
			
			this.loaded = true;
			
			this.unpatchReleaseNotes();
		};
	}
	
	unpatchOpeningBehaviour(): void {
		this.app.runOpeningBehavior = this.app.nvOrig_runOpeningBehavior;
	}
	
	upgradeSettings(data: HomepageLegacySettings): HomepageSettings {
		if (data.version == 3) {
			const settings = data as HomepageSettings;
			let hasMoment = false;
			
			for (const homepage of Object.values(settings.homepages)) {
				homepage.commands = (homepage.commands as unknown as string[]).map(id => { 
					return { id: id, period: Period.Both }
				});
				
				if (homepage.kind == LEGACY_MOMENT_KIND) {
					hasMoment = true;
					homepage.kind = Kind.DailyNote;
				}
			}
			
			if (hasMoment) new Notice(tr("momentUpgradeNotice"));
			settings.version = 4;
			
			void this.saveData(settings);
			return settings;
		}

		const settings: HomepageSettings = Object.assign({}, DEFAULT_SETTINGS);
		
		if (data.workspaceEnabled) {
			data.value = data.workspace || "";
			data.kind = Kind.Workspace;
		}
		else if (data.momentFormat) {
			data.kind = Kind.DailyNote;	
			new Notice(tr("momentUpgradeNotice"));
		}
		else {
			data.value = data.defaultNote || "Home";
			data.kind = Kind.File;
		}
		
		data.commands = [];
		
		delete data.workspace;
		delete data.momentFormat;
		delete data.defaultNote;
		delete data.useMoment;
		delete data.workspaceEnabled;
		settings.homepages[DEFAULT] = data;
		
		void this.saveData(settings);
		return settings;
	}
}
