import { App, FuzzySuggestModal, Notice, TAbstractFile, TFile } from "obsidian";
import { Homepage } from "./homepage";
import { TextInputSuggest } from "./suggest";
import { HomepageSettingTab } from "./settings"; 
import { trimFile } from "./utils";

export class FileSuggest extends TextInputSuggest<TFile> {
	getSuggestions(inputStr: string): TFile[] {
		const abstractFiles = this.app.vault.getAllLoadedFiles();
		const files: TFile[] = [];
		const inputLower = inputStr.toLowerCase();

		abstractFiles.forEach((file: TAbstractFile) => {
			if (
				file instanceof TFile && ["md", "canvas"].contains(file.extension) &&
				file.path.toLowerCase().contains(inputLower)
			) {
				files.push(file);
			}
		});

		return files;
	}

	renderSuggestion(file: TFile, el: HTMLElement) {
		if (file.extension == "md") {
			el.setText(trimFile(file));
		}
		else {
			//we don't use trimFile here as the extension isn't displayed here
			el.setText(file.path.slice(0, -7))
			el.insertAdjacentHTML(
				"beforeend", 
				`<div class="nav-file-tag" style="display:inline-block;vertical-align:middle">canvas</div>`
			);
		}
	 }

	selectSuggestion(file: TFile) {
		this.inputEl.value = trimFile(file);
		this.inputEl.trigger("input");
		this.close();
	}
}

export class WorkspaceSuggest extends TextInputSuggest<string> {
	getSuggestions(inputStr: string): string[] {
		const workspaces = Object.keys((this.app as any).internalPlugins.plugins.workspaces?.instance.workspaces);
		const inputLower = inputStr.toLowerCase();

		return workspaces.filter((workspace: string) => workspace.toLowerCase().contains(inputLower));
	}

	renderSuggestion(workspace: string, el: HTMLElement) {
		el.setText(workspace);
	 }

	selectSuggestion(workspace: string) {
		this.inputEl.value = workspace;
		this.inputEl.trigger("input");
		this.close();
	}
}

export class CommandSuggestModal extends FuzzySuggestModal<Object> {
	app: App
	homepage: Homepage;
	tab: HomepageSettingTab;

	constructor(tab: HomepageSettingTab) {
		super(tab.plugin.app);
		
		this.homepage = tab.plugin.homepage;
		this.tab = tab;
	}

	getItems(): Object[] {
		return Object.values((this.app as any).commands.commands);
	}

	getItemText(item: Object): string {
		return (item as any).name;
	}

	onChooseItem(item: Object) {
		if ((item as any).id === "homepage:open-homepage") {
			new Notice("Really?");
			return;
		}
		else if (!this.homepage.data.commands) {
			this.homepage.data.commands = [];
		}
		
		this.homepage.data.commands.push((item as any).id);
		this.homepage.save();
		this.tab.updateCommandBox();
	}
}
