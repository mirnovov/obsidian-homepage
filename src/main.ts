import { MarkdownView, Notice, Platform, Plugin, WorkspaceLeaf, addIcon, moment } from "obsidian";
import { DEFAULT, Mode, View, HomepageSettings, HomepageSettingTab  } from "./settings";
import { getDailynotesAutorun, getNewTabPagePlugin, getWorkspacePlugin, getDataviewPlugin, trimFile, upgradeSettings } from "./utils";

const ICON: string = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5"><path d="M10.025 21H6v-7H3v-1.5L12 3l9 9.5V14h-3v7h-4v-7h-3.975v7Z" style="fill:none;stroke:currentColor;stroke-width:2px"/></svg>`

export default class Homepage extends Plugin {
	settings: HomepageSettings;
	workspacePlugin: any;
	loaded: boolean = false;
	executing: boolean = false;

	async onload(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT, await this.loadData());
		this.workspacePlugin = getWorkspacePlugin(this.app);

		this.addSettingTab(new HomepageSettingTab(this.app, this));

		if (this.settings.version < 2) {
			await upgradeSettings(this);
		}
		
		this.app.workspace.onLayoutReady(async () => {
			let ntp = getNewTabPagePlugin(this.app);

			if (ntp) {
				ntp._checkForNewTab = ntp.checkForNewTab;
				ntp.checkForNewTab = async (e: any) => {
					if (this && this.executing) { return; }
					return await ntp._checkForNewTab(e);
				}; 
			}
			
			await this.openHomepage();
			this.loaded = true;
		});

		addIcon("homepage", ICON);
		this.setIcon(this.settings.hasRibbonIcon);

		this.addCommand({
			id: "open-homepage",
			name: "Open homepage",
			callback: this.openHomepage,
		});

		console.log(
			`Homepage: ${this.getHomepageName()} `+
			`(method: ${this.settings.openMode}, view: ${this.settings.view}, `+
			`workspaces: ${this.settings.workspaceEnabled})`
		);
	}
	
	async onunload(): Promise<void> {
		let ntp = getNewTabPagePlugin(this.app);
		if (!ntp) return;
		ntp.checkForNewTab = ntp._checkForNewTab;
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	setIcon(value: boolean): void {
		if (value) {
			this.addRibbonIcon("homepage", "Open homepage", this.openHomepage)
				.setAttribute("id", "nv-homepage-icon");
		}
		else {
			document.getElementById("nv-homepage-icon")?.remove();
		}
	}

	openHomepage = async (): Promise<void> => {
		this.executing = true;

		if (getDailynotesAutorun(this.app)) {
			new Notice(
				"Daily Notes' 'Open daily note on startup' setting is not compatible" +
				"  with Homepage. Disable one of the conflicting plugins."
			);
			return;
		}

		if (this.workspacesMode()) {
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
				await this.configureHomepage();
				return;
			}
		}
		else {
			this.app.workspace.detachLeavesOfType("markdown");
		}
		
		await this.openHomepageLink();
		
		if (this.app.workspace.activeLeaf.view.getViewType() === "empty") {
			//hack to fix bug with opening link when homepage is already extant beforehand
			await this.openHomepageLink();
		}

		await this.configureHomepage();
	}
	
	async openHomepageLink() {
		await this.app.workspace.openLinkText(
			this.getHomepageName(), "", this.settings.openMode == Mode.Retain, { active: true }
		);
	}

	getHomepageName(): string {
		var homepage = this.settings.defaultNote;

		if (this.settings.useMoment) {
			homepage = moment().format(this.settings.momentFormat);
		}

		return homepage
	}

	getOpenedHomepage(): WorkspaceLeaf {
		return this.app.workspace.getLeavesOfType("markdown").find(
			leaf => trimFile((leaf.view as any).file) == this.getHomepageName()
		);
	}

	async configureHomepage(): Promise<void> {
		this.executing = false;
		
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
				state.mode = "preview";
				break;
		}

		await leaf.setViewState({type: "markdown", state: state});
		if (this.loaded && this.settings.refreshDataview) { getDataviewPlugin(this.app)?.index.touch(); }
	}

	workspacesMode(): boolean {
		return this.workspacePlugin?.enabled && this.settings.workspaceEnabled && !Platform.isMobile;
	}
}

