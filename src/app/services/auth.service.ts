import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {
    }

    public signIn(): Observable<any> {
        return of(true);
    }

    public signUp(): Observable<any> {
        return of(true);
    }
}
