import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TUI_SANITIZER,
    TuiSvgModule,
    TuiDropdownModule,
    TuiButtonModule
} from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteSettingsModule } from './site-settings/site-settings.module';
import { TuiActiveZoneModule, TuiObscuredModule } from "@taiga-ui/cdk";
import { HttpClientModule } from "@angular/common/http";
import { BuilderService } from "./services/builder.service";
import { AuthComponent } from "./auth/auth.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [
        RouterOutlet,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        SiteSettingsModule,
        TuiSvgModule,
        TuiObscuredModule,
        TuiActiveZoneModule,
        TuiDropdownModule,
        TuiButtonModule,
        HttpClientModule,
        AuthComponent,
    ],
    providers: [
        {
            provide: TUI_SANITIZER, useClass: NgDompurifySanitizer
        },
        BuilderService,
    ]
})
export class AppComponent {
}
