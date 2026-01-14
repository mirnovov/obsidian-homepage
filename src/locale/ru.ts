import { Mode, Kind, Period, View } from "src/homepage";

export const RU: Record<string, string> = {
	//Mode enum
	[Mode.ReplaceAll]: "Заменить все открытые заметки",
	[Mode.ReplaceLast]: "Заменить последнюю заметку",
	[Mode.Retain]: "Оставить открытые заметки",
	
	//View enum
	//Строго по русской локализации Obsidian
	[View.Default]: "По умолчанию",
	[View.Reading]: "Просмотр",
	[View.Source]: "Просмотр исходного кода",
	[View.LivePreview]: "Динамический просмотр",
	
	//Kind enum
	//Термины согласованы с Obsidian
	[Kind.File]: "Файл",
	[Kind.Workspace]: "Рабочее пространство",
	[Kind.Random]: "Случайный файл",
	[Kind.RandomFolder]: "Случайный файл из папки",
	[Kind.NewNote]: "Новая заметка",
	[Kind.Graph]: "Граф",
	[Kind.None]: "Ничего",
	[Kind.Journal]: "Журнал",
	[Kind.DailyNote]: "Ежедневная заметка",
	[Kind.WeeklyNote]: "Еженедельная заметка",
	[Kind.MonthlyNote]: "Ежемесячная заметка",
	[Kind.YearlyNote]: "Ежегодная заметка",
	
	//Period enum
	[Period.Both]: "Оба варианта",
	[Period.Startup]: "Только при запуске",
	[Period.Manual]: "Только вручную",
	
	//Commands
	openHomepage: "Открыть домашнюю страницу",
	setToActiveFile: "Использовать активный файл",
	copyDebugInfo: "Скопировать отладочную информацию",
	
	//General UI messages
	pluginUnavailable: `Невозможно открыть домашнюю страницу: плагин недоступен.`,
	journalUnavailable: `Журнал \"?0\" не найден.`,
	workspaceUnavailable: `Рабочее пространство \"?0\" не найдено.`,
	noteUnavailable: `Файл \"?0\" не найден.`,
	homepageChanged: `Домашняя страница изменена на \"?0\".`,
	momentUpgradeNotice: `Заметки, зависящие от даты, удалены из Homepage. Используйте периодическую или ежедневную заметку.`,
	
	//Settings items
	openOnStartup: "Открывать при запуске",
	openOnStartupDesc: "Открывать домашнюю страницу при запуске Obsidian.",
	openOnStartupWarn: `Это переопределяет настройку файла по умолчанию.`,
	openWhenEmpty: "Открывать при отсутствии вкладок",
	openWhenEmptyDesc: "Открывать домашнюю страницу, если нет открытых вкладок.",
	alwaysApply: "Применять при обычном открытии",
	alwaysApplyDesc: "Применять настройки домашней страницы при открытии из ссылок или файлового браузера.",
	separateMobile: "Отдельная домашняя страница для мобильных устройств",
	separateMobileDesc: "Хранить домашнюю страницу для мобильных устройств и её настройки отдельно.",
	separateMobileWarnMobile: "<b>Мобильные настройки хранятся отдельно.</b> Изменения не повлияют на настольные устройства. Используйте настольное устройство для редактирования.",
	separateMobileWarnDesktop: "<b>Мобильные настройки хранятся отдельно.</b> Изменения не повлияют на мобильные устройства. Используйте мобильное устройство для редактирования.",
	
	commandsGroup: "Команды",
	commandsDesc: "Команды, выполняемые при открытии домашней страницы.",
	commandsAddButton: "Добавить...",
	commandUnavailable: "Команда не найдена и не будет выполнена. Возможно, соответствующий плагин отключен.",
	commandsReally: "Вы уверены?",
	
	vaultGroup: "Среда хранилища",
	openMode: "Способ открытия",
	openModeDesc: "Определяет, как обрабатываются открытые вкладки при запуске.",
	manualOpenMode: "Способ открытия вручную",
	manualOpenModeDesc: "Определяет, как обрабатываются открытые вкладки при открытии через команды или кнопку.",
	pin: "Закрепить",
	pinDesc: "Закрепить домашнюю страницу при открытии.",
	hideReleaseNotes: "Скрывать примечания к выпуску",
	hideReleaseNotesDesc: "Не показывать примечания к выпуску при обновлении Obsidian.",
	autoCreate: "Автоматическое создание",
	autoCreateDesc: "Если домашней страницы не существует, создает её.",
	autoCreateWarn: "При синхронизации через неофициальные сервисы возможна перезапись данных.",
	
	openingGroup: "Режим при открытии",
	view: "Режим домашней страницы",
	viewDesc: "Выберите режим открытия домашней страницы.",
	revertView: "Возвращать режим при закрытии",
	revertViewDesc: "Восстанавливать режим по умолчанию при уходе с домашней страницы.",
	autoScroll: "Авто-scroll",
	autoScrollDesc: "Прокручивать вниз и фокусироваться на последней строке при открытии.",
	refreshDataview: "Обновлять Dataview",
	refreshDataviewDesc: "Перезагружать представления Dataview при открытии домашней страницы.",
	refreshDataviewWarn: "Требуется включенное автообновление Dataview.",
		
	//Settings UI messages
	"FileDesc": "Укажите заметку, базу или canvas.",
	"WorkspaceDesc": "Укажите рабочее пространство Obsidian.",
	"New noteDesc": "Укажите префикс. При каждом запуске Obsidian будет создаваться новая заметка с этим префиксом.",
	"Graph viewDesc": "Будет использован граф.",
	"NothingDesc": "По умолчанию ничего не произойдет. Добавленные команды будут выполнены.",
	"Random fileDesc": "Будет выбран случайный файл из хранилища Obsidian.",
	"Random in folderDesc": "Укажите папку. Будет выбран случайный файл из неё.",
	"JournalDesc": "Укажите журнал.",
	"Daily noteDesc": "Будет использована ежедневная заметка.",
	"Weekly noteDesc": "Будет использована еженедельная заметка.",
	"Monthly noteDesc": "Будет использована ежемесячная заметка.",
	"Yearly noteDesc": "Будет использована ежегодная заметка.",
	homepageSettingTitle: "Homepage",
	pluginUnavailableSettings: `Необходимый плагин недоступен.`,
	copyDebugInfoNotice: "Отладочная информация домашней страницы скопирована в буфер обмена",
};

