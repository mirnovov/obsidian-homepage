import { MarkdownView, TFile, moment } from "obsidian";
import { Kind, View } from "src/homepage";
import HomepageTestPlugin from "./harness";

export default class HomepagePluginTests {
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
	
	async openCanvas(this: HomepageTestPlugin) {
		this.homepage.data.value = "Canvas.canvas";
		this.homepage.save();
		
		this.homepage.open();
		await this.sleep(100);
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("canvas");
		this.assert(file?.name == "Canvas.canvas" && leaves.length == 1, file, leaves);
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

	async periodicDailyNote(this: HomepageTestPlugin) {
		(this.app as any).plugins.enablePluginAndSave("periodic-notes");
		await this.sleep(100);
	
		this.homepage.data.kind = Kind.DailyNote;
		this.homepage.save();
	
		this.homepage.open();
		await this.sleep(100);
		
		const file = this.app.workspace.getActiveFile();
		const name = moment().format("YYYY-MM-DD") + ".md";
		
		this.assert(file?.name == name, file, name);
		this.app.vault.delete(this.app.vault.getAbstractFileByPath(name) as TFile);
		
		(this.app as any).plugins.disablePluginAndSave("periodic-notes");
	}
	
	async periodicNoteExtant(this: HomepageTestPlugin) {
		(this.app as any).plugins.enablePluginAndSave("periodic-notes");
		await this.sleep(100);
	
		this.homepage.data.kind = Kind.DailyNote;
		this.homepage.save();
		
		const name = moment().format("YYYY-MM-DD") + ".md";
		this.app.vault.create(name, "test");
	
		this.homepage.open();
		await this.sleep(100);
		
		const file = this.app.workspace.getActiveFile();
		
		this.assert(file?.name == name, file, name);
		this.app.vault.delete(this.app.vault.getAbstractFileByPath(name) as TFile);
		
		(this.app as any).plugins.disablePluginAndSave("periodic-notes");
	}
	
	async periodicWeeklyNote(this: HomepageTestPlugin) {
		(this.app as any).plugins.enablePluginAndSave("periodic-notes");
		await this.sleep(100);
	
		this.homepage.data.kind = Kind.WeeklyNote;
		this.homepage.save();
	
		this.homepage.open();
		await this.sleep(100);
		
		const file = this.app.workspace.getActiveFile();
		const name = moment().format("gggg-[W]ww") + ".md";
		
		this.assert(file?.name == name, file, name);
		this.app.vault.delete(this.app.vault.getAbstractFileByPath(name) as TFile);
		
		(this.app as any).plugins.disablePluginAndSave("periodic-notes");
	}
	
	async dataviewRefresh(this: HomepageTestPlugin) {
		(this.app as any).plugins.enablePluginAndSave("dataview");

		this.homepage.data.view = View.Reading;
		this.homepage.data.refreshDataview = true;
		this.homepage.data.value = "Dataview";
		await this.sleep(100);
		
		let previous = "" as any;
		
		for (let i = 0; i < 5; i++) {
			this.homepage.open();
			await this.sleep(100);
			
			let current = document.getElementsByClassName(
				"block-language-dataviewjs"
			)[0].getElementsByTagName("span")[0].textContent;
			
			this.app.workspace.getActiveViewOfType(MarkdownView)?.leaf.detach();
			
			if (current !== previous && i > 0) {
				(this.app as any).plugins.disablePluginAndSave("dataview");
				return;
			}
			
			previous = current;
		}
		
		this.assert(false);
		
		(this.app as any).plugins.disablePluginAndSave("dataview");
	}
	
	async openKanban(this: HomepageTestPlugin) {
		(this.app as any).plugins.enablePluginAndSave("obsidian-kanban");

		this.homepage.data.value = "Kanban.md";
		this.homepage.save();
		
		this.homepage.open();
		await this.sleep(100);
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("kanban");
		this.assert(file?.name == "Kanban.md" && leaves.length == 1, file, leaves);
		
		(this.app as any).plugins.disablePluginAndSave("obsidian-kanban");
	}	
}
