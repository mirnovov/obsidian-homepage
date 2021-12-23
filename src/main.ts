import { MarkdownView, Notice, Platform, Plugin, WorkspaceLeaf, addIcon } from "obsidian";
import { DEFAULT, Mode, View, HomepageSettings, HomepageSettingTab  } from "./settings";
import { getWorkspacePlugin, trimFile, upgradeSettings } from "./utils";

const ICON: string = `<svg fill="currentColor" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M12.484 3.1 9.106.075.276 7.769h2.112v10.253h4.189v.006h4.827v-.006h3.954V7.769h2.339l-2.339-2.095v-4.48l-2.874.04V3.1zM7.577 17.028h2.9v-3.439h-2.9v3.439zm6.781-9.259h-3.671v3.24H7.313v-3.24H3.388v9.253h3.189v-4.433h4.9v4.433h2.881V7.769zm-4.671.222v2.018H8.313V7.991h1.374zM2.946 6.769h12.136l-2.598-2.326-3.387-3.034-6.151 5.36zm11.412-1.99-.874-.783V2.22l.874-.012v2.571z"/></svg>`

export default class Homepage extends Plugin {
	settings: HomepageSettings;
	workspacePlugin: any;

	async onload() {
		this.settings = Object.assign({}, DEFAULT, await this.loadData());
		this.workspacePlugin = getWorkspacePlugin(this.app);
		
		this.addSettingTab(new HomepageSettingTab(this.app, this));
		
		if (this.settings.version < 2) {
			await upgradeSettings(this);
		}
		
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
			`Homepage: ${this.settings.defaultNote} `+ 
			`(method: ${this.settings.openMode}, view: ${this.settings.view}, `+
			`workspaces: ${this.settings.workspaceEnabled})`
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
	
	openHomepage = async (): Promise<void> => {
		if(this.workspacesMode()) {
			if(!(this.settings.workspace in this.workspacePlugin?.instance.workspaces)) {
				new Notice(`Cannot find the workspace "${this.settings.workspace}" to use as the homepage.`);
				return;
			}
			
			this.workspacePlugin.instance.loadWorkspace(this.settings.workspace);
			return;
		}
		else if (this.settings.openMode != Mode.ReplaceAll) {
			const alreadyOpened = this.getOpenedHomepage();
			
			if (alreadyOpened !== undefined) {
				this.app.workspace.setActiveLeaf(alreadyOpened);
				await this.setHomepageMode();
				return;
			}
		}
		else {
			this.app.workspace.detachLeavesOfType("markdown");
		}
		
		await this.app.workspace.openLinkText(
			this.settings.defaultNote, "", this.settings.openMode == Mode.Retain, { active: true }
		);
		
		await this.setHomepageMode();
	}
	
	getOpenedHomepage(): WorkspaceLeaf {
		return this.app.workspace.getLeavesOfType("markdown").find(
			leaf => trimFile((leaf.view as any).file) == this.settings.defaultNote
		);		
	}
	
	async setHomepageMode() {
		const leaf = this.app.workspace.activeLeaf;
		if(this.settings.openMode == View.Default || !(leaf.view instanceof MarkdownView)) return;
		
		const state = leaf.view.getState();
		
		switch(this.settings.view) {
			case View.LivePreview:
			case View.Source:
				state.mode = "source";
				state.source = this.settings.view != View.LivePreview;
				break;
			case View.Reading:
				state.mode = "source";
				break;
		}
		
		await leaf.setViewState({type: "markdown", state: state});
	}
	
	workspacesMode(): boolean {
		return this.workspacePlugin?.enabled && this.settings.workspaceEnabled && !Platform.isMobile;
	}
}

