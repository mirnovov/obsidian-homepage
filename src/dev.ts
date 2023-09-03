import { DEFAULT_SETTINGS } from "./settings";

declare global {
	interface Window {
		homepageLoadDebugInfo: Function;
		homepageEnsurePlugins: Function;
	}
}

window.homepageLoadDebugInfo = async (info: any) => {
	const homepage = (app as any).plugins.plugins.homepage;
	if (info.version !== DEFAULT_SETTINGS.version) console.warn("Version not supported");

	(app.vault as any).config = { 
		...(app.vault as any).config,
		livePreview: info._livePreview !== "default" ? info._livePreview : true,
		focusNewTab: info._focusNewTab !== "default" ? info._livePreview : true,
		defaultViewMode: info._focusNewTab !== "default" ? info._livePreview : "editing"
	};

	for (const pluginName in homepage.internalPlugins) {
		const plugin = homepage.internalPlugins[pluginName];
		const present = info._internalPlugins.includes(pluginName);
		
		if (present) plugin.enable();
		else plugin.disable();
		
		console.log(
			`${present ? "Enabled" : "Disabled"} internal plugin ${pluginName}`
		);
	}
	
	await window.homepageEnsurePlugins(info._plugins, true);
	
	homepage.settings = info;
	homepage.saveSettings();
	homepage.homepage = homepage.getHomepage();
	
	console.log("Settings updated!");
}

window.homepageEnsurePlugins = async (plugins: string[], enable: boolean) => {
	const pluginList = await fetch(
		`https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json`
	).then(r => r.json());
	const pluginRegistry = (app as any).plugins;
	
	const keyedPluginList = {} as any;
	for (const item of pluginList) keyedPluginList[item.id] = item;
	
	for (let id of plugins) {
		if (id === "homepage") continue;
		
		const repo = keyedPluginList[id].repo;
		const manifest = await fetch(
			`https://raw.githubusercontent.com/${repo}/HEAD/manifest.json`
		).then(r => r.json());
		const version = manifest.version;
		
		if (version !== pluginRegistry.manifests[id]?.version) {
			await pluginRegistry.installPlugin(repo, version, manifest);
		}
		if (enable) {
			await pluginRegistry.loadPlugin(id);
			await pluginRegistry.enablePluginAndSave(id);
		}
		else {
			await pluginRegistry.disablePlugin(id);
		}
		
		console.log(`${manifest.name} ${manifest.version} installed for testing`);
	}
}
