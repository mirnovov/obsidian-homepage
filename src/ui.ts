import { 
	App, AbstractInputSuggest, ButtonComponent, Command, FuzzySuggestModal, 
	Menu, Notice, 	Setting, SettingGroup, TAbstractFile, TFile, TFolder, getIcon, setTooltip, 
} from "obsidian";
import { CommandData, Homepage, Kind, Period } from "./homepage";
import { HomepageSettingTab } from "./settings"; 
import { trimFile } from "./utils";

type Suggestor = typeof FileSuggest | typeof FolderSuggest | typeof JournalSuggest | typeof WorkspaceSuggest;

class FileSuggest extends AbstractInputSuggest<TFile> {
	textInputEl: HTMLInputElement;
	
	getSuggestions(inputStr: string): TFile[] {
		const abstractFiles = this.app.vault.getAllLoadedFiles();
		const files: TFile[] = [];
		const inputLower = inputStr.toLowerCase();

		abstractFiles.forEach((file: TAbstractFile) => {
			if (
				file instanceof TFile && ["md", "canvas", "base"].contains(file.extension) &&
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
			el.setText(file.path.split(".").slice(0, -1).join("."))
			el.insertAdjacentHTML(
				"beforeend", 
				`<div class="nav-file-tag nv-homepage-file-tag">${file.extension}</div>`
			);
		}
	}

	selectSuggestion(file: TFile) {
		this.textInputEl.value = trimFile(file);
		this.textInputEl.trigger("input");
		this.close();
	}
}

class FolderSuggest extends AbstractInputSuggest<TFolder> {
	textInputEl: HTMLInputElement;
	
	getSuggestions(inputStr: string): TFolder[] {
		const inputLower = inputStr.toLowerCase();

		return this.app.vault.getAllFolders().filter(f =>
			f.path.toLowerCase().contains(inputLower)
		);
	}
	
	renderSuggestion(folder: TFolder, el: HTMLElement) {
		el.setText(folder.path);
	}

	selectSuggestion(folder: TFolder) {
		this.textInputEl.value = folder.path;
		this.textInputEl.trigger("input");
		this.close();
	}
}


class WorkspaceSuggest extends AbstractInputSuggest<string> {
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

class JournalSuggest extends AbstractInputSuggest<string> {
	textInputEl: HTMLInputElement;
	
	getSuggestions(inputStr: string): string[] {
		const journals: string[] = this.app.plugins.plugins.journals.journals.map(
			(a: any): string => a.name
		);
		const inputLower = inputStr.toLowerCase();

		return journals.filter(j => j.toLowerCase().contains(inputLower));
	}

	renderSuggestion(journal: string, el: HTMLElement) {
		el.setText(journal);
	}

	selectSuggestion(workspace: string) {
		this.textInputEl.value = workspace;
		this.textInputEl.trigger("input");
		this.close();
	}
}

export const SUGGESTORS: Partial<Record<Kind, Suggestor>> = {
	[Kind.File]: FileSuggest,
	[Kind.Workspace]: WorkspaceSuggest,
	[Kind.RandomFolder]: FolderSuggest,
	[Kind.Journal]: JournalSuggest
} 

export class CommandBox {
	app: App;
	homepage: Homepage;
	tab: HomepageSettingTab;
	setting: Setting;
	
	container: HTMLElement;
	dropzone: HTMLElement;
	activeDrag: HTMLElement | null;
	activeCommand: CommandData | null;

	constructor(tab: HomepageSettingTab, group: SettingGroup) {
		this.app = tab.plugin.app;
		this.homepage = tab.plugin.homepage;
		this.tab = tab;
		
		group.addSetting(setting => {
			setting.settingEl.addClass("nv-command-setting");
			setting.descEl.addClass("nv-command-desc");
			setting.descEl.innerText = "Select commands that will be executed when opening the homepage.";

			this.container = setting.settingEl.createDiv({ cls: "nv-command-box" });
		});
		
		this.dropzone = document.createElement("div");
		
		this.dropzone.className = "nv-command-pill nv-dropzone";
		this.dropzone.addEventListener("dragenter", e => e.preventDefault());
		this.dropzone.addEventListener("dragover", e => e.preventDefault());
		this.dropzone.addEventListener("drop", () => this.terminateDrag());
		
		this.update();
	}
	
	update(): void {
		this.container.innerHTML = "";
		this.activeDrag = null;
		this.activeCommand = null;
		
		for (const command of this.homepage.data.commands) {
			const appCommand = this.app.commands.findCommand(command.id);			
			const pill = this.container.createDiv({ 
				cls: "nv-command-pill", 
				attr: { draggable: true, } 
			});
			
			pill.addEventListener("dragstart", event => {
				event.dataTransfer!.effectAllowed = "move";
				
				this.activeCommand = this.homepage.data.commands.splice(this.indexOf(pill), 1)[0];
				this.activeDrag = pill;
				
				this.dropzone.style.width = `${pill.clientWidth}px`;
				this.dropzone.style.height = `${pill.clientHeight}px`;
			});
			
			pill.addEventListener("dragover", e => this.moveDropzone(pill, e));
			pill.addEventListener("drop", e => e.preventDefault());
			pill.addEventListener("dragend", () => this.terminateDrag());
			
			pill.createSpan({ 
				cls: "nv-command-text",
				text: appCommand?.name ?? command.id,
			});
			
			const periodButton = new ButtonComponent(pill)
				.setIcon("route")
				.setClass("clickable-icon")
				.setClass("nv-command-period")
				.onClick(e => this.showMenu(command, e, periodButton));
				
			if (command.period != Period.Both) {
				periodButton.setClass("nv-command-selected");
				periodButton.setIcon("");
				
				periodButton.buttonEl.createSpan({ text: command.period });
			}
				
			new ButtonComponent(pill)
				.setIcon("trash-2")
				.setClass("clickable-icon")
				.setClass("nv-command-delete")
				.onClick(() => this.delete(command));
				
			if (!appCommand) {
				pill.classList.add("nv-command-invalid");
				pill.prepend(getIcon("ban")!);
				
				setTooltip(pill, 
					"This command can't be found, so it won't be executed."
					+ " It may belong to a disabled plugin.",
					{ delay: 0.001 }
				);
			}
		}
		
		new ButtonComponent(this.container)
			.setClass("nv-command-add-button")
			.setButtonText("Add...")
			.onClick(() => {
				const modal = new CommandSuggestModal(this.tab);
				modal.open();
			});
	} 
	
	delete(command: CommandData): void {
		this.homepage.data.commands.remove(command);
		this.homepage.save();
		this.update();
	}
	
	showMenu(command: CommandData, event: MouseEvent, button: ButtonComponent): void {
		const menu = new Menu();

		for (const key of Object.values(Period)) {
			menu.addItem(item => {
				item.setTitle(key as string);
				item.setChecked(command.period == key);
				item.onClick(() => {
					command.period = key;
					this.homepage.save();
					this.update();
				});
			});
		}
		
		const rect = button.buttonEl.getBoundingClientRect();
		menu.showAtPosition({ x: rect.x - 22, y: rect.y + rect.height + 8 });
	}

	indexOf(pill: HTMLElement): number {
		return Array.from(this.container.children).indexOf(pill);
	}
	
	moveDropzone(anchor: HTMLElement, event: DragEvent): void {
		if (!this.activeDrag) return;
		
		this.activeDrag.hidden = true;
		const rect = anchor.getBoundingClientRect();
		
		if (event.x < rect.left + (rect.width / 2)) {
			this.container.insertBefore(this.dropzone, anchor);
		}
		else {
			this.container.insertAfter(this.dropzone, anchor);
		}
		
		event.preventDefault();
	}
	
	terminateDrag(): void {
		if (!this.activeCommand) return;

		this.homepage.data.commands.splice(
			this.indexOf(this.dropzone), 0, this.activeCommand
		);
		
		this.homepage.save();
		this.update();
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
		
		this.homepage.data.commands.push({ 
			id: item.id, period: Period.Both 
		});
		
		this.homepage.save();
		this.tab.commandBox.update();
	}
}
