import { App, Notice, Plugin, PluginSettingTab, Setting } from "obsidian";

interface HomepageSettings {
	defaultNote: string,
	workspaceEnabled: boolean,
}

const DEFAULT: HomepageSettings = {
	defaultNote: "Home",
	workspaceEnabled: false,
}

export default class Homepage extends Plugin {
	settings: HomepageSettings;
	workspacePlugin: any;

	async onload() {
		this.workspacePlugin = (<any> this.app)?.internalPlugins?.plugins?.workspaces;
		
		await this.loadSettings();
		this.addSettingTab(new HomepageSettingTab(this.app, this));
		
		this.addCommand({
			id: "open-homepage",
			name: "Open homepage",
			callback: this.openHomepage,
		});		
		if(this.app.workspace.activeLeaf == null) {
			//only do on startup, not plugin activation
			this.app.workspace.onLayoutReady(this.openHomepage);
		}
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
		}
		else {
			await this.app.workspace.openLinkText(this.settings.defaultNote, "", false, { active: true });
		}
	};
	
	workspacesMode(): boolean {
		return this.workspacePlugin?.enabled && this.settings.workspaceEnabled;
	}
}

class HomepageSettingTab extends PluginSettingTab {
	plugin: Homepage;
	settings: HomepageSettings;

	constructor(app: App, plugin: Homepage) {
		super(app, plugin);
		this.plugin = plugin;
		this.settings = plugin.settings;
	}

	display(): void {
		let {containerEl} = this;
		containerEl.empty();
		
		new Setting(containerEl)
			.setName("Open on startup")
			.setDesc(
				this.plugin.workspacesMode() ?
				"The name of the workspace to open on startup." :
				"The name of the note to open on startup. If it doesn't exist, a new note will be created."
			)
			.addText(text => text
				.setPlaceholder("Home")
				.setValue(DEFAULT.defaultNote == this.settings.defaultNote ? "" : this.settings.defaultNote)
				.onChange(async (value) => {
					this.settings.defaultNote = value || DEFAULT.defaultNote;
					await this.plugin.saveSettings();
				}
			)
		);
		
		if(this.plugin.workspacePlugin?.enabled) {
			new Setting(containerEl)
				.setName("Use workspaces")
				.setDesc("Open a workspace, instead of a note, as the homepage.")
				.addToggle(toggle => toggle
					.setValue(this.settings.workspaceEnabled)
					.onChange(async value => {
						this.settings.workspaceEnabled = value;
						await this.plugin.saveSettings();
						this.display(); //update open on startup's text
					}
				)
			);
		}
	}
}
