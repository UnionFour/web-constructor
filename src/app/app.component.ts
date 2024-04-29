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
        TuiButtonModule
    ],
    providers: [
        {
            provide: TUI_SANITIZER, useClass: NgDompurifySanitizer
        }
    ]
})
export class AppComponent {
    public open = false;

    public onClick(): void {
        this.open = !this.open;
    }

    public onObscured(obscured: boolean): void {
        if (obscured) {
            this.open = false;
        }
    }

    public onActiveZone(active: boolean): void {
        this.open = active && this.open;
    }
}
