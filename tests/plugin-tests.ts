import { MarkdownView, TFile, WorkspaceLeaf, WorkspaceSplit, moment } from "obsidian";
import { Kind, Period, View } from "src/homepage";
import { sleep } from "src/utils";
import HomepageTestPlugin from "./harness";

export default class PluginTests {
	async workspaces(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		
		const bottom = this.app.workspace.getLeaf("split", "horizontal");
		this.app.workspace.setActiveLeaf(bottom, { focus: true });
		
		await this.app.workspace.openLinkText("Note B", "", false);
		this.internalPlugins.workspaces.instance.saveWorkspace("Home");
		
		this.app.workspace.iterateRootLeaves(l => l.detach());
		this.homepage.data.kind = Kind.Workspace;
		await this.homepage.open();
		
		const split = this.app.workspace.rootSplit.children[0] as WorkspaceSplit;
		const upper = (split.children[0].children[0] as WorkspaceLeaf).view as MarkdownView;
		const lower = (split.children[1].children[0] as WorkspaceLeaf).view as MarkdownView;
	
		this.assert(
			split.direction == "horizontal" &&
			upper.file!.name == "Note A.md" && lower.file!.name == "Note B.md",
			split, upper, lower
		);
	}
	
	async openCanvas(this: HomepageTestPlugin) {
		this.homepage.data.value = "Canvas.canvas";
		await this.homepage.save();
		await this.homepage.open();
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("canvas");
		this.assert(file?.name == "Canvas.canvas" && leaves.length == 1, file, leaves);
	}
	
	async dailyNote(this: HomepageTestPlugin) {
		this.homepage.data.kind = Kind.DailyNote;
		await this.homepage.save();
		await this.homepage.open();
		
		const dailyNote = await this.internalPlugins["daily-notes"].instance.getDailyNote();
		const file = this.app.workspace.getActiveFile();
		
		this.assert(file?.name == dailyNote.name, file, dailyNote);
		this.app.vault.delete(dailyNote);
	}
		
	async workspacesDailyNote(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
	
		const bottom = this.app.workspace.getLeaf("split", "horizontal");
		this.app.workspace.setActiveLeaf(bottom, { focus: true });
		
		await this.app.workspace.openLinkText("Note B", "", false);
		this.internalPlugins.workspaces.instance.saveWorkspace("Home");
		
		this.homepage.data.commands = [{
			id: "daily-notes",
			period: Period.Both
		}];
		await this.homepage.save();
		
		this.app.workspace.iterateRootLeaves(l => l.detach());
		this.homepage.data.kind = Kind.Workspace;
		await this.homepage.open();
	
		const dailyNote = await this.internalPlugins["daily-notes"].instance.getDailyNote();
		const file = this.app.workspace.getActiveFile();
		
		this.assert(file?.name == dailyNote.name, file, dailyNote);
		await sleep(100);
		this.app.vault.delete(dailyNote);
	}

	async periodicDailyNote(this: HomepageTestPlugin) {
		await this.app.plugins.enablePluginAndSave("periodic-notes");
	
		this.homepage.data.kind = Kind.DailyNote;
		await this.homepage.save();
		await this.homepage.open();
		
		const file = this.app.workspace.getActiveFile();
		const name = moment().format("YYYY-MM-DD") + ".md";
		
		this.assert(file?.name == name, file, name);
		this.app.vault.delete(this.app.vault.getAbstractFileByPath(name) as TFile);
		
		await this.app.plugins.disablePluginAndSave("periodic-notes");
	}
	
	async periodicNoteExtant(this: HomepageTestPlugin) {
		await this.app.plugins.enablePluginAndSave("periodic-notes");
	
		this.homepage.data.kind = Kind.DailyNote;
		await this.homepage.save();
		
		const name = moment().format("YYYY-MM-DD") + ".md";
		this.app.vault.create(name, "test");
	
		await this.homepage.open();
		
		const file = this.app.workspace.getActiveFile();
		
		this.assert(file?.name == name, file, name);
		this.app.vault.delete(this.app.vault.getAbstractFileByPath(name) as TFile);
		
		await this.app.plugins.disablePluginAndSave("periodic-notes");
	}
	
	async periodicWeeklyNote(this: HomepageTestPlugin) {
		await this.app.plugins.enablePluginAndSave("periodic-notes");
		await sleep(100);
	
		this.homepage.data.kind = Kind.WeeklyNote;
		await this.homepage.save();
		await this.homepage.open();
		
		const file = this.app.workspace.getActiveFile();
		const name = moment().format("gggg-[W]ww") + ".md";
		
		this.assert(file?.name == name, file, name);
		this.app.vault.delete(this.app.vault.getAbstractFileByPath(name) as TFile);
		
		await this.app.plugins.disablePluginAndSave("periodic-notes");
	}
	
	async dataviewRefresh(this: HomepageTestPlugin) {
		await this.app.plugins.enablePluginAndSave("dataview");

		this.homepage.data.view = View.Reading;
		this.homepage.data.refreshDataview = true;
		this.homepage.data.value = "Dataview";
		await sleep(100);
		
		let previous = "";
		
		for (let i = 0; i < 5; i++) {
			await this.homepage.open();
			await sleep(100);
			
			const current = document.getElementsByClassName(
				"block-language-dataviewjs"
			)[0].getElementsByTagName("span")[0].textContent;
			
			this.app.workspace.getActiveViewOfType(MarkdownView)?.leaf.detach();
			
			if (current !== previous && i > 0) {
				this.app.plugins.disablePluginAndSave("dataview");
				return;
			}
			
			previous = current!;
		}
		
		this.assert(false);
		
		await this.app.plugins.disablePluginAndSave("dataview");
	}
	
	async openKanban(this: HomepageTestPlugin) {
		await this.app.plugins.enablePluginAndSave("obsidian-kanban");
		await sleep(200);

		this.homepage.data.value = "Kanban.md";
		await this.homepage.save();
		await this.homepage.open();
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("kanban");
		this.assert(file?.name == "Kanban.md" && leaves.length == 1, file, leaves);
		
		await this.app.plugins.disablePluginAndSave("obsidian-kanban");
		await sleep(100);
	}	
	
	async openGraph(this: HomepageTestPlugin) {
		this.homepage.data.kind = Kind.Graph;
		await this.homepage.save();
		await this.homepage.open();
		await sleep(100);
		
		const leaves = this.app.workspace.getLeavesOfType("graph");
		this.assert(leaves.length == 1, leaves);
	}
	
	async openJournal(this: HomepageTestPlugin) {
		await this.app.plugins.enablePluginAndSave("journals");
		await sleep(200);
		
		this.homepage.data.kind = Kind.Journal;
		this.homepage.data.value = "Test";
		await this.homepage.save();
		await this.homepage.open();
		
		const file = this.app.workspace.getActiveFile();
		const name = "j-" + moment().format("YYYY-MM-DD") + ".md";
		
		this.assert(file?.name == name, file, name);
		this.app.vault.delete(this.app.vault.getAbstractFileByPath(name) as TFile);
		
		await this.app.plugins.disablePluginAndSave("journals");
		await sleep(100);
	}
	
	async openBase(this: HomepageTestPlugin) {
		this.homepage.data.kind = Kind.File;
		this.homepage.data.value = "Base.base";
		await this.homepage.save();
		await this.homepage.open();
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("bases-query");
		this.assert(file?.name == "Base.base" && leaves.length == 1, file, leaves);
	}
}
