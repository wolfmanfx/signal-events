import { Component, inject } from "@angular/core";
import { SettingsStore } from "../domain/settings-store";
import { injectDispatch } from "@ngrx/signals/events";
import { FormsModule } from "@angular/forms";
import { settingsEvents } from "../api/settings-events";
@Component({
  selector: "app-settings",
  imports: [FormsModule],
  template: `
    <div class="modal-box w-full max-w-md">
      <h3 class="font-bold text-lg mb-4">Settings</h3>
      <form class="space-y-4">
        <!-- Theme Selection -->
        <fieldset>
          <legend class="label font-semibold">Theme</legend>
          <div class="flex gap-4">
            <label
              class="cursor-pointer flex items-center gap-2"
              for="theme-light"
            >
              <input
                type="radio"
                id="theme-light"
                name="theme"
                class="radio radio-primary"
                value="light"
                [ngModel]="store.theme()"
                (ngModelChange)="onThemeChange($event)"
              />
              <span>Light</span>
            </label>
            <label
              class="cursor-pointer flex items-center gap-2"
              for="theme-dark"
            >
              <input
                type="radio"
                id="theme-dark"
                name="theme"
                class="radio radio-primary"
                value="dark"
                [ngModel]="store.theme()"
                (ngModelChange)="onThemeChange($event)"
              />
              <span>Dark</span>
            </label>
            <label
              class="cursor-pointer flex items-center gap-2"
              for="theme-system"
            >
              <input
                type="radio"
                id="theme-system"
                name="theme"
                class="radio radio-primary"
                value="system"
                [ngModel]="store.theme()"
                (ngModelChange)="onThemeChange($event)"
              />
              <span>System</span>
            </label>
          </div>
        </fieldset>
        <!-- Notifications Toggle -->
        <div class="flex items-center justify-between">
          <label class="label font-semibold" for="notifications"
            >Enable Notifications</label
          >
          <input
            id="notifications"
            type="checkbox"
            class="toggle toggle-primary"
            name="notifications"
            [ngModel]="store.notifications()"
            (ngModelChange)="onNotificationsChange($event)"
          />
        </div>
        <!-- Language Dropdown -->
        <div>
          <label class="label font-semibold" for="language">Language</label>
          <select id="language" class="select select-bordered w-full"
            name="language"
            [ngModel]="store.language()"
            (ngModelChange)="onLanguageChange($event)">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
          </select>
        </div>
        <!-- Error Message -->
        @if(store.errorMessage() !== null) {
        <div class="mt-2">
          <div class="alert alert-error py-2 px-4 text-sm">
            <span>{{ store.errorMessage() }}</span>
          </div>
        </div>
        }
        <!-- Last Updated -->
        @if(store.lastUpdated() !== null) {
        <div class="text-xs text-right text-gray-400 mt-2">
          Last updated:
          {{ store.lastUpdated() }}
        </div>
        }
        <!-- Actions -->
        <div class="modal-action">
          <label for="settings-modal" class="btn">Close</label>
          <button type="submit" class="btn btn-primary" (click)="onSave()">Save</button>
        </div>
      </form>
    </div>
  `,
})
export class SettingsComponent {
  protected readonly store = inject(SettingsStore);
  protected readonly dispatch = injectDispatch(settingsEvents);

  onThemeChange(theme: 'light' | 'dark' | 'system') {
    this.dispatch.themeChanged({ theme });
  }

  onNotificationsChange(notifications: boolean) {
    this.dispatch.notificationsChanged({ notificationsEnabled: notifications });
  }

  onLanguageChange(language: string) {
    this.dispatch.languageChanged({ language });
  }

  onSave() {
    this.dispatch.saveSettings();
  }
}
