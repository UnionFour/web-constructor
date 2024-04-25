import { Component } from '@angular/core';
import { SettingsBaseComponent } from '../settings.base.component';
import { DefaultThemes, Theme } from '../../fixtures/themes.fixture';
import { defaultEditorColors } from '@tinkoff/tui-editor';

@Component({
    selector: 'app-theme-settings',
    templateUrl: './theme-settings.component.html',
    styleUrls: ['./theme-settings.scss']
})
export class ThemeSettingsComponent extends SettingsBaseComponent {
    public defaultThemes: Theme[] = DefaultThemes;

    public value: Theme = DefaultThemes[0];
    public backgroundColor = DefaultThemes[0].themeVariables.backgroundColor;
    public fontColor = DefaultThemes[0].themeVariables.fontColor;
    public accentColor = DefaultThemes[0].themeVariables.accentColor;

    readonly palette = defaultEditorColors;
}
