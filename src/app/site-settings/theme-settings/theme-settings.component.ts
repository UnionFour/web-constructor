import { Component } from '@angular/core';
import { SettingsBaseComponent } from '../settings.base.component';
import { DefaultThemes, Theme } from '../../fixtures/themes.fixture';
import { defaultEditorColors } from '@tinkoff/tui-editor';
import { FormGroup, Validators } from "@angular/forms";
import { ThemeVariables } from "../../interfaces/site.interface";

@Component({
    selector: 'app-theme-settings',
    templateUrl: './theme-settings.component.html',
    styleUrls: ['./theme-settings.scss']
})
export class ThemeSettingsComponent extends SettingsBaseComponent {
    public themes: Theme[] = DefaultThemes;
    public curTheme: Theme = DefaultThemes[0];

    private customThemeName = 'Своя';
    private isThemeChanged = false;
    private isCustomTheme = false;

    readonly palette = defaultEditorColors;

    protected createForm(): FormGroup {
        return this.fb.group({
            backgroundColor: [this.site?.themeVariables.backgroundColor, {validators: [Validators.required]}],
            fontColor: [this.site?.themeVariables.fontColor, {validators: [Validators.required]}],
            accentColor: [this.site?.themeVariables.accentColor, {validators: [Validators.required]}],
        });
    }

    protected override saveSiteSettings(value: ThemeVariables): void {
        if (this.isThemeChanged) {
            this.isThemeChanged = false;
        } else {
            // изменение переменных не по теме
            if (!this.isCustomTheme) {
                this.isCustomTheme = true;
                const customTheme = {
                    name: this.customThemeName,
                    themeVariables: value
                }
                this.themes.push(customTheme);
                this.curTheme = customTheme;
            } else {
                this.themes[this.themes.length - 1].themeVariables = value;
            }
        }

        this.site.themeVariables = this.form.value;
    }

    public changeTheme(e: Theme) {
        this.isThemeChanged = true;
        this.form.patchValue(e.themeVariables);
    }
}
