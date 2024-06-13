import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable()
export class BuilderService {
    constructor(private http: HttpClient) {
    }

    public build(organisation: string,
                 config: object,
                 files: File[]): Observable<any> {

        let config_blob = new Blob([JSON.stringify(config, null, 2)], {
            type: "application/json",
        });

        const formData = new FormData();
        formData.append("organisation", organisation);
        formData.append("config", config_blob, "config.json");

        for (const file of files) {
            formData.append(file.name, file, file.name);
        }

        return this.http.post(
            'http://51.250.64.227/build',
            formData,
            {
                headers: new HttpHeaders({ timeout: `${600000}` })
            }
        ).pipe(
            tap(() => {
                window.open(`http://51.250.64.227/${organisation}`, "_blank");
            })
        );
    }
}
