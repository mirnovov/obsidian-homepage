import { MarkdownView } from "obsidian";
import { View } from "src/homepage";
import { sleep } from "src/utils";
import HomepageTestPlugin from "./harness";

export default class ViewTests {
	async autoScroll(this: HomepageTestPlugin) {
		this.homepage.data.autoScroll = true;
		await this.homepage.save();
		
		await this.homepage.open();
		
		const view = this.app.workspace.getActiveViewOfType(MarkdownView)!;
		const count = view.editor.lineCount() - 1;
		const pos = view.editor.getCursor().line;
	
		this.assert(count == pos, view, count, pos);
	}
	
	async isPinned(this: HomepageTestPlugin) {
		this.homepage.data.pin = true;
		await this.homepage.save();
	
		await this.homepage.open();
		const leaf = this.app.workspace.getActiveViewOfType(MarkdownView)?.leaf;
		
		this.assert(leaf! && leaf.getViewState()!.pinned!, leaf);
	}
	
	async hasView(this: HomepageTestPlugin) {
		this.homepage.data.view = View.Reading;
		await this.homepage.save();
	
		await this.homepage.open();
		let state = this.app.workspace.getActiveViewOfType(MarkdownView)?.getState();
		
		this.assert(state?.mode == "preview", state);
		
		this.homepage.data.view = View.Source;
		await this.homepage.save();
		
		await this.homepage.open();
		state = this.app.workspace.getActiveViewOfType(MarkdownView)?.getState();
		
		this.assert(state?.mode == "source" && state.source as boolean, state);
	}
	
	async alwaysApply(this: HomepageTestPlugin) {
		this.homepage.data.view = View.Source;
		this.homepage.data.alwaysApply = true;
		this.homepage.save();
		
		this.app.workspace.openLinkText("Home", "", false);
		await sleep(500);
		
		const state = this.app.workspace.getActiveViewOfType(MarkdownView)?.getState();
		this.assert(state?.mode == "source" && state.source == true, state);
	}
	
	async reversion(this: HomepageTestPlugin) {
		this.assert(this.app.vault?.config.livePreview === undefined);
		this.homepage.data.view = View.Reading;
		this.homepage.save();
	
		this.homepage.open();
		await sleep(200);
		let mode = this.app.workspace.getActiveViewOfType(MarkdownView)?.getMode();
		this.assert(mode == "preview", mode);
		
		await this.app.workspace.openLinkText("Note B", "", false);
		await sleep(200);
		mode = this.app.workspace.getActiveViewOfType(MarkdownView)?.getMode();
		this.assert(mode == "source", mode);
	}
	
	async reversionThenViewChange(this: HomepageTestPlugin) {
		this.homepage.data.view = View.Reading;
		this.homepage.save();
	
		this.homepage.open();
		await sleep(200);
		const mode = this.app.workspace.getActiveViewOfType(MarkdownView)?.getMode();
		this.assert(mode == "preview", mode);
		
		await this.app.workspace.openLinkText("Note B", "", false);
		const view = this.app.workspace.getActiveViewOfType(MarkdownView),
			state = view?.getState() || {};
		state.mode = "source";
		await view?.leaf.setViewState({type: "markdown", state: state});
		await sleep(200);
		this.assert(state.source == false, state);
	}
	
	async reversionCaseInsensitive(this: HomepageTestPlugin) {
		this.homepage.data.view = View.Reading;
		this.homepage.data.value = "home";
		this.homepage.save();
	
		this.homepage.open();
		await sleep(200);
		const mode = this.app.workspace.getActiveViewOfType(MarkdownView)?.getMode();
		this.assert(mode == "preview", mode);
	}
	
	async reversionWithoutDefaults(this: HomepageTestPlugin) {
		const config = this.app.vault?.config;
		if (!config) this.app.vault.config = {};
		
		config.livePreview = true;
		config.defaultViewMode = "preview";
		this.homepage.data.view = View.Source;
		this.homepage.save();
		
		this.homepage.open();
		await sleep(200);
		let mode = this.app.workspace.getActiveViewOfType(MarkdownView)?.getMode();
		this.assert(mode == "source", mode);
		
		await this.app.workspace.openLinkText("Note B", "", false);
		await sleep(200);
		mode = this.app.workspace.getActiveViewOfType(MarkdownView)?.getMode();
		this.assert(mode == "preview", mode);
		
		this.app.vault.config = {};
	}
}
