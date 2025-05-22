import { App, FileView, MarkdownView, Notice, View as OView, WorkspaceLeaf, WorkspaceWindow } from "obsidian";
import HomepagePlugin from "./main";
import { PERIODIC_KINDS, getAutorun, getJournalNote, getPeriodicNote, hasJournal } from "./periodic";
import { DEFAULT_DATA } from "./settings";
import { detachAllLeaves, emptyActiveView, equalsCaseless, hasLayoutChange, randomFile, sleep, trimFile, untrimName } from "./utils";

export const LEAF_TYPES: string[] = ["markdown", "canvas", "kanban", "bases-query"];

export const DEFAULT: string = "Main Homepage";
export const MOBILE: string = "Mobile Homepage";

export interface HomepageData {
	value: string,
	kind: string,
	openOnStartup: boolean,
	openMode: string,
	manualOpenMode: string,
	view: string,
	revertView: boolean,
	openWhenEmpty: boolean,
	refreshDataview: boolean,
	autoCreate: boolean,
	autoScroll: boolean,
	pin: boolean,
	commands: CommandData[],
	alwaysApply: boolean,
	hideReleaseNotes: boolean
} 

export interface CommandData {
	id: string,
	period: Period
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
	RandomFolder = "Random in folder",
	Graph = "Graph view",
	None = "Nothing",
	Journal = "Journal",
	DailyNote = "Daily Note",
	WeeklyNote = "Weekly Note",
	MonthlyNote = "Monthly Note",
	YearlyNote = "Yearly Note"
}

export enum Period {
	Both = "Both",
	Startup = "Startup only",
	Manual = "Manual only"
}

export const UNCHANGEABLE: Kind[] = [Kind.Random, Kind.Graph, Kind.None, ...PERIODIC_KINDS];

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
		
		const data = this.plugin.settings.homepages[name];
		
		if (data) this.data = Object.assign({}, DEFAULT_DATA, data);
		else {
			this.plugin.settings.homepages[name] = { ...DEFAULT_DATA };
			this.data = this.plugin.settings.homepages[name];
		}		
	}
	
	async open(alternate: boolean = false): Promise<void> {
		if (!this.plugin.hasRequiredPlugin(this.data.kind as Kind)) {
			new Notice("Homepage cannot be opened due to plugin unavailablity.");
			return;
		}
		else if (this.data.kind === Kind.Journal && !hasJournal(this)) {
			new Notice(`Cannot find the journal "${this.data.value}" to use as the homepage.`);
			return;
		}

		if (this.data.kind === Kind.Workspace) {
			await this.launchWorkspace();
		}
		else if (this.data.kind !== Kind.None) {
			let mode = this.plugin.loaded ? this.data.manualOpenMode : this.data.openMode;
			if (alternate) mode = Mode.Retain;
			
			await this.launchLeaf(mode as Mode);
		}
		
		if (this.data.commands.length < 1) return;
		const disallowed = this.plugin.loaded ? Period.Startup : Period.Manual;
		
		await hasLayoutChange(this.app);
		
		for (const {id, period} of this.data.commands) {
			if (period === disallowed) continue;
			this.app.commands.executeCommandById(id);
		}
	}
	
	async launchWorkspace(): Promise<void> {
		const workspacePlugin = this.plugin.internalPlugins.workspaces?.instance;
		
		if(!(this.data.value in workspacePlugin.workspaces)) {
			new Notice(`Cannot find the workspace "${this.data.value}" to use as the homepage.`);
			return;
		}
		
		workspacePlugin.loadWorkspace(this.data.value);
		await sleep(100);
	}
	
	async launchLeaf(mode: Mode): Promise<void> {
		let leaf: WorkspaceLeaf | undefined;

		this.computedValue = await this.computeValue();
		this.plugin.executing = true;
		
		if (getAutorun(this.plugin) && !this.plugin.loaded) {
			return;
		}

		if (mode !== Mode.ReplaceAll) {
			const alreadyOpened = this.getOpened();
			
			if (alreadyOpened.length > 0) {
				this.app.workspace.setActiveLeaf(alreadyOpened[0]);
				await this.configure(alreadyOpened[0]);
				return;
			}
			else if (mode == Mode.Retain && emptyActiveView(this.app)) {
				//if there is an empty tab, don't keep it
				mode = Mode.ReplaceLast;
			}
		}
		
		if (mode !== Mode.Retain) {
			this.app.workspace.getActiveViewOfType(OView)?.leaf.setPinned(false);
		}
		if (mode === Mode.ReplaceAll) {
			//The API is very finicky when the app is starting, so wait for things to initialise
			if (this.app.workspace?.floatingSplit?.children) {
				await sleep(0);
				(this.app.workspace.floatingSplit.children as WorkspaceWindow[]).forEach(c => c.win!.close());
			}
			
			await detachAllLeaves(this.app);
			await sleep(0);
		}
		
		if (this.data.kind === Kind.Graph) leaf = await this.launchGraph(mode);
		else leaf = await this.launchNote(mode);
		if (!leaf) return;
		
		await this.configure(leaf);
	}
	
	async launchGraph(mode: Mode): Promise<WorkspaceLeaf | undefined> {
		if (mode === Mode.Retain) {
			const leaf = this.app.workspace.getLeaf("tab");
			this.app.workspace.setActiveLeaf(leaf);
		}
		
		this.app.commands.executeCommandById("graph:open");
		return this.app.workspace.getActiveViewOfType(OView)?.leaf;
	}
	
	async launchNote(mode: Mode): Promise<WorkspaceLeaf | undefined> {
		let file = this.app.metadataCache.getFirstLinkpathDest(this.computedValue, "/");
		
		if (!file) {
			if (!this.data.autoCreate) {
				new Notice(`Homepage "${this.computedValue}" does not exist.`);
				return undefined;
			}
			
			file = await this.app.vault.create(untrimName(this.computedValue), "");
		}
		
		const content = await this.app.vault.cachedRead(file);
		const leaf = this.app.workspace.getLeaf(mode == Mode.Retain);
		await leaf.openFile(file);
		this.app.workspace.setActiveLeaf(leaf);
		
		if (content !== await this.app.vault.read(file)) {
			await this.app.vault.modify(file, content);
		}
		
		return leaf;
	}
		
	async configure(leaf: WorkspaceLeaf): Promise<void> {
		this.plugin.executing = false;
		const view = leaf.view;
		
		if (!(view instanceof MarkdownView)) {
			if (this.data.pin) view.leaf.setPinned(true);	
			this.configurePlugins();
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
		
		if (this.data.view !== View.Default) {
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
		}
		
		this.configurePlugins();
	}
	
	configurePlugins(): void {
		if (this.plugin.loaded && this.data.refreshDataview) { 
			this.plugin.communityPlugins.dataview?.index.touch();
		}

		this.plugin.communityPlugins["obsidian-file-color"]?.generateColorStyles();
	}
	
	getOpened(): WorkspaceLeaf[] {
		if (this.data.kind == Kind.Graph) return this.app.workspace.getLeavesOfType("graph");
		
		const leaves = LEAF_TYPES.flatMap(i => this.app.workspace.getLeavesOfType(i));

		return leaves.filter(leaf => {
			const name = leaf.view.getState().file as string;
			return equalsCaseless(
				name.endsWith("md") ? name.slice(0, -3) : name, 
				this.computedValue
			);
		});
	}
	
	async computeValue(): Promise<string> {
		let val = this.data.value;
		let file;
	
		switch (this.data.kind) {
			case Kind.Random:
				file = randomFile(this.app);
				if (file) val = file;
				break;
			case Kind.RandomFolder:
				file = randomFile(this.app, val);
				if (file) val = file;
				break;
			case Kind.Journal:
				val = await getJournalNote(val, this.plugin);
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
	
	async setToActiveFile(): Promise<void> {		
		this.data.value = trimFile(this.app.workspace.getActiveFile()!);
		await this.save();
		
		new Notice(`The homepage has been changed to "${this.data.value}".`);
	}
	
	canSetToFile(): boolean {
		return (this.app.workspace.getActiveFile() !== null &&
		!UNCHANGEABLE.includes(this.data.kind as Kind));
	}
	
	async revertView(): Promise<void> {
		if (this.lastView == undefined || this.data.view == View.Default) return;
		
		const view = this.lastView.deref();
		if (!view || equalsCaseless(trimFile(view.file!), this.computedValue)) return;
	
		const state = view.getState(),
			config = this.app.vault.config,
			mode = config.defaultViewMode || "source",
			source = config.livePreview !== undefined ? !config.livePreview : false;

		if (
			view.leaf.getViewState().type == "markdown" &&
			(mode != state.mode || source != state.source)
		) {
			state.mode = mode;
			state.source = source;
			await view.leaf.setViewState({ type: "markdown", state: state, active: true });
		}
		
		this.lastView = undefined;
	}
	
	async openWhenEmpty(): Promise<void> {
		if (!this.plugin.loaded || this.plugin.executing) return;
		const leaf = this.app.workspace.getActiveViewOfType(OView)?.leaf;
		
		if (
			leaf?.getViewState().type !== "empty" ||
			leaf.parentSplit.children.length != 1
		) return
		
		//should always behave the same regardless of mode
		await this.open(true);
	}
	
	async apply(): Promise<void> {
		const currentView = this.app.workspace.getActiveViewOfType(FileView);
		if (!currentView) return;
		
		const currentValue = trimFile(currentView.file!);
		if (this.openedViews.get(currentView) === currentValue) return;
		
		this.openedViews.set(currentView, currentValue);
		
		if (
			currentValue === await this.computeValue() &&
			this.plugin.loaded && !this.plugin.executing
		) {
			await this.configure(currentView.leaf);
		}
	}
}
