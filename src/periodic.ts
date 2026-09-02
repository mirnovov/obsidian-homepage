import { Plugin, TFile, moment } from "obsidian";
import HomepagePlugin from "./main";
import { Homepage, Kind } from "./homepage";
import { trimFile } from "./utils";
import { 
	createDailyNote, getDailyNote, getAllDailyNotes,
	createWeeklyNote, getMonthlyNote, getAllMonthlyNotes,
	createMonthlyNote, getWeeklyNote, getAllWeeklyNotes,
	createYearlyNote, getYearlyNote, getAllYearlyNotes  	
} from "obsidian-daily-notes-interface";
import { getJournalsApi } from "obsidian-journals-api";

interface KindInfo {
	noun: string,
	adjective: string,
	create: (date: moment.Moment) => Promise<TFile>,
	get: (date: moment.Moment, dailyNotes: Record<string, TFile>) => TFile,
	getAll: () => Record<string, TFile>
}

export { getJournalsApi } from "obsidian-journals-api";

export const PERIODIC_INFO: Record<string, KindInfo> = {
	[Kind.DailyNote]: {
		noun: "day",
		adjective: "daily",
		create: createDailyNote,
		get: getDailyNote,
		getAll: getAllDailyNotes
	},
	[Kind.WeeklyNote]: {
		noun: "week",
		adjective: "weekly",
		create: createWeeklyNote,
		get: getWeeklyNote,
		getAll: getAllWeeklyNotes
	},
	[Kind.MonthlyNote]: {
		noun: "month",
		adjective: "monthly",
		create: createMonthlyNote,
		get: getMonthlyNote,
		getAll: getAllMonthlyNotes
	},
	[Kind.YearlyNote]: {
		noun: "year",
		adjective: "yearly",
		create: createYearlyNote,
		get: getYearlyNote,
		getAll: getAllYearlyNotes
	}
};

export const PERIODIC_KINDS: Kind[] = [
	Kind.DailyNote, Kind.WeeklyNote, Kind.MonthlyNote, Kind.YearlyNote
];

export const LEGACY_MOMENT_KIND: string = "Date-dependent file";

export async function getPeriodicNote(kind: Kind, plugin: HomepagePlugin): Promise<string> {
	const periodicNotes = plugin.communityPlugins["periodic-notes"]!,
		info = PERIODIC_INFO[kind],
		date = window.moment().startOf(info.noun as moment.unitOfTime.StartOf);
	let note;
		
	if (isLegacyPeriodicNotes(periodicNotes)) {
		const all = info.getAll();
		
		if (!Object.keys(all).length) {
			note = await info.create(date);	
		}
		else {
			note = info.get(date, all) || await info.create(date);	
		}
		
		if (!note) note = info.get(date, all);
	}
	else {
		periodicNotes.cache.initialize();
		note = (
			periodicNotes.getPeriodicNote(info.noun, date) ||
			await periodicNotes.createPeriodicNote(info.noun, date)
		);
	}
	
	return trimFile(note);
}

export function hasRequiredPeriodicity(kind: Kind, plugin: HomepagePlugin): boolean {
	if (kind == Kind.DailyNote && plugin.internalPlugins["daily-notes"]?.enabled) return true;
	
	const periodicNotes = plugin.communityPlugins["periodic-notes"];
	if (!periodicNotes) return false;
	
	if (isLegacyPeriodicNotes(periodicNotes)) {
		const adjective = PERIODIC_INFO[kind].adjective;
		return periodicNotes.settings[adjective]?.enabled;
	}
	else {
		const noun = PERIODIC_INFO[kind].noun;
		return periodicNotes?.calendarSetManager?.getActiveSet()[noun]?.enabled;
	}
}

function isLegacyPeriodicNotes(periodicNotes: Plugin): boolean {
	return (periodicNotes?.manifest.version || "0").startsWith("0");
}

export async function hasJournal(homepage: Homepage): Promise<boolean> { 
	const journals = getJournalsApi(homepage.plugin.app);
	if (!journals) return false;
	
	return (await journals.journalInfo(homepage.data.value)) !== null;
}

export async function getJournalNote(journalName: string, plugin: HomepagePlugin) {
	const journals = getJournalsApi(plugin.app)!;
	const { note } = await journals.ensureNote(journalName, "today", { confirm: false });
	
	return note.path.replace(/\.md$/, "");
}
