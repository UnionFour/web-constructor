import { Injector, INJECTOR, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// tui
import { TuiDataListWrapperModule, TuiInputFilesModule, TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import { TUI_SANITIZER, TuiButtonModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputColorModule } from '@tinkoff/tui-editor';
import { TuiEditorModule, TUI_EDITOR_EXTENSIONS, TUI_EDITOR_DEFAULT_EXTENSIONS } from '@tinkoff/tui-editor';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

// components
import { ThemeSettingsComponent } from './theme-settings/theme-settings.component';
import { SiteSettingsComponent } from './site-settings.component';
import { MainSettingsComponent } from './main-settings/main-settings.component';
import { NewsSettingsComponent } from './news-settings/news-settings.component';
import { ServicesSettingsComponent } from './services-settings/services-settings.component';
import { AddressesSettingsComponent } from './addresses-settings/addresses-settings.component';
import { InstructorsSettingsComponent } from './instructors-settings/instructors-settings.component';
import { TuiValueChangesModule } from "@taiga-ui/cdk";

@NgModule({
    imports: [
        CommonModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListWrapperModule,
        FormsModule,
        TuiInputModule,
        TuiInputColorModule,
        TuiButtonModule,
        TuiInputFilesModule,
        TuiEditorModule,
        ReactiveFormsModule,
        TuiValueChangesModule,
        TuiSvgModule
    ],
    declarations: [
        SiteSettingsComponent,
        ThemeSettingsComponent,
        MainSettingsComponent,
        NewsSettingsComponent,
        ServicesSettingsComponent,
        AddressesSettingsComponent,
        InstructorsSettingsComponent
    ],
    providers: [
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer,
        },
        {
            provide: TUI_EDITOR_EXTENSIONS,
            deps: [INJECTOR],
            useFactory: (injector: Injector) => [
                ...TUI_EDITOR_DEFAULT_EXTENSIONS,
                import('@tinkoff/tui-editor/extensions/image-editor').then(({tuiCreateImageEditorExtension}) =>
                    tuiCreateImageEditorExtension({injector}),
                ),
            ],
        },
    ]
})
export class SiteSettingsModule {
}
