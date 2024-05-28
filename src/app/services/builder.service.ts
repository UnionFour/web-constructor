import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class BuilderService {
    constructor(private http: HttpClient) {
    }

    private Build(organisation: string,
                  config: object,
                  ...files: File[]): void {

        let config_blob = new Blob([JSON.stringify(config, null, 2)], {
            type: "application/json",
        });

        const formData = new FormData();
        formData.append("organisation", organisation);
        formData.append("config", config_blob, "config.json");

        for (const file of files) {
            formData.append(file.name, file, file.name);
        }

        this.http.post('http://178.154.224.222:5282/build', formData);
    }
}