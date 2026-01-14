import { TAbstractFile } from "obsidian";
import { Kind, Mode, Period } from "src/homepage";
import { sleep } from "src/utils";
import HomepageTestPlugin from "./harness";

export default class OpeningTests {
	async replaceAll(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		await this.app.workspace.openLinkText("Note B", "", true);
		
		this.homepage.data.manualOpenMode = Mode.ReplaceAll;
		await this.homepage.save();
		await this.homepage.open();
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("markdown");
		this.assert(file?.name == "Home.md" && leaves.length == 1, file, leaves);
	}
	
	async replaceAllImage(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		await this.app.workspace.openLinkText("Image.png", "", true);
		
		this.homepage.data.manualOpenMode = Mode.ReplaceAll;
		await this.homepage.save();
		await this.homepage.open();
		
		const leaves = this.app.workspace.getLeavesOfType("image");
		this.assert(leaves.length == 0, leaves);
	}
	
	async replaceLast(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		await this.app.workspace.openLinkText("Note B", "", true);
		
		this.homepage.data.manualOpenMode = Mode.ReplaceLast;
		await this.homepage.save();
		await this.homepage.open();
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("markdown");
		this.assert(file?.name == "Home.md" && leaves.length == 2, file, leaves);
	}
	
	async retain(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		await this.app.workspace.openLinkText("Note B", "", true);
		
		this.homepage.data.manualOpenMode = Mode.Retain;
		await this.homepage.save();
		await this.homepage.open();
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("markdown");
		this.assert(file?.name == "Home.md" && leaves.length == 3, file, leaves);
	}
	
	async commands(this: HomepageTestPlugin) {
		this.addCommand({
			id: "nv-test-command",
			name: "Test",
			callback: () => this.test = true
		});
		
		this.homepage.data.commands = [{
			id: "homepage:nv-test-command",
			period: Period.Both
		}];
		
		await this.homepage.save();
		await this.homepage.open();
		
		this.assert(this.test, this);
	}
	
	async autoCreate(this: HomepageTestPlugin) {
		this.homepage.data.value = "temp";
		this.homepage.data.autoCreate = true;
		await this.homepage.save();
		await this.homepage.open();
		
		let file = this.app.workspace.getActiveFile();
		this.assert(file?.name == "temp.md", file);
		
		this.app.vault.delete(file as TAbstractFile);
		
		this.homepage.data.autoCreate = false;
		await this.homepage.save();
		await this.homepage.open();
		
		file = this.app.workspace.getActiveFile();
		this.assert(file?.name != "temp.md", file);
	}
	
	async random(this: HomepageTestPlugin) {
		this.homepage.data.kind = Kind.Random;
		await this.homepage.save();
		
		//check that the files are different at least 1/10 times
		let name = null, newname;
		
		for (let i = 0; i < 10; i++) {
			await this.homepage.open();
			newname = this.app.workspace.getActiveFile()?.name;
			
			if (i > 0 && newname !== name) return;
			name = newname;
		}
		this.assert(false);
	}
	
	async randomFolder(this: HomepageTestPlugin) {
		this.homepage.data.kind = Kind.RandomFolder;
		this.homepage.data.value = "TestFolder";
		await this.homepage.save();
		
		//check that the files are in the correct folder for 10 runs
		let path;
		
		for (let i = 0; i < 10; i++) {
			await this.homepage.open();
			path = this.app.workspace.getActiveFile()?.path;
			this.assert(path?.startsWith(this.homepage.data.value)!);
		}
	}
	
	async newNote(this: HomepageTestPlugin) {
		this.homepage.data.kind = Kind.NewNote;
		await this.homepage.save();
		
		let file;
		
		for (let i = 0; i < 2; i++) {
			await this.homepage.open();
			file = this.app.workspace.getActiveFile()!;
			this.assert(file.path === "Home 1.md");
		}
		
		this.app.vault.delete(file!);
	}
	
	async openWhenEmpty(this: HomepageTestPlugin) {
		this.homepage.data.openWhenEmpty = true;
		await this.homepage.save();
		
		this.app.workspace.iterateRootLeaves(l => l.detach());
		await sleep(500);
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("markdown");
		this.assert(file?.name == "Home.md" && leaves.length == 1, file, leaves);
	}
	
	async openWhenEmptyReplaceAll(this: HomepageTestPlugin) {
		this.homepage.data.openWhenEmpty = true;
		this.homepage.data.manualOpenMode = Mode.ReplaceAll;
		await this.homepage.save();
		
		this.app.workspace.iterateRootLeaves(l => l.detach());
		await sleep(500);
		
		const file = this.app.workspace.getActiveFile();
		const leaves = this.app.workspace.getLeavesOfType("markdown");
		this.assert(file?.name == "Home.md" && leaves.length == 1, file, leaves);
	}	
}
