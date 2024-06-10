import { Routes } from '@angular/router';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { AuthComponent } from "./auth/auth.component";

export const routes: Routes = [
    {
        path: '',
        component: SiteSettingsComponent,
    },
    {
        path: 'auth',
        component: AuthComponent
    }
];
