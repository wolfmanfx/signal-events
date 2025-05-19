import { signalStore, withHooks, withState } from "@ngrx/signals";
import { initialState, SettingsState } from "../api/settings-state";
import { settingsEvents } from "../api/settings-events";
import { injectDispatch } from "@ngrx/signals/events";
import { withThemeFeature } from "./with-theme-feature";
import { withSettingsPersistenceFeature } from "./with-settings-persistence-feature";
import { withSettingsReducer } from "./with-settings-reducer";

export const SettingsStore = signalStore(
  withState<SettingsState>(initialState),
  withSettingsReducer(),
  withThemeFeature(),
  withSettingsPersistenceFeature(),
  withHooks({
    onInit: () => {
      const dispatch = injectDispatch(settingsEvents);
      dispatch.loadSettings();
    },
  })
);
