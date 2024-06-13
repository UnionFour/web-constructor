import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { Router } from "@angular/router";

class OutputAuthorization {
    public id: string = "";
    public companyName: string = "";
    public token: string = "";
    public isCouch: boolean = false;
    public isOrganizator: boolean = false;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    public isLoggedIn: boolean = false;
    private url: string = "http://51.250.64.227/auth";

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.checkLoggedIn();
    }

    public checkLoggedIn() {
        this.isLoggedIn = Boolean(localStorage.getItem('isAuth'));
    }

    public signIn(value: { email: string; password: string }): Observable<any> {
        return this.http.post<OutputAuthorization>(this.url + "/authorization", {
            email: value.email,
            password: value.password,
            isOrganizator: true,
            isCouch: false
        }).pipe(
            tap(() => {
                localStorage.setItem('isAuth', 'true');
                localStorage.setItem('email', value.email);
                this.checkLoggedIn();
            })
        );
    }

    public signUp(value: { email: string; password: string, login: string }): Observable<any> {
        return this.http.post<OutputAuthorization>(this.url + "/registration", {
            companyName: value.login,
            email: value.email,
            password: value.password,
            isOrganizator: true,
            isCouch: false
        }).pipe(
            tap(() => {
                localStorage.setItem('isAuth', 'true');
                localStorage.setItem('email', value.email);
                localStorage.setItem('login', value.login);
                this.checkLoggedIn();
            })
        );
    }

    public logOut(): void {
        localStorage.clear();
        this.isLoggedIn = false;
        this.router.navigate(['/reg']);
    }
}
