import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core"
import { SettingsStore } from "./domain/settings-store";

export function provideSettings() : EnvironmentProviders {
  return makeEnvironmentProviders([
    SettingsStore
  ]);
}