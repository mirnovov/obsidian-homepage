import { moment } from "obsidian";
import HomepagePlugin from "./main";
import { Kind } from "./homepage";
import { trimFile } from "./utils";
import { 
	createDailyNote, getDailyNote, getAllDailyNotes,
  	createWeeklyNote, getMonthlyNote, getAllMonthlyNotes,
  	createMonthlyNote, getWeeklyNote, getAllWeeklyNotes,
  	createYearlyNote, getYearlyNote, getAllYearlyNotes  	
} from "obsidian-daily-notes-interface";

interface KindInfo {
	noun: string,
	adjective: string,
	create: Function,
	get: Function,
	getAll: Function
}

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

export async function getPeriodicNote(kind: Kind): Promise<string> {
	let info = PERIODIC_INFO[kind],
		date = moment().startOf(info.noun as any),
		all = info.getAll(),
		note;
	
	if (!Object.keys(all).length) {
		note = await info.create(date);	
	}
	else {
		note = info.get(date, all) || await info.create(date);	
	}
	
	return trimFile(note);

}

export function hasRequiredPeriodicity(plugin: HomepagePlugin, kind: Kind): boolean {
	if (kind == Kind.DailyNote && plugin.internalPlugins["daily-notes"]?.enabled) return true;
	else if (!("periodic-notes" in plugin.communityPlugins)) return false; 
	
	const adjective = PERIODIC_INFO[kind].adjective;
	return plugin.communityPlugins["periodic-notes"].settings[adjective]?.enabled;
}

export function getAutorun(plugin: HomepagePlugin): any { 
	const dailyNotes = plugin.internalPlugins["daily-notes"];
	return dailyNotes?.enabled && dailyNotes?.instance.options.autorun; 
};