import { Modal } from "obsidian";
import HomepagePlugin from "src/main";
import { DEFAULT_DATA } from "src/settings";
import HomepageTests from "./tests";

type Result = {
	name: string,
	error: string | null,
	passed: boolean
}

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
			
			//reset state
			this.homepage.data = DEFAULT_DATA;
			this.homepage.save();
			this.app.workspace.iterateAllLeaves(l => l.detach());
			await this.sleep(70);
						
			try {
				await (tests as any)[name].call(this);
				results.push({name: name, error: null, passed: true})
			}
			catch (e: any) {
				results.push({name: name, error: e, passed: false})
			}
		}
		
		const modal = new TestResultModal(this, results);
		modal.open();
	}
	
	assert(cond: boolean, string = "") {
		if (!cond) throw new Error(string);
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
		let success = 0, failure = 0;
		
		for (const result of this.results) {
			if (result.passed) {
				this.contentEl.createDiv({ 
					text: `✅ ${result.name} succeeded` 
				});
				success += 1;
			}
			else {
				const div = this.contentEl.createDiv({
					text: `❌ ${result.name} failed: `
				});
				div.createEl("br");
				div.createEl("code", { text: `${result.error}` });
				failure += 1;
			}
			
			this.titleEl.innerHTML = `✅ ${success} Passed &nbsp;&nbsp; ❌ ${failure} Failed`;
		}
	}
	
	onClose() {
		this.contentEl.empty();
	}
}
