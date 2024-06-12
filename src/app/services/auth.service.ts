import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
    public isLoggedIn: boolean = false;

    constructor(
        private router: Router
    ) {
        this.checkLoggedIn();
    }

    public checkLoggedIn() {
        this.isLoggedIn = Boolean(localStorage.getItem('isAuth'));
    }

    public signIn(): Observable<any> {
        return of(true);
    }

    public signUp(): Observable<any> {
        return of(true);
    }

    public logOut(): void {
        localStorage.removeItem('isAuth');
        this.isLoggedIn = false;
        this.router.navigate(['/auth']);
    }
}
