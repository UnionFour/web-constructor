import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteSettingsModule } from './site-settings/site-settings.module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [
        RouterOutlet,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        SiteSettingsModule
    ],
    providers: [
        {
            provide: TUI_SANITIZER, useClass: NgDompurifySanitizer
        }
    ]
})
export class AppComponent {
}
