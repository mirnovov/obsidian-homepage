import { Kind, Mode, View } from "src/homepage";
import { LEGACY_MOMENT_KIND } from "src/periodic";
import { HomepageSettings, DEFAULT_SETTINGS } from "src/settings";
import { sleep } from "src/utils";
import HomepageTestPlugin from "./harness";

export default class SettingTests {
	async loadEmptySettings(this: HomepageTestPlugin) {
		this.settings = {} as HomepageSettings;
		this.saveSettings();
		this.settings = await this.loadSettings();
		this.homepage = this.getHomepage();
		
		const actual = JSON.stringify(this.settings);
		const expected = JSON.stringify(DEFAULT_SETTINGS);
	
		this.assert(actual == expected);
	}
	
	async upgradeSettings(this: HomepageTestPlugin) {
		this.settings = {
			version: 2,
			defaultNote: "Home",
			useMoment: false,
			momentFormat: "YYYY-MM-DD",
			workspace: "Default",
			workspaceEnabled: true,
			openOnStartup: true,
			hasRibbonIcon: true,
			openMode: Mode.ReplaceAll,
			manualOpenMode: Mode.Retain,
			view: View.Default,
			revertView: true,
			refreshDataview: false,
			autoCreate: true,
			autoScroll: false,
			pin: false
		} as unknown as HomepageSettings;
		
		this.saveSettings();
		this.settings = await this.loadSettings();
		this.homepage = this.getHomepage();
		
		this.assert(
			this.homepage.data.commands.length == 0 &&
			this.homepage.data.value == "Default" &&
			this.homepage.data.kind == Kind.Workspace
		);
		
		//check that the settings tab isn't broken upon upgrade
		const { setting } = this.app;
		
		setting.open();
		setting.openTabById("homepage");
		await sleep(100);
		this.assert(document.getElementsByClassName("nv-debug-button").length > 0);
		setting.close();
	}
	
	async upgradeMomentSettings(this: HomepageTestPlugin) {
		this.homepage.data.kind = LEGACY_MOMENT_KIND;
		this.settings.version = 3;
		this.homepage.save();

		this.settings = await this.loadSettings();
		this.homepage = this.getHomepage();
		
		await this.homepage.open();
		
		const dailyNote = await this.internalPlugins["daily-notes"].instance.getDailyNote();
		const file = this.app.workspace.getActiveFile();

		this.assert(
			file?.name == dailyNote.name &&
			this.homepage.data.kind == Kind.DailyNote,
			file,
			this.homepage.data.kind
		);
		
		this.app.vault.delete(dailyNote);
	}
	
	async setToActiveFile(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		
		this.app.commands.executeCommandById("homepage:set-to-active-file");
		await sleep(100);
		
		this.assert(this.homepage.data.value == "Note A", this.homepage.data.value);
		
		await this.homepage.open();
		
		const file = this.app.workspace.getActiveFile();
		this.assert(file?.name == "Note A.md", file);
	}
}
