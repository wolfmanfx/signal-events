import { signalStore, withHooks, withState } from "@ngrx/signals";
import { initialState, SettingsState } from "../api/settings-state";
import { settingsEvents } from "../api/settings-events";
import { injectDispatch } from "@ngrx/signals/events";
import { withThemeFeature } from "./with-theme-feature";
import { withSettingsPersistenceFeature } from "./with-settings-persistence-feature";
import { withSettingsReducer } from "./with-settings-reducer";
import { withMetaReducer, StoreType } from "./with-meta-reducer";

export const SettingsStore = signalStore(
  withState<SettingsState>(initialState),
  withSettingsReducer(),
  withThemeFeature(),
  withSettingsPersistenceFeature(),
  withMetaReducer<StoreType<SettingsState>>((ev, store) => {
    console.log(`MetaReducer: ${ev.type}`);
    console.log(store.theme());
  }),
  withHooks({
    onInit: () => {
      const dispatch = injectDispatch(settingsEvents);
      dispatch.loadSettings();
    },
  })
);
