import { inject } from "@angular/core";
import { signalStoreFeature, type } from "@ngrx/signals";
import { Events, withEffects } from "@ngrx/signals/events";
import { initialState, SettingsState } from "../api/settings-state";
import { exhaustMap } from "rxjs";
import { of } from "rxjs";
import { settingsApiEvents, settingsEvents } from "../api/settings-events";
import { map } from "rxjs";
import { LocalStorageService } from "../../shared/local-storage.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function withSettingsPersistenceFeature<_>() {
  return signalStoreFeature(
    {
      state: type<SettingsState>(),
    },
    withEffects(
      (
        store,
        events = inject(Events),
        localStorage = inject(LocalStorageService)
      ) => ({
        loadSettings$: events.on(settingsEvents.loadSettings).pipe(
          exhaustMap(() => of(localStorage.getItem<SettingsState>("settings"))),
          map((settings) => {
            if (settings == null) {
              localStorage.setItem("settings", initialState);
              settings = initialState;
            }
            return settingsApiEvents.settingsLoaded({ settings });
          })
        ),

        saveSettings$: events.on(settingsEvents.saveSettings).pipe(
          exhaustMap(() =>
            of(
              localStorage.setItem("settings", {
                theme: store.theme(),
                notifications: store.notifications(),
                language: store.language(),
                lastUpdated: new Date().toISOString(),
              })
            )
          ),
          map(() =>
            settingsApiEvents.settingsSaved({
              settings: {
                theme: store.theme(),
                notifications: store.notifications(),
                language: store.language(),
                lastUpdated: new Date().toISOString(),
              },
            })
          )
        ),
      })
    )
  );
}
