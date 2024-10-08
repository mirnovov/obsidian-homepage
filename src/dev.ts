import { requestUrl } from "obsidian";
import { DEFAULT_SETTINGS } from "./settings";
import HomepagePlugin from "./main";

(HomepagePlugin.prototype as HomepageDebugPlugin).loadDebugInfo = async function (this: HomepageDebugPlugin, info: any): Promise<void> {
	if (info.version !== DEFAULT_SETTINGS.version) console.warn("Version not supported");

	this.app.vault.config = { 
		...this.app.vault.config,
		livePreview: info._livePreview !== "default" ? info._livePreview : true,
		focusNewTab: info._focusNewTab !== "default" ? info._livePreview : true,
		defaultViewMode: info._focusNewTab !== "default" ? info._livePreview : "editing"
	};

	for (const pluginName in this.internalPlugins) {
		const plugin = this.internalPlugins[pluginName];
		const present = info._internalPlugins.includes(pluginName);
		
		if (present) plugin.enable();
		else plugin.disable();
		
		console.log(
			`${present ? "Enabled" : "Disabled"} internal plugin ${pluginName}`
		);
	}
	
	await this.ensurePlugins(info._plugins, true);
	
	this.settings = info;
	this.saveSettings();
	this.homepage = this.getHomepage();
	
	console.log("Settings updated!");
};

(HomepagePlugin.prototype as HomepageDebugPlugin).ensurePlugins = async function (this: HomepageDebugPlugin, plugins: string[], enable: boolean): Promise<void> {
	const pluginList = await requestUrl(
		`https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json`
	).then(r => r.json);
	const pluginRegistry = this.app.plugins;
	
	const keyedPluginList: Record<string, any> = {};
	for (const item of pluginList) keyedPluginList[item.id] = item;
	
	for (const id of plugins) {
		if (id === "homepage" || !(id in keyedPluginList)) continue;
		
		const repo = keyedPluginList[id]?.repo;
		const manifest = await requestUrl(
			`https://raw.githubusercontent.com/${repo}/HEAD/manifest.json`
		).then(r => r.json);
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
};
