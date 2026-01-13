import { Mode, Kind, Period, View } from "src/homepage";

export const EN: Record<string, string> = {
	//Mode enum
	[Mode.ReplaceAll]: "Replace all open notes",
	[Mode.ReplaceLast]: "Replace last note",
	[Mode.Retain]: "Keep open notes",
	
	//View enum
	//Ensure these terms are consistent with those used in base Obsidian!
	[View.Default]: "Default view",
	[View.Reading]: "Reading view",
	[View.Source]: "Editing view (Source)",
	[View.LivePreview]: "Editing view (Live Preview)",
	
	//Kind enum
	//Ensure these terms are consistent with those used in base Obsidian!
	[Kind.File]: "File",
	[Kind.Workspace]: "Workspace",
	[Kind.Random]: "Random file",
	[Kind.RandomFolder]: "Random in folder",
	[Kind.Graph]: "Graph view",
	[Kind.None]: "Nothing",
	[Kind.Journal]: "Journal",
	[Kind.DailyNote]: "Daily Note",
	[Kind.WeeklyNote]: "Weekly Note",
	[Kind.MonthlyNote]: "Monthly Note",
	[Kind.YearlyNote]: "Yearly Note",
	
	//Period enum
	[Period.Both]: "Both",
	[Period.Startup]: "Startup only",
	[Period.Manual]: "Manual only",
	
	//Commands
	openHomepage: "Open homepage",
	setToActiveFile: "Set to active file",
	copyDebugInfo: "Copy debug info",
	
	//General UI messages
	pluginUnavailable: `Homepage cannot be opened due to plugin unavailablity.`,
	journalUnavailable: `Cannot find the journal "?0" to use as the homepage.`,
	workspaceUnavailable: `Cannot find the workspace "?0" to use as the homepage.`,
	noteUnavailable: `Cannot find the file "?0" to use as the homepage.`,
	homepageChanged: `The homepage has been changed to "?0".`,
	momentUpgradeNotice: `Date-dependent notes in Homepage have been removed. Set your Homepage as a Periodic or Daily Note instead.`,
	
	//Settings items
	openOnStartup: "Open on startup",
	openOnStartupDesc: "When launching Obsidian, open the homepage.",
	openOnStartupWarn: `This will override the built-in "Default file to open" setting.`,
	openWhenEmpty: "Open when empty", 
	openWhenEmptyDesc: "When there are no tabs open, open the homepage.", 
	alwaysApply: "Use when opening normally", 
	alwaysApplyDesc: "Use homepage settings when opening it normally, such as from a link or the file browser.",
	separateMobile: "Separate mobile homepage",
	separateMobileDesc: "For mobile devices, store the homepage and its settings separately.",
	separateMobileWarnMobile: "<b>Mobile settings are stored separately.</b> Therefore, changes to other settings will not affect desktop devices. To edit desktop settings, use a desktop device.",
	separateMobileWarnDesktop: "<b>Mobile settings are stored separately.</b> Therefore, changes to other settings will not affect mobile devices. To edit mobile settings, use a mobile device.",
	
	commandsGroup: "Commands",
	commandsDesc: "Select commands that will be executed when opening the homepage.",
	commandsAddButton: "Add...",
	commandUnavailable: "This command can't be found, so it won't be executed. It may belong to a disabled plugin.",
	commandsReally: "Really?",
	
	vaultGroup: "Vault environment",
	openMode: "Opening method", 
	openModeDesc: "Determine how extant tabs and views are affected on startup.", 
	manualOpenMode: "Manual opening method", 
	manualOpenModeDesc: "Determine how extant tabs and views are affected when opening with commands or the ribbon button.", 
	pin: "Pin", 
	pinDesc: "Pin the homepage when opening.",	
	hideReleaseNotes: "Hide release notes",
	hideReleaseNotesDesc: "Never display release notes when Obsidian updates.", 
	autoCreate: "Auto-create", 
	autoCreateDesc: "When the homepage doesn't exist, create a note with its name.", 
	autoCreateWarn: "If this vault is synced using unofficial services, this may lead to content being overwritten.",
	
	openingGroup: "Opened view",
	view: "Homepage view",
	viewDesc: "Choose what view to open the homepage in.",
	revertView: "Revert view on close", 
	revertViewDesc: "When navigating away from the homepage, restore the default view.",
	autoScroll: "Auto-scroll",
	autoScrollDesc: "When opening the homepage, scroll to the bottom and focus on the last line",
	refreshDataview: "Refresh Dataview",
	refreshDataviewDesc: "Always attempt to reload Dataview views when opening the homepage",
	refreshDataviewWarn: "Requires Dataview auto-refresh to be enabled.",
		
	//Settings UI messages
	"FileDesc": "Enter a note, base, or canvas to use.",
	"WorkspaceDesc": "Enter an Obsidian workspace to use.",
	"Graph viewDesc": "Your graph view will be used.",
	"NothingDesc": "Nothing will occur by default. Any commands added will still take effect.",
	"Random fileDesc": "A random note, base, or canvas from your Obsidian folder will be selected.",
	"Random in folderDesc": "Enter a folder. A random note, base, or canvas from it will be selected.",
	"JournalDesc": "Enter a Journal to use.",
	"Daily noteDesc": "Your Daily Note or Periodic Daily Note will be used.",
	"Weekly noteDesc": "Your Periodic Weekly Note will be used.",
	"Monthly noteDesc": "Your Periodic Monthly Note will be used.",
	"Yearly noteDesc": "Your Periodic Yearly Note will be used.",
	homepageSettingTitle: "Homepage",
	pluginUnavailableSettings: `The plugin required for this homepage type isn't available.`,
	copyDebugInfoNotice: "Copied homepage debug information to clipboard",
};