import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";

class OutputAuthorization {
  public id: string = "";
  public login: string = "";
  public token: string = "";
  public isCouch: boolean = false;
  public isOrganizator: boolean = false;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    public isLoggedIn: boolean = false;
    private url: string = "http://localhost:5282/auth";

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.checkLoggedIn();
    }

    public checkLoggedIn() {
        this.isLoggedIn = Boolean(localStorage.getItem('isAuth'));
    }

    public signIn(): Observable<any> {

        this.http.post<OutputAuthorization>(this.url + "/authorization", {
            email: "dub@db.ru",
            password: "string",
            isOrganizator: true,
            isCouch: true
        }).subscribe(value => console.log(value));

        return of(true);
    }

    public signUp(): Observable<any> {
        this.http.post<OutputAuthorization>(this.url + "/registration", {
            email: "dub@db.ru",
            password: "string",
            isOrganizator: true,
            isCouch: true
        }).subscribe(value => console.log(value));

        return of(true);
    }

    public logOut(): void {
        localStorage.removeItem('isAuth');
        this.isLoggedIn = false;
        this.router.navigate(['/auth']);
    }
}
