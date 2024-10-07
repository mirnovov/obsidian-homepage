import "obsidian";
import HomepagePlugin from "./main";

declare module "obsidian" {
	interface App {
		commands: CommandRegistry;
		plugins: PluginRegistry;
		internalPlugins: PluginRegistry;
		setting: any;
		showReleaseNotes: () => void;
		nvOrig_showReleaseNotes: () => void;
	}
	
	interface CommandRegistry {
		findCommand: (id: string) => Command;
		executeCommandById: (id: string) => void;
		commands: Record<string, Command>;
	}
	
	interface PluginRegistry {
		manifests: Record<string, PluginManifest>;
		plugins: Record<string, any>;
		enablePluginAndSave: (id: string) => Promise<void>;
		loadPlugin: (id: string) => Promise<void>;
		disablePlugin: (id: string) => Promise<void>;
		disablePluginAndSave: (id: string) => Promise<void>;
		installPlugin: (repo: string, version: string, manifest: PluginManifest) => Promise<void>;
	}
	
	interface Vault {
		config: Record<string, any>;
	}
	
	interface Workspace {
		floatingSplit: WorkspaceSplit
	}
	
	interface WorkspaceLeaf {
		parentSplit: WorkspaceSplit;
	}
	
	interface WorkspaceSplit {
		children: any[];
	}
}

declare global {
	interface Window {
		OBS_ACT: string | any;
		i18next: any;
		Capacitor: any;
		electron: any;
		electronWindow: any;
		homepage?: HomepagePlugin;
	}
	
	interface URLSearchParams {
		keys: () => Iterable<string>
	}

	interface HomepageDebugPlugin extends HomepagePlugin {
		loadDebugInfo: (info: any) => Promise<void>;
	    ensurePlugins: (plugins: string[], enable: boolean) => Promise<void>;
	}
}
