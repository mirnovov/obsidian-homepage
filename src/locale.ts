import { EN } from "./locale/en";

type LocaleData = Partial<typeof EN>;

const LOCALE_DATA: { [k: string]: LocaleData } = {
	"en": EN
}

let activeLocale: LocaleData | undefined = undefined;
let hasChosenLocale = false;

export function tr(phrase: string, ...replacements: string[]): string {
	if (!hasChosenLocale) {
		let langCode = localStorage.getItem("language")
			?.toLowerCase()
			?.split("-")[0] || "en";
			
		activeLocale = LOCALE_DATA[langCode];
		hasChosenLocale = true;
	}
	
	phrase = activeLocale?.[phrase] || EN[phrase];
	let i = 0
	
	for (const r of replacements) {
		phrase = phrase.replace("?" + i, r);
		i++
	}
	
	return phrase;
}
