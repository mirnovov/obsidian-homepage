import { ButtonComponent, Modal, getIcon } from "obsidian";
import { HomepageData } from "src/homepage";
import HomepagePlugin from "src/main";
import { DEFAULT_DATA } from "src/settings";
import { detachAllLeaves, sleep } from "src/utils";

type Result = {
	name: string,
	error: string | null,
	passed: boolean
}

const TEST_SUITES = [
	import("./opening-tests"),
	import("./plugin-tests"),
	import("./setting-tests"),
	import("./view-tests")
];

const PLUGINS = ["dataview", "journals", "obsidian-kanban", "periodic-notes"];

export default class HomepageTestPlugin extends HomepagePlugin {
	testResults: Record<string, Result[]> = {};
	test = false;

	async onload(): Promise<void> {
		this.registerObsidianProtocolHandler("nv-testing-restart", async () => {
			window.electron.remote.app.quit();
		});
		
		super.onload();
		this.app.workspace.onLayoutReady(async () => {
			await (this as unknown as HomepageDebugPlugin).ensurePlugins(PLUGINS, false);
			await this.execute();
		});
	}
	
	async execute(): Promise<void> {
		await sleep(100);
		
		for (const suite of TEST_SUITES) {
			await this.runTests((await suite).default);
		}		

		const modal = new TestResultModal(this);
		modal.open();
	}
	
	async runTests(suite: any): Promise<void> {
		const tests = new suite();
		const className = tests.constructor.name;
		
		this.testResults[className] = [];
		
		for (const name of Object.getOwnPropertyNames(suite.prototype)) {
			if (name == "constructor") continue;
			const result: Result = { name: name, error: null, passed: true };

			//reset state
			this.homepage.data = { ...DEFAULT_DATA };
			await this.homepage.save();
			detachAllLeaves(this.app);
			await sleep(50);
			
			try {
				await tests[name].call(this);
			}
			catch (e) {
				if (!(e instanceof TestAssertionError)) console.error(e);
				result.error = e as string;
				result.passed = false;
			}
			
			this.testResults[className].push(result);
		}
		
		this.homepage.data = {} as unknown as HomepageData;
		await this.homepage.save();
	}
	
	assert(cond: boolean, ...args: unknown[]) {
		if (!cond) {
			const e = new TestAssertionError(args.toString());
			console.error("Assertion failed: ", args.length ? args : null);
			throw e;
		}
	}
}

class TestResultModal extends Modal {
	plugin: HomepageTestPlugin;
	results: Record<string, Result[]>;
	
	constructor(plugin: HomepageTestPlugin) {
		super(plugin.app);
		this.plugin = plugin;
	}
	
	async onOpen() {
		this.modalEl.addClass("nv-modal");		
		let success = 0, failure = 0;
		
		this.contentEl.addClass("nv-results");
		
		for (const [name, suite] of Object.entries(this.plugin.testResults)) {
			this.contentEl.createEl("h1", { text: name });

			for (const result of suite) {
				const row = this.contentEl.createDiv();
				row.append(
					getIcon(result.passed ? "check" : "cross")!, 
					result.name
				);
				
				if (result.passed) {
					success += 1;
				}
				else {
					row.createEl("code", { text: `${result.error}` });
					failure += 1;
				}
			}
		}
		
		this.titleEl.classList.add("nv-result-summary");
		this.titleEl.append(
			getIcon("check")!, 
			` ${success} Passed\xa0\xa0\xa0`,
			getIcon("cross")!,
			` ${failure} Failed`
		);
		
		new ButtonComponent(this.modalEl)
			.setIcon("terminal-square")
			.setClass("clickable-icon")
			.setClass("nv-devtools")
			.onClick(() => {
				const ew = window.electronWindow;
				!ew.isDevToolsOpened() ? ew.openDevTools() : ew.closeDevTools();
			})
	}
	
	onClose() {
		this.contentEl.empty();
	}
}

class TestAssertionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "TestAssertionError";
	}
}
