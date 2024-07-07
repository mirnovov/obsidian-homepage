import { App, AbstractInputSuggest, ButtonComponent, Command, FuzzySuggestModal, Notice, TAbstractFile, TFile, getIcon, setTooltip } from "obsidian";
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

export interface DragData {
	element: HTMLElement,
	commandId: string
}

export class CommandBox {
	app: App;
	homepage: Homepage;
	tab: HomepageSettingTab;
	
	container: HTMLElement;
	dropzone: HTMLElement;
	activeDrag: DragData | null;

	constructor(tab: HomepageSettingTab) {
		this.app = tab.plugin.app;
		this.homepage = tab.plugin.homepage;
		this.tab = tab;
		
		this.container = tab.containerEl.createDiv({ cls: "nv-command-box" });		
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
		
		for (const [index, id] of this.homepage.data.commands.entries()) {
			const command = this.app.commands.findCommand(id);			
			const pill = this.container.createDiv({ 
				cls: "nv-command-pill", 
				text: command?.name ?? id,
				attr: { draggable: true } 
			});
			
			pill.addEventListener("dragstart", event => {
				event.dataTransfer!.effectAllowed = "move";
				this.homepage.data.commands.splice(index, 1);

				this.activeDrag = { element: pill, commandId: id };
				this.dropzone.style.width = `${pill.clientWidth}px`;
				this.dropzone.style.height = `${pill.clientHeight}px`;
			});
			
			pill.addEventListener("dragover", e => this.moveDropzone(pill, e));
			pill.addEventListener("drop", e => e.preventDefault());
			pill.addEventListener("dragend", () => this.terminateDrag());
			
			new ButtonComponent(pill)
				.setIcon("trash-2")
				.setClass("clickable-icon")
				.onClick(() => {
					this.homepage.data.commands.splice(index, 1);
					this.homepage.save();
					this.update();
				});
				
			if (!command) {
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
	
	moveDropzone(anchor: HTMLElement, event: DragEvent): void {
		if (!this.activeDrag) return;
		
		this.activeDrag.element.hidden = true;
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
		if (!this.activeDrag) return;

		const position = Array.from(this.container.children).indexOf(this.dropzone);
		this.homepage.data.commands.splice(position, 0, this.activeDrag.commandId);
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
		
		this.homepage.data.commands.push(item.id);
		this.homepage.save();
		this.tab.commandBox.update();
	}
}
