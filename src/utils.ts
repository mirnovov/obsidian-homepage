import { App, Platform, TFolder, TFile, View as OView, WorkspaceMobileDrawer } from "obsidian";

export function trimFile(file: TFile): string {
	if (!file) return "";
	return file.extension == "md" ? file.path.slice(0, -3): file.path;
}

export function untrimName(name: string): string {
	const hasExtension = name.split("/").slice(-1)[0].contains(".");
	return hasExtension ? name : `${name}.md`;
}

export function wrapAround(value: number, size: number): number {
	return ((value % size) + size) % size;
}

export function randomFile(app: App, root: string | undefined = undefined): string | undefined {
	let files = app.vault.getFiles();
	
	if (root) {
		const resolvedRoot = app.vault.getFolderByPath(root);
		if (!resolvedRoot) return undefined;
		files = getFilesInFolder(resolvedRoot)
	}

	files.filter((f: TFile) => ["md", "canvas", "base"].contains(f.extension));
	
	if (files.length) {
		const indice = Math.floor(Math.random() * files.length);
		return trimFile(files[indice]);
	}

	return undefined;
}

function getFilesInFolder(folder: TFolder): TFile[] {
	let files: TFile[] = [];
	
	for (const item of folder.children) {
		if (!(item instanceof TFolder)) files.push(item as TFile);
		
		else files.push(...getFilesInFolder(item as TFolder))
	}
	
	return files;
}

export function emptyActiveView(app: App): boolean {
	return app.workspace.getActiveViewOfType(OView)?.getViewType() == "empty";
}

export function equalsCaseless(a: string, b: string): boolean {
	return a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0;
}

export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function detachAllLeaves(app: App): Promise<void> {
	const layout = app.workspace.getLayout();

	layout.main = {
		"id": "5324373015726ba8",
		"type": "split",
		"children": [ 
			{
				"id": "4509724f8bf84da7",
				"type": "tabs",
				"children": [
					{
						"id": "e7a7b303c61786dc",
						"type": "leaf",
						"state": {"type": "empty", "state": {}, "icon": "lucide-file", "title": "New tab"}
					}
				]
			}
		],
		"direction": "vertical"
	}
	layout.active = "e7a7b303c61786dc";
	
	await app.workspace.changeLayout(layout);
	
	if (Platform.isMobile) {
		(app.workspace.rightSplit as WorkspaceMobileDrawer)?.updateInfo();
		addSyncButton(app);
	}
}

function addSyncButton(app: App): void {
	let sync = app.internalPlugins.plugins["sync"]?.instance;
	if (!sync) return;

	app.workspace.onLayoutReady(() => {
		sync.statusIconEl = (app.workspace.rightSplit as WorkspaceMobileDrawer).addHeaderButton(
			"sync-small", sync.openStatusIconMenu.bind(sync)
		);
		sync.statusIconEl.addEventListener("contextmenu", sync.openStatusIconMenu.bind(sync));
		sync.statusIconEl.addClass("sync-status-icon");
	});
}

export function hasLayoutChange(app: App): Promise<void | void[]> {
	const sync = app.internalPlugins.plugins.sync;
	let promises = [new Promise<void>(resolve => {
		const wrapped = async () => {
			resolve();
			app.workspace.off("layout-change", wrapped);
		};
		
		app.workspace.on("layout-change", wrapped);
	})];
	
	if (sync.enabled && sync.instance.syncing) {	
		promises.push(new Promise<void>(resolve => {
			const wrapped = async () => {
				resolve();
				sync.instance.off("status-change", wrapped);
			};
			
			sync.instance.on("status-change", wrapped);
		}));
	}
	
	return Promise.race([
		Promise.all(promises), 
		new Promise<void>(resolve => setTimeout(resolve, 1500))
	]);
}
