import { Notice, Platform, Plugin, MarkdownView, addIcon } from "obsidian";
import { Mode, HomepageSettings, HomepageSettingTab, DEFAULT } from "./settings";
import { trimFile, getWorkspacePlugin } from "./utils";

const ICON: string = `<svg fill="currentColor" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M12.484 3.1 9.106.075.276 7.769h2.112v10.253h4.189v.006h4.827v-.006h3.954V7.769h2.339l-2.339-2.095v-4.48l-2.874.04V3.1zM7.577 17.028h2.9v-3.439h-2.9v3.439zm6.781-9.259h-3.671v3.24H7.313v-3.24H3.388v9.253h3.189v-4.433h4.9v4.433h2.881V7.769zm-4.671.222v2.018H8.313V7.991h1.374zM2.946 6.769h12.136l-2.598-2.326-3.387-3.034-6.151 5.36zm11.412-1.99-.874-.783V2.22l.874-.012v2.571z"/></svg>`

export default class Homepage extends Plugin {
	settings: HomepageSettings;
	workspacePlugin: any;

	async onload() {
		this.workspacePlugin = getWorkspacePlugin(this.app);
		
		await this.loadSettings();
		this.addSettingTab(new HomepageSettingTab(this.app, this));
		
		this.addCommand({
			id: "open-homepage",
			name: "Open homepage",
			callback: this.openHomepage,
		});	
		
		if(this.settings.hasRibbonIcon) {
			addIcon("homepage", ICON);
			this.addRibbonIcon("homepage", "Open homepage", this.openHomepage);
		}
			
		if(this.app.workspace.activeLeaf == null) {
			//only do on startup, not plugin activation
			this.app.workspace.onLayoutReady(this.openHomepage);
		}
		
		console.log(
			`Homepage: ${this.settings.defaultNote}`+ 
			`(mode: ${this.settings.openMode}, workspaces: ${this.settings.workspaceEnabled})`
		);
	}
	
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
	
	openHomepage = async (): Promise<void> => {
		if(this.workspacesMode()) {
			if(!(this.settings.defaultNote in this.workspacePlugin?.instance.workspaces)) {
				new Notice(`Cannot find the workspace "${this.settings.defaultNote}" to use as the homepage.`);
				return;
			}
			
			this.workspacePlugin.instance.loadWorkspace(this.settings.defaultNote);
			return;
		}
		else if (this.settings.openMode != Mode.ReplaceAll) {
			//keep any open homepage leaves rather than creating a new one
			const extant = this.app.workspace.getLeavesOfType("markdown").find(
				leaf => trimFile((leaf.view as any).file) == this.settings.defaultNote
			);
			
			if (extant !== undefined) {
				this.app.workspace.setActiveLeaf(extant);
				this.setHomepageMode();
				return
			}
		}
		else {
			this.app.workspace.detachLeavesOfType("markdown");
		}
		
		await this.app.workspace.openLinkText(
			this.settings.defaultNote, "", this.settings.openMode == Mode.Retain, { active: true }
		);
		
		this.setHomepageMode();
	};
	
	setHomepageMode(): void {
		const leaf = this.app.workspace.activeLeaf;
		if(!this.settings.alwaysPreview || !(leaf.view instanceof MarkdownView)) return;
		
		const state = leaf.view.getState();
		state.mode = "preview";
		leaf.setViewState({type: leaf.view.getViewType(), state: state})
	}
	
	workspacesMode(): boolean {
		return this.workspacePlugin?.enabled && this.settings.workspaceEnabled && !Platform.isMobile;
	}
}

