import { Injector, INJECTOR, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// tui
import {
    TUI_DATE_TIME_VALUE_TRANSFORMER,
    TuiDataListWrapperModule,
    TuiInputDateModule, TuiInputDateTimeModule,
    TuiInputFilesModule,
    TuiInputModule, TuiInputNumberModule, TuiInputPhoneModule,
    TuiSelectModule
} from '@taiga-ui/kit';
import {
    TUI_SANITIZER,
    TuiButtonModule, TuiDropdownModule, TuiLoaderModule,
    TuiScrollbarModule,
    TuiSvgModule,
    TuiTextfieldControllerModule, TuiTooltipModule
} from '@taiga-ui/core';
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
import { TuiActiveZoneModule, TuiObscuredModule, TuiValueChangesModule } from "@taiga-ui/cdk";
import { NavSettingsComponent } from "./nav-settings/nav-settings.component";
import { NewDetailComponent } from "./new-detail/new-detail.component";
import { DateTransformerService } from "../services/date-transformer.service";

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
        TuiSvgModule,
        TuiScrollbarModule,
        TuiDropdownModule,
        TuiActiveZoneModule,
        TuiObscuredModule,
        TuiInputDateModule,
        TuiInputDateTimeModule,
        TuiTooltipModule,
        TuiInputNumberModule,
        TuiInputPhoneModule,
        TuiLoaderModule
    ],
    declarations: [
        SiteSettingsComponent,
        ThemeSettingsComponent,
        MainSettingsComponent,
        NewsSettingsComponent,
        ServicesSettingsComponent,
        AddressesSettingsComponent,
        InstructorsSettingsComponent,
        NavSettingsComponent,
        NewDetailComponent
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
        {
            provide: TUI_DATE_TIME_VALUE_TRANSFORMER,
            useClass: DateTransformerService,
        },
    ]
})
export class SiteSettingsModule {
}
