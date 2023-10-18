import { App, AbstractInputSuggest, Command, FuzzySuggestModal, Notice, TAbstractFile, TFile } from "obsidian";
import { Homepage } from "./homepage";
import { HomepageSettingTab } from "./settings"; 
import { trimFile } from "./utils";

export class FileSuggest extends AbstractInputSuggest<TFile> {
	textInputEl: HTMLInputElement;
	
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
		this.textInputEl.value = trimFile(file);
		this.textInputEl.trigger("input");
		this.close();
	}
}

export class WorkspaceSuggest extends AbstractInputSuggest<string> {
	textInputEl: HTMLInputElement;
	
	getSuggestions(inputStr: string): string[] {
		const workspaces = Object.keys(this.app.internalPlugins.plugins.workspaces?.instance.workspaces);
		const inputLower = inputStr.toLowerCase();

		return workspaces.filter((workspace: string) => workspace.toLowerCase().contains(inputLower));
	}

	renderSuggestion(workspace: string, el: HTMLElement) {
		el.setText(workspace);
	}

	selectSuggestion(workspace: string) {
		this.textInputEl.value = workspace;
		this.textInputEl.trigger("input");
		this.close();
	}
}

export class CommandSuggestModal extends FuzzySuggestModal<unknown> {
	app: App
	homepage: Homepage;
	tab: HomepageSettingTab;

	constructor(tab: HomepageSettingTab) {
		super(tab.plugin.app);
		
		this.homepage = tab.plugin.homepage;
		this.tab = tab;
	}

	getItems(): Command[] {
		return Object.values(this.app.commands.commands);
	}

	getItemText(item: Command): string {
		return item.name;
	}

	onChooseItem(item: Command) {
		if (item.id === "homepage:open-homepage") {
			new Notice("Really?");
			return;
		}
		else if (!this.homepage.data.commands) {
			this.homepage.data.commands = [];
		}
		
		this.homepage.data.commands.push(item.id);
		this.homepage.save();
		this.tab.updateCommandBox();
	}
}
