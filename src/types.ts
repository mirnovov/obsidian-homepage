import { Command, PluginManifest, SplitDirection, TFile, moment } from "obsidian";
import HomepagePlugin from "./main";
import { HomepageData } from "./homepage";
import { HomepageSettings } from "./settings";

declare module "obsidian" {
	interface App {
		commands: CommandRegistry;
		plugins: ExternalPluginRegistry;
		internalPlugins: InternalPluginRegistry;
		setting: SettingsModal;
		runOpeningBehavior: (path: string) => (void | Promise<void>);
		nvOrig_runOpeningBehavior: (path: string) => (void | Promise<void>);
		showReleaseNotes: () => void;
		nvOrig_showReleaseNotes: () => void;
		viewRegistry: ViewRegistry;
	}
	
	interface CommandRegistry {
		findCommand: (id: string) => Command;
		executeCommandById: (id: string) => void;
		commands: Record<string, Command>;
	}
	
	interface ExternalPluginRegistry {
		manifests: Record<string, PluginManifest>;
		plugins: Record<string, Plugin> & {
			"dataview"?: DataviewPlugin,
			"journals"?: JournalsPlugin,
			"obsidian-file-color"?: FileColorPlugin,
			"new-tab-default-page"?: NewTabDefaultPagePlugin,
			"periodic-notes"?: PeriodicNotesPlugin
		};
		enablePluginAndSave: (id: string) => Promise<void>;
		loadPlugin: (id: string) => Promise<void>;
		disablePlugin: (id: string) => Promise<void>;
		disablePluginAndSave: (id: string) => Promise<void>;
		installPlugin: (repo: string, version: string, manifest: PluginManifest) => Promise<void>;
	}
	
	interface FileManager {
		createNewFile: (folder: string, path?: string, ext?: string) => Promise<TFile>;
	}
	
	interface InternalPlugin<T extends Plugin> {
		enabled: boolean;
		instance: T;
		enable: () => void;
		disable: () => void;
	}
	
	interface InternalPluginRegistry {
		plugins: Record<string, InternalPlugin<Plugin>> & {
			"daily-notes": InternalPlugin<DailyNotesPlugin>,
			"sync": InternalPlugin<SyncPlugin>,
			"workspaces": InternalPlugin<WorkspacesPlugin>
		};
	}
	
	interface Plugin {
		id: string;
	}
	
	interface SettingsModal extends Modal {
		openTabById: (id: string) => void;
	}
	
	interface Vault {
		config: {
			livePreview?: string | boolean;
			focusNewTab?: string | boolean;
			defaultViewMode?: string;
		};
	}
	
	interface ViewRegistry {
		typeByExtension: Record<string, string>
	}
	
	interface Workspace {
		floatingSplit: WorkspaceSplit
	}
	
	interface WorkspaceItem {
		children: WorkspaceItem[];
	}
	
	interface WorkspaceLeaf {
		history: object;
		parentSplit: WorkspaceSplit;
	}
	
	interface WorkspaceMobileDrawer {
		addHeaderButton(name: string, callback: (a: unknown) => void): Element;
		updateInfo(): void;
	}
	
	interface WorkspaceSplit {
		children: WorkspaceItem[];
		direction: SplitDirection;
	}
	
	interface DataviewPlugin extends Plugin {
		index: {
			touch: () => void;
		}
	}
	
	interface DailyNotesPlugin extends Plugin {
		getDailyNote: () => Promise<TFile>;
	}
	
	interface FileColorPlugin extends Plugin {
		generateColorStyles: () => void;
	}
	
	interface JournalsPlugin extends Plugin {
		getJournal: (id: string) => Journal;
		journals: Journal[];
		reprocessNotes: () => void;
	}
	
	interface Journal {
		autoCreate: () => Promise<void>;
		config: {
			value: {
				autoCreate: boolean;
			}
		}
		get: (date: moment.Moment) => JournalNoteData;
		getNotePath: (metadata: JournalNoteData) => string;
		name: string;
	}
	
	type JournalNoteData = unknown;
	
	interface NewTabDefaultPagePlugin extends Plugin {
		checkForNewTab: (e: WeakSet<WorkspaceLeaf>) => Promise<void>;
		nvOrig_checkForNewTab: (e: WeakSet<WorkspaceLeaf>) => Promise<void>
	}
	
	interface PeriodicNotesPlugin extends Plugin {
		cache: {
			initialize: () => void;
		};
		calendarSetManager: {
			getActiveSet: () => Record<string, { enabled: boolean }>
		};
		getPeriodicNote: (noun: string, date: moment.Moment) => TFile;
		createPeriodicNote: (noun: string, date: moment.Moment) => Promise<void>;
		settings: Record<string, { enabled: boolean }>;
	}
	
	interface SyncPlugin extends Plugin {
		on: (event: string, callback: () => Promise<void>) => void;
		off: (event: string, callback: () => Promise<void>) => void;
		openStatusIconMenu: () => void;
		statusIconEl: Element;
		syncing: boolean;
	}
	
	interface WorkspacesPlugin extends Plugin {
		workspaces: Record<string, object>;
		loadWorkspace: (id: string) => void;
		saveWorkspace: (id: string) => void;
	}
}

declare global {
	interface Window {
		OBS_ACT?: Record<string, string>;
		Capacitor: Capacitor;
		electron: Electron;
		electronWindow: ElectronWindow;
		homepage?: HomepagePlugin;
		moment: moment.Moment;
	}
	
	interface Capacitor {
		Plugins: {
			App: {
				getLaunchUrl: () => Promise<{ url: string }>;
			}
		}
	}
	
	interface Electron {
		remote: {
			app: {
				quit: () => void;
			}
		};
	}
	
	interface ElectronWindow {
		isDevToolsOpened: () => boolean;
		openDevTools: () => void;
		closeDevTools: () => void;
	}

	interface HomepageDebugPlugin extends HomepagePlugin {
		loadDebugInfo: (info: HomepageDebugSettings) => Promise<void>;
	    ensurePlugins: (plugins: string[], enable: boolean) => Promise<void>;
	}
	
	interface HomepageDebugSettings extends HomepageSettings {
		_livePreview: string;
		_focusNewTab: string | boolean;
		_internalPlugins: string[];
		_plugins: string[];
	}	
	
	interface HomepageLegacySettings extends HomepageSettings, HomepageData {
		defaultNote?: string;
		momentFormat?: string;
		useMoment?: boolean;
		workspace?: string;
		workspaceEnabled?: boolean;
	}
}
