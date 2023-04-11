import { App, MarkdownView, Notice, WorkspaceLeaf, moment } from "obsidian";
import HomepagePlugin from "./main";
import { getDailynotesAutorun, getDataviewPlugin, trimFile, untrimName } from "./utils";

const LEAF_TYPES: string[] = ["markdown", "canvas", "kanban"];

export const DEFAULT: string = "Main Homepage";
export const MOBILE: string = "Mobile Homepage";

export interface HomepageData {
	[member: string]: any,
	value: string,
	kind: string,
	openOnStartup: boolean,
	hasRibbonIcon: boolean,
	openMode: string,
	manualOpenMode: string,
	view: string,
	revertView: boolean,
	refreshDataview: boolean,
	autoCreate: boolean,
	autoScroll: boolean,
	pin: boolean
} 

export enum Mode {
	ReplaceAll = "Replace all open notes",
	ReplaceLast = "Replace last note",
	Retain = "Keep open notes"
}

export enum View {
	Default = "Default view",
	Reading = "Reading view",
	Source = "Editing view (Source)",
	LivePreview = "Editing view (Live Preview)"
}

export enum Kind {
	File = "File",
	Workspace = "Workspace",
	MomentDate = "Date-dependent file"
}

export class Homepage {
	plugin: HomepagePlugin;
	app: App;
	data: HomepageData;
	
	name: string;
	lastView: WeakRef<MarkdownView> = null;
	computedValue: string;
	
	constructor(name: string, plugin: HomepagePlugin) {
		this.name = name;
		this.plugin = plugin;
		this.app = plugin.app;
		this.data = plugin.settings.homepages[name];
	}
	
	async setReversion(value: boolean): Promise<void> {
		if (value && this.data.view !== View.Default) {
			this.plugin.registerEvent(this.app.workspace.on("layout-change", this.revertView));
		} 
		else {
			this.app.workspace.off("layout-change", this.revertView);
		}
	}
	
	async open(alternate: boolean = false): Promise<void> {
		if (this.workspacesMode()) {
			await this.launchWorkspace();
			return;
		}
		
		let mode = this.plugin.loaded ? this.data.manualOpenMode : this.data.openMode;
		if (alternate) mode = Mode.Retain;
		
		await this.launchPage(mode as Mode);
	}
	
	async launchWorkspace() {
		if(!(this.data.value in this.plugin.workspacePlugin?.instance.workspaces)) {
			new Notice(`Cannot find the workspace "${this.data.value}" to use as the homepage.`);
			return;
		}
		
		this.plugin.workspacePlugin.instance.loadWorkspace(this.computedValue);
	}
	
	async launchPage(mode: Mode) {
		this.computedValue = this.computeValue();
		this.plugin.executing = true;
		
		if (getDailynotesAutorun(this.app) && !this.plugin.loaded) {
			return;
		}
		else if (!this.data.autoCreate && await this.isNonextant()) {
			new Notice(`Homepage "${this.computedValue}" does not exist.`);
			return;
		}
		
		if (mode != Mode.ReplaceAll) {
			const alreadyOpened = this.getOpened();
	
			if (alreadyOpened.length > 0) {
				this.app.workspace.setActiveLeaf(alreadyOpened[0]);
				await this.configure();
				return;
			}
		}
		else {
			if (this.data.pin) {
				//hack to fix pin bug
				this.getOpened().forEach(h => h.setPinned(false));
			}
			
			LEAF_TYPES.forEach(i => this.app.workspace.detachLeavesOfType(i));
		}
		
		await this.openLink(mode as Mode);
		
		if (this.app.workspace.getActiveFile() == null) {
			//hack to fix bug with opening link when homepage is already extant beforehand
			await this.openLink(mode as Mode);
		}
	
		await this.configure();
	}
		
	async isNonextant(): Promise<boolean> {
		let name = untrimName(this.computedValue);
		return !(await this.app.vault.adapter.exists(name));
	} 
	
	async openLink(mode: Mode): Promise<void> {
		await this.app.workspace.openLinkText(
			this.computedValue, "", mode == Mode.Retain, { active: true }
		);
	}
	
	async configure(): Promise<void> {
		this.plugin.executing = false;
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		
		if (!view) {
			//not ideal, but there is no canvas view type exposed afaik
			if (this.data.pin) this.app.workspace.activeLeaf.setPinned(true);	
			return;	
		}
		
		const state = view.getState();
		
		if (this.data.revertView && this.plugin.loaded) {
			this.lastView = new WeakRef(view);
		}
	
		if (this.data.autoScroll) {
			const count = view.editor.lineCount();
			
			if (state.mode == "preview") {
				view.previewMode.applyScroll(count - 4);
			}
			else {
				view.editor.setCursor(count);
				view.editor.focus();
			}
		}	
		
		if (this.data.pin) view.leaf.setPinned(true);	
		if (this.data.view == View.Default) return;
	
		switch(this.data.view) {
			case View.LivePreview:
			case View.Source:
				state.mode = "source";
				state.source = this.data.view != View.LivePreview;
				break;
			case View.Reading:
				state.mode = "preview";
				break;
		}
	
		await view.leaf.setViewState({type: "markdown", state: state});
		if (this.plugin.loaded && this.data.refreshDataview) { getDataviewPlugin(this.app)?.index.touch(); }
	}
	
	getOpened(): WorkspaceLeaf[] {
		let leaves = LEAF_TYPES.flatMap(i => this.app.workspace.getLeavesOfType(i));
		return leaves.filter(
			leaf => trimFile((leaf.view as any).file) == this.computedValue
		);
	}
	
	computeValue(): string {
		let val = this.data.value;
	
		if (this.data.kind == Kind.MomentDate) {
			val = moment().format(this.data.value);
		}
	
		return val
	}
	
	async save(): Promise<void> {
		this.plugin.settings.homepages[this.name] = this.data; 
		await this.plugin.saveSettings();
	}
	
	workspacesMode(): boolean {
		return this.plugin.workspacePlugin?.enabled && this.data.kind == Kind.Workspace;
	}
	
	revertView = async (): Promise<void> => {
		if (!this.plugin.loaded || this.lastView == null) return;
		
		const view = this.lastView.deref();
		if (!view || trimFile(view.file) == this.computedValue) return;
	
		const state = view.getState();
		const config = (this.app.vault as any).config;
		
		console.log(state.mode, state.source);
		state.mode = config.defaultViewMode;
		state.source = !config.livePreview;
		await view.leaf.setViewState({type: "markdown", state: state});
		this.lastView = null;
	}
}