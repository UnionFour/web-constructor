import { Component } from '@angular/core';
import { SettingsBaseComponent } from '../settings.base.component';
import { DefaultThemes, Theme } from '../../fixtures/themes.fixture';

@Component({
    selector: 'app-theme-settings',
    templateUrl: './theme-settings.component.html',
    styleUrls: ['./theme-settings.scss']
})
export class ThemeSettingsComponent extends SettingsBaseComponent {
    public defaultThemes: Theme[] = DefaultThemes;

    public value: Theme = DefaultThemes[0];
}
