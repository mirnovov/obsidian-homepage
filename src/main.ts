import { Platform, Plugin, addIcon } from "obsidian";
import { DEFAULT_SETTINGS, HomepageSettings, HomepageSettingTab } from "./settings";
import { DEFAULT, MOBILE, Homepage, Kind } from "./homepage";
import { getNewTabPagePlugin, getWorkspacePlugin } from "./utils";

const ICON: string = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5"><path d="M10.025 21H6v-7H3v-1.5L12 3l9 9.5V14h-3v7h-4v-7h-3.975v7Z" style="fill:none;stroke:currentColor;stroke-width:2px"/></svg>`

export default class HomepagePlugin extends Plugin {
	settings: HomepageSettings;
	workspacePlugin: any;
	
	loaded: boolean = false;
	executing: boolean = false;
	
	homepage: Homepage;

	async onload(): Promise<void> {
		let activeInitially = document.body.querySelector(".progress-bar") !== null;
		
		this.settings = await this.loadSettings();
		this.homepage = this.getHomepage();
		this.workspacePlugin = getWorkspacePlugin(this.app);

		this.app.workspace.onLayoutReady(async () => {
			let ntp = getNewTabPagePlugin(this.app);

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
		this.setIcon(this.homepage.data.hasRibbonIcon);
		this.homepage.setReversion(this.homepage.data.revertView);
		this.addSettingTab(new HomepageSettingTab(this.app, this));

		this.addCommand({
			id: "open-homepage",
			name: "Open homepage",
			callback: () => this.homepage.open(),
		});

		console.log(
			`Homepage: ${this.homepage.computeValue()} `+
			`(method: ${this.homepage.data.openMode}, view: ${this.homepage.data.view}, `+
			`kind: ${this.homepage.data.kind})`
		);
	}
	
	async onunload(): Promise<void> {
		let ntp = getNewTabPagePlugin(this.app);
		if (!ntp) return;
		ntp.checkForNewTab = ntp._checkForNewTab;
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
		let settingsData: any = await this.loadData();
		
		if (settingsData.version == 3) {
			return Object.assign({}, DEFAULT_SETTINGS, settingsData);
		}
		else {
			let settings: HomepageSettings = {
				version: 3,
				homepages: {},
				separateMobile: false
			}
			
			let data = settingsData;
			
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
			
			delete data.workspace;
			delete data.momentFormat;
			delete data.defaultNote;
			delete data.useMoment;
			delete data.workspaceEnabled;
			settings.homepages[DEFAULT] = data;
			
			console.log(settings);
			return settings;
		}
	}
	
	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	setIcon(value: boolean): void {
		if (value) {
			this.addRibbonIcon("homepage", "Open homepage", () => this.homepage.open())
				.setAttribute("id", "nv-homepage-icon");
		}
		else {
			document.getElementById("nv-homepage-icon")?.remove();
		}
	}
}
