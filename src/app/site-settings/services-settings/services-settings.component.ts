import { Component } from '@angular/core';
import { SettingsBaseComponent } from "../settings.base.component";
import { FormArray, FormGroup } from "@angular/forms";
import { getAsFormGroup } from "../../utils/utils";

@Component({
    selector: 'app-services-settings',
    templateUrl: './services-settings.component.html',
    styleUrls: ['./services-settings.scss']
})
export class ServicesSettingsComponent extends SettingsBaseComponent {
    public readonly getAsFormGroup = getAsFormGroup;

    public servicesFormArray: FormArray = new FormArray<any>([]);

    protected createForm(): FormGroup {
        const servicesFormArray = new FormArray<any>([]);
        this.site.services.services.forEach((service) => {
            const serviceForm = this.fb.group({
                sportType: [service.sportType],
                text: [service.text],
                address: [service.address],
                buttonWording: [service.buttonWording]
            });
            servicesFormArray.push(serviceForm);
        });
        this.servicesFormArray = servicesFormArray;

        return this.fb.group({
            title: this.site.services.title,
            services: servicesFormArray
        });
    }

    protected saveSiteSettings() {
        this.site.services = this.form.value;
    }

    public createService() {
        this.servicesFormArray.push(this.fb.group({
            sportType: '',
            text: '',
            address: '',
            buttonWording: 'Записаться'
        }));
    }

    public deleteService(index: number) {
        this.servicesFormArray.removeAt(index);
    }
}
