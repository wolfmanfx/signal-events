export interface SettingsState {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  language: string;
  lastUpdated: string | null;
  errorMessage: string | null;
}

export const initialState: SettingsState = {
  theme: "light",
  notifications: false,
  language: "en",
  lastUpdated: null,
  errorMessage: null,
};
