import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }
        this.router.navigate(['reg']);
        return false;
    }

    canActivateChild( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        return this.canActivate(next, state);
    }
}
