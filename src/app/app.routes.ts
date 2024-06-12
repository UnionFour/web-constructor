import { Routes } from '@angular/router';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
    {
        path: '',
        component: SiteSettingsComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'auth',
        component: AuthComponent
    }
];
