import { Component } from '@angular/core';
import { SettingsComponent } from './settings/feature-settings/settings.component';

@Component({
  selector: 'app-root',
  imports: [SettingsComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'signal-events';
}
