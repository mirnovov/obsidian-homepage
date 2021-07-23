import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

interface HomepageSettings {
	defaultNote: string;
}

const DEFAULT_SETTINGS: HomepageSettings = {
	defaultNote: "Home"
}

export default class Homepage extends Plugin {
	settings: HomepageSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new HomepageSettingTab(this.app, this));
		
		this.addCommand({
			id: "open-homepage",
			name: "Open Homepage",
			callback: this.openHomepage,
		});
		
		if(this.app.workspace.activeLeaf == null) {
			//only do on startup, not plugin activation
			this.app.workspace.onLayoutReady(this.openHomepage);
		}
	}
	
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
	
	openHomepage = async (): Promise<void> => {
		await this.app.workspace.openLinkText(this.settings.defaultNote, "", false, { active: true });
	};
}

class HomepageSettingTab extends PluginSettingTab {
	plugin: Homepage;

	constructor(app: App, plugin: Homepage) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;
		let currentValue = this.plugin.settings.defaultNote;
		let defaultValue = DEFAULT_SETTINGS.defaultNote;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Open on startup")
			.setDesc(
				"The name of the note to open on startup. If it doesn't exist, a new note will be created."
			)
			.addText(text => text
				.setPlaceholder("Home")
				.setValue(defaultValue == currentValue ? "" : currentValue)
				.onChange(async (value) => {
					this.plugin.settings.defaultNote = value == "" ? defaultValue : value;
					await this.plugin.saveSettings();
				})
			);
	}
}
