import { type } from "@ngrx/signals";
import { eventGroup } from "@ngrx/signals/events";
import { SettingsState } from "./settings-state";

export const settingsEvents = eventGroup({
  source: "Settings",
  events: {
    themeChanged: type<{ theme: "light" | "dark" | "system" }>(),
    notificationsChanged: type<{ notificationsEnabled: boolean }>(),
    languageChanged: type<{ language: string }>(),
    loadSettings: type<void>(),
    saveSettings: type<void>(),
  },
});

export const settingsApiEvents = eventGroup({
  source: "SettingsApi",
  events: {
    settingsLoadFailed: type<{ error: string }>(),
    settingsSaved: type<{ settings: Omit<SettingsState, "errorMessage"> }>(),
    settingsLoaded: type<{ settings: Omit<SettingsState, "errorMessage"> }>(),
  },
});
