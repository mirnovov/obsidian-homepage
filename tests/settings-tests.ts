import { Kind, Mode, View } from "src/homepage";
import { HomepageSettings, DEFAULT_SETTINGS } from "src/settings";
import HomepageTestPlugin from "./harness";

export default class HomepageSettingsTests {
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
		} as any;
		
		this.saveSettings();
		this.settings = await this.loadSettings();
		this.homepage = this.getHomepage();
		
		this.assert(
			this.homepage.data.commands.length == 0 &&
			this.homepage.data.value == "Default" &&
			this.homepage.data.kind == Kind.Workspace
		);
		
		//check that the settings tab isn't broken upon upgrade
		const { setting } = (this.app as any);
		
		setting.open();
		setting.openTabById("homepage");
		this.assert(document.getElementsByClassName("nv-debug-button").length > 0);
		setting.close();
	}

}