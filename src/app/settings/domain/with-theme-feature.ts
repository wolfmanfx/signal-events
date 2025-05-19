import { inject } from "@angular/core";
import { Events } from "@ngrx/signals/events";
import { signalStoreFeature } from "@ngrx/signals";
import { withEffects } from "@ngrx/signals/events";
import { settingsApiEvents } from "../api/settings-events";
import { map } from "rxjs";

export function withThemeFeature() {
  return signalStoreFeature(
    withEffects(
      (store, events = inject(Events)) => ({
        loadTheme$: events.on(
          settingsApiEvents.settingsSaved,
          settingsApiEvents.settingsLoaded).pipe(
          map(({ payload }) => document.documentElement.setAttribute('data-theme', payload.settings.theme))
        ),
      })
    )
  )
}