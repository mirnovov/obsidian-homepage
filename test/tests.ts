import { Mode } from "src/homepage";
import HomepageTestPlugin from "./main";

export default class HomepageTests {
	async fileReplaceAll(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		await this.app.workspace.openLinkText("Note B", "", true);
		
		this.homepage.data.manualOpenMode = Mode.ReplaceAll;
		this.homepage.save();
		
		this.homepage.open();
		await this.sleep(50);
		
		let file = this.app.workspace.getActiveFile();
		let leaves = this.app.workspace.getLeavesOfType("markdown");
		console.log(file, leaves);
		this.assert(file?.name == "Home.md" && leaves.length == 1, "Homepage doesn't open");
	}
	
	async fileReplaceLast(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		await this.app.workspace.openLinkText("Note B", "", true);
		
		this.homepage.data.manualOpenMode = Mode.ReplaceLast;
		this.homepage.save();

		this.homepage.open();
		await this.sleep(50);
		
		let file = this.app.workspace.getActiveFile();
		let leaves = this.app.workspace.getLeavesOfType("markdown");
		this.assert(file?.name == "Home.md" && leaves.length == 2, "Homepage doesn't open");
	}
	
	async fileRetain(this: HomepageTestPlugin) {
		await this.app.workspace.openLinkText("Note A", "", false);
		await this.app.workspace.openLinkText("Note B", "", true);
		
		this.homepage.data.manualOpenMode = Mode.Retain;
		this.homepage.save();
	
		this.homepage.open();
		await this.sleep(50);
		
		let file = this.app.workspace.getActiveFile();
		let leaves = this.app.workspace.getLeavesOfType("markdown");
		this.assert(file?.name == "Home.md" && leaves.length == 3, "Homepage doesn't open");
	}
}