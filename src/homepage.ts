import { App, FileView, MarkdownView, Notice, View as OView, WorkspaceLeaf, moment } from "obsidian";
import HomepagePlugin from "./main";
import { getAutorun, getPeriodicNote } from "./periodic";
import { emptyActiveView, randomFile, trimFile, untrimName } from "./utils";

export const LEAF_TYPES: string[] = ["markdown", "canvas", "kanban"];

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
	openWhenEmpty: boolean,
	refreshDataview: boolean,
	autoCreate: boolean,
	autoScroll: boolean,
	pin: boolean,
	commands: string[],
	alwaysApply: boolean
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
	Random = "Random file",
	Graph = "Graph view",
	DailyNote = "Daily Note",
	WeeklyNote = "Weekly Note",
	MonthlyNote = "Monthly Note",
	YearlyNote = "Yearly Note",
	
	//deprecated, will be removed in 4.0
	MomentDate = "Date-dependent file"
}

export class Homepage {
	plugin: HomepagePlugin;
	app: App;
	data: HomepageData;
	
	name: string;
	lastView?: WeakRef<MarkdownView> = undefined;
	openedViews: WeakMap<FileView, string> = new WeakMap();
	computedValue: string;
	
	constructor(name: string, plugin: HomepagePlugin) {
		this.name = name;
		this.plugin = plugin;
		this.app = plugin.app;
		this.data = plugin.settings.homepages[name];
		
		if (!this.data.commands) {
			this.data.commands = [];
			this.save();
		}
	}
	
	async open(alternate: boolean = false): Promise<void> {
		if (!this.plugin.hasRequiredPlugin(this.data.kind as Kind)) {
			new Notice("Homepage cannot be opened due to plugin unavailablity.");
			return;
		}
		else if (this.data.kind == Kind.Workspace) {
			await this.launchWorkspace();
		}
		else {
			let mode = this.plugin.loaded ? this.data.manualOpenMode : this.data.openMode;
			if (alternate) mode = Mode.Retain;
			
			await this.launchLeaf(mode as Mode);
		}
		
		if (!this.data.commands) return;
				
		for (const command of this.data.commands) {
			(this.app as any).commands.executeCommandById(command);
		}
	}
	
	async launchWorkspace() {
		const workspacePlugin = this.plugin.internalPlugins.workspaces?.instance;
		
		if(!(this.data.value in workspacePlugin.workspaces)) {
			new Notice(`Cannot find the workspace "${this.data.value}" to use as the homepage.`);
			return;
		}
		
		workspacePlugin.loadWorkspace(this.data.value);
	}
	
	async launchLeaf(mode: Mode) {
		this.computedValue = await this.computeValue();
		this.plugin.executing = true;
		
		if (getAutorun(this.plugin) && !this.plugin.loaded) {
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
			else if (mode == Mode.Retain && emptyActiveView(this.app)) {
				//if there is an empty tab, don't keep it
				mode = Mode.ReplaceLast;
			}
		}
		else {
			LEAF_TYPES.forEach(i => this.app.workspace.detachLeavesOfType(i));
		}
		
		if (mode != Mode.Retain) {
			//hack to fix pin bug
			this.app.workspace.getActiveViewOfType(OView)?.leaf.setPinned(false);
		}
		
		if (this.data.kind === Kind.Graph) await this.launchGraph(mode);
		else await this.launchNote(mode);
		
		await this.configure();
	}
	
	async launchGraph(mode: Mode): Promise<void> {
		if (mode === Mode.Retain) {
			const leaf = this.app.workspace.getLeaf("tab");
			this.app.workspace.setActiveLeaf(leaf);
		}
		
		(this.app as any).commands.executeCommandById("graph:open");
	}
	
	async launchNote(mode: Mode): Promise<void> {
		do {
			await this.app.workspace.openLinkText(
				this.computedValue, "", mode == Mode.Retain, { active: true }
			);
		}
		//hack to fix bug with opening link when homepage is already extant beforehand
		while (this.app.workspace.getActiveFile() == null);
		
		if (mode == Mode.ReplaceAll) {
			this.app.workspace.detachLeavesOfType("empty");
		}
	}
		
	async isNonextant(): Promise<boolean> {
		const name = untrimName(this.computedValue);
		return !(await this.app.vault.adapter.exists(name));
	} 
	
	async configure(): Promise<void> {
		this.plugin.executing = false;
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		
		if (!view) {
			//for canvas, kanban
			if (this.data.pin) {
				this.app.workspace.getActiveViewOfType(OView)?.leaf.setPinned(true);	
			}
			return;	
		}
		
		const state = view.getState();
		
		if (this.data.revertView) {
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
		
		if (this.plugin.loaded && this.data.refreshDataview) { 
			this.plugin.communityPlugins.dataview?.index.touch();
		}
	}
	
	getOpened(): WorkspaceLeaf[] {
		if (this.data.kind == Kind.Graph) return this.app.workspace.getLeavesOfType("graph");
		
		const leaves = LEAF_TYPES.flatMap(i => this.app.workspace.getLeavesOfType(i));
		return leaves.filter(
			leaf => trimFile((leaf.view as any).file) == this.computedValue
		);
	}
	
	async computeValue(): Promise<string> {
		let val = this.data.value;
	
		switch (this.data.kind) {
			case Kind.MomentDate:
				val = moment().format(this.data.value);
				break;
			case Kind.Random:
				const file = randomFile(this.app);
				if (file) val = file;
				break;
			case Kind.DailyNote:
			case Kind.WeeklyNote:
			case Kind.MonthlyNote:
			case Kind.YearlyNote:
				val = await getPeriodicNote(this.data.kind, this.plugin);
				break;
		}
	
		return val
	}
	
	async save(): Promise<void> {
		this.plugin.settings.homepages[this.name] = this.data; 
		await this.plugin.saveSettings();
	}
	
	async revertView(): Promise<void> {
		if (this.lastView == undefined || this.data.view == View.Default) return;
		
		const view = this.lastView.deref();
		if (!view || trimFile(view.file) == this.computedValue) return;
	
		const state = view.getState(),
			  config = (this.app.vault as any).config,
			  mode = config.defaultViewMode || "source",
			  source = !config.livePreview || false;
		
		if (mode != state.mode || source != state.source) {
			state.mode = mode;
			state.source = source;
			await view.leaf.setViewState({type: "markdown", state: state, active: true });
		}
		
		this.lastView = undefined;
	}
	
	async openWhenEmpty(): Promise<void> {
		if (!this.plugin.loaded) return;
		const leaf = this.app.workspace.getActiveViewOfType(OView)?.leaf;
		
		if (
			leaf?.getViewState().type !== "empty" ||
			(leaf as any)?.parentSplit.children.length != 1
		) return
		
		await this.open();
	}
	
	async apply(): Promise<void> {
		const currentView = this.app.workspace.getActiveViewOfType(FileView);
		if (!currentView) return;
		
		const currentValue = trimFile(currentView.file);
		if (this.openedViews.get(currentView) === currentValue) return;
		
		this.openedViews.set(currentView, currentValue);
		
		if (
			currentValue === await this.computeValue() &&
			this.plugin.loaded && !this.plugin.executing
		) {
			await this.configure();
		}
	}
}
