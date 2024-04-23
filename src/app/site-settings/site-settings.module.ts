import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { ThemeSettingsComponent } from './theme-settings/theme-settings.component';
import { SiteSettingsComponent } from './site-settings.component';
import { MainSettingsComponent } from './main-settings/main-settings.component';
import { NewsSettingsComponent } from './news-settings/news-settings.component';
import { ServicesSettingsComponent } from './services-settings/services-settings.component';
import { AddressesSettingsComponent } from './addresses-settings/addresses-settings.component';
import { InstructorsSettingsComponent } from './instructors-settings/instructors-settings.component';
import { TuiDataListWrapperModule, TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListWrapperModule,
        FormsModule,
        TuiInputModule
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

    ]
})
export class SiteSettingsModule {}
