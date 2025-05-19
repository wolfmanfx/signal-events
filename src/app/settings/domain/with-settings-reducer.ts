import { signalStoreFeature } from "@ngrx/signals";
import { on, withReducer } from "@ngrx/signals/events";
import { settingsEvents } from "../api/settings-events";
import { settingsApiEvents } from "../api/settings-events";

export function withSettingsReducer() {
  return signalStoreFeature(
    withReducer(
      on(settingsEvents.themeChanged, ({ payload }) => ({
        theme: payload.theme,
      })),
      on(settingsEvents.notificationsChanged, ({ payload }) => ({
        notifications: payload.notificationsEnabled,
      })),
      on(settingsEvents.languageChanged, ({ payload }) => ({
        language: payload.language,
      })),
      on(settingsApiEvents.settingsSaved, () => ({
        lastUpdated: new Date().toISOString(),
      })),
      on(settingsApiEvents.settingsLoadFailed, ({ payload }) => ({
        errorMessage: payload.error,
      })),
      on(settingsApiEvents.settingsLoaded, ({ payload }) => payload.settings)
    )
  );
}