import { ButtonComponent, Modal, getIcon } from "obsidian";
import HomepagePlugin from "src/main";
import { DEFAULT_DATA } from "src/settings";
import HomepageTests from "./tests";

type Result = {
	name: string,
	error: string | null,
	passed: boolean
}

const TEST_CSS = `
	.nv-modal {
		overflow: hidden;
	}
	
	.nv-results {
		overflow: scroll;
		max-height: 70vh;
	}
	
	.nv-results div {
		border-top: 1px solid var(--hr-color);
		padding: 4px 0;
	}
	
	.nv-results div:first-child {
		border-top: none;
	}
	
	.nv-results .svg-icon, .nv-result-summary .svg-icon {
		stroke: var(--color-green); 
		stroke-width: 4px; 
		width: 1em;
		height: 1em;
		vertical-align: text-bottom;
	}
	
	.nv-results .svg-icon {
		margin-right: 5px;
	}
	
	.nv-results .lucide-x, .nv-result-summary .lucide-x {
		stroke: var(--color-red);
	}
	
	.nv-results code {
		display: block;
		color: var(--text-muted);
		font-family: var(--font-monospace);
		font-size: 0.8em;
		padding: 3px 0 0;
	}
	
	.nv-devtools {
		align-self: flex-end;
		padding: 0;
		margin: 5px 0 0;
	}
`;

export default class HomepageTestPlugin extends HomepagePlugin {
	async onload(): Promise<void> {
		this.registerObsidianProtocolHandler("nv-testing-restart", async () => {
			(window as any).electron.remote.app.quit();
		});
		
		super.onload();
		this.app.workspace.onLayoutReady(async () => await this.runTests());
	}
	
	async runTests() {
		const tests = new HomepageTests();
		const results = [];
		
		for (const name of Object.getOwnPropertyNames(HomepageTests.prototype)) {
			if (name == "constructor") continue;
			const result = { name: name, error: null, passed: true };

			//reset state
			this.homepage.data = { ...DEFAULT_DATA };
			this.homepage.save();
			this.app.workspace.iterateAllLeaves(l => l.detach());
			await this.sleep(50);
						
			try {
				await (tests as any)[name].call(this);
			}
			catch (e: any) {
				if (!(e instanceof TestAssertionError)) console.error(e);
				result.error = e;
				result.passed = false;
			}
			
			results.push(result);
		}
		
		const modal = new TestResultModal(this, results);
		modal.open();
	}
	
	assert(cond: boolean, ...args: any[]) {
		if (!cond) {
			const e = new TestAssertionError(args.toString());
			console.error("Assertion failed: ", args.length ? args : null);
			throw e;
		}
	}
	
	sleep(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

class TestResultModal extends Modal {
	plugin: HomepageTestPlugin;
	results: Result[];
	
	constructor(plugin: HomepageTestPlugin, results: Result[]) {
		super(plugin.app);
		this.plugin = plugin;
		this.results = results;
	}
	
	async onOpen() {
		this.modalEl.addClass("nv-modal");		
		this.modalEl.createEl("style", { text: TEST_CSS });
		let success = 0, failure = 0;
		
		this.contentEl.addClass("nv-results");
		
		for (const result of this.results) {
			const row = this.contentEl.createDiv();
			row.append(
				getIcon(result.passed ? "check" : "cross") as any, 
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
		
		this.titleEl.classList.add("nv-result-summary");
		this.titleEl.append(
			getIcon("check") as any, 
			` ${success} Passed\xa0\xa0\xa0`,
			getIcon("cross") as any,
			` ${failure} Failed`
		);
		
		new ButtonComponent(this.modalEl)
			.setIcon("terminal-square")
			.setClass("clickable-icon")
			.setClass("nv-devtools")
			.onClick(() => {
				const ew = (window as any).electronWindow;
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
