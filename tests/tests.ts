import { MarkdownView, TAbstractFile } from "obsidian";
import { Kind, Mode, View } from "src/homepage";
import { HomepageSettings, DEFAULT_SETTINGS } from "src/settings";
import HomepageTestPlugin from "./harness";

export default class HomepageTests {
	async replaceAll(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		await this.app.workspace.openLinkText("Note B", "", true);
		
		this.homepage.data.manualOpenMode = Mode.ReplaceAll;
		this.homepage.save();
		
		this.homepage.open();
		await this.sleep(100);
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("markdown");
		this.assert(file?.name == "Home.md" && leaves.length == 1, file, leaves);
	}
	
	async replaceLast(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		await this.app.workspace.openLinkText("Note B", "", true);
		
		this.homepage.data.manualOpenMode = Mode.ReplaceLast;
		this.homepage.save();

		this.homepage.open();
		await this.sleep(100);
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("markdown");
		this.assert(file?.name == "Home.md" && leaves.length == 2, file, leaves);
	}
	
	async retain(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		await this.app.workspace.openLinkText("Note B", "", true);
		
		this.homepage.data.manualOpenMode = Mode.Retain;
		this.homepage.save();
	
		this.homepage.open();
		await this.sleep(100);
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("markdown");
		this.assert(file?.name == "Home.md" && leaves.length == 3, file, leaves);
	}
	
	async isPinned(this: HomepageTestPlugin) {
		this.homepage.data.pin = true;
		this.homepage.save();
	
		this.homepage.open();
		await this.sleep(100);
		const leaf = this.app.workspace.getActiveViewOfType(MarkdownView)?.leaf;
		
		this.assert(leaf && leaf.getViewState().pinned as any, leaf);
	}

	async hasView(this: HomepageTestPlugin) {
		this.homepage.data.view = View.Reading;
		this.homepage.save();
	
		this.homepage.open();
		await this.sleep(100);
		let state = this.app.workspace.getActiveViewOfType(MarkdownView)?.getState();
		
		this.assert(state?.mode == "preview", state);
		
		this.homepage.data.view = View.Source;
		this.homepage.save();
		
		this.homepage.open();
		await this.sleep(100);
		state = this.app.workspace.getActiveViewOfType(MarkdownView)?.getState();
		
		this.assert(state?.mode == "source" && state.source, state);
	}
	
	async reversion(this: HomepageTestPlugin) {
		this.homepage.data.view = View.Reading;
		this.homepage.setReversion(this.homepage.data.revertView);
		this.homepage.save();
	
		this.homepage.open();
		await this.sleep(200);
		let mode = this.app.workspace.getActiveViewOfType(MarkdownView)?.getMode();
		this.assert(mode == "preview", mode);
		
		await this.app.workspace.openLinkText("Note B", "", false);
		await this.sleep(200);
		mode = this.app.workspace.getActiveViewOfType(MarkdownView)?.getMode();
		this.assert(mode == "source", mode);
	}
	
	async commands(this: HomepageTestPlugin) {
		this.addCommand({
			id: "nv-test-command",
			name: "Test",
			callback: () => (this as any).test = true
		});
		
		this.homepage.data.commands = ["homepage:nv-test-command"];
		this.homepage.save();
	
		this.homepage.open();
		await this.sleep(100);
		
		this.assert((this as any).test, this);
	}
	
	async autoCreate(this: HomepageTestPlugin) {
		this.homepage.data.value = "temp";
		this.homepage.save();

		this.homepage.open();
		await this.sleep(100);
		
		let file = this.app.workspace.getActiveFile();
		this.assert(file?.name == "temp.md", file);
		
		this.app.vault.delete(file as TAbstractFile);
		
		this.homepage.data.autoCreate == false;
		this.homepage.save();
	
		this.homepage.open();
		await this.sleep(100);
		
		file = this.app.workspace.getActiveFile();
		this.assert(file?.name != "temp.md", file);
	}
	
	async autoScroll(this: HomepageTestPlugin) {
		this.homepage.data.autoScroll = true;
		this.homepage.save();
		
		this.homepage.open();
		await this.sleep(100);
		
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		const count = (view as any).editor.lineCount() - 1;
		const pos = (view as any).editor.getCursor().line;

		this.assert(count == pos, view, count, pos);
	}
	
	async workspaces(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		
		const bottom = this.app.workspace.getLeaf("split", "horizontal");
		this.app.workspace.setActiveLeaf(bottom, { focus: true });
		
		await this.app.workspace.openLinkText("Note B", "", false);
		this.internalPlugins.workspaces.instance.saveWorkspace("Home");
		
		this.app.workspace.iterateAllLeaves(l => l.detach());
		this.homepage.data.kind = Kind.Workspace;
		this.homepage.open();
		await this.sleep(100);
		
		const split = (this.app.workspace.rootSplit as any).children[0];
		const upper = split.children[0].children[0].view;
		const lower = split.children[1].children[0].view;

		this.assert(
			split.direction == "horizontal" &&
			upper.file.name == "Note A.md" && lower.file.name == "Note B.md",
			split, upper, lower
		);
	}
	
	async random(this: HomepageTestPlugin) {
		this.homepage.data.kind = Kind.Random;
		this.homepage.save();
		
		//check that the files are different at least 1/10 times
		let name = null, newname;
		
		for (let i = 0; i < 10; i++) {
			this.homepage.open();
			await this.sleep(70);
			newname = this.app.workspace.getActiveFile()?.name;
			
			if (i > 0 && newname !== name) return;
			name = newname;
		}
		this.assert(false);
	}
	
	async dailyNote(this: HomepageTestPlugin) {
		this.homepage.data.kind = Kind.DailyNote;
		this.homepage.save();

		this.homepage.open();
		await this.sleep(100);
		
		const dailyNote = await this.internalPlugins["daily-notes"].instance.getDailyNote();
		const file = this.app.workspace.getActiveFile();
		
		this.assert(file?.name == dailyNote.name, file, dailyNote);
		this.app.vault.delete(dailyNote);
	}
	
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