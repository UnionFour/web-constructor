import { Component } from '@angular/core';
import { SettingsBaseComponent } from "../settings.base.component";
import { FormArray, FormGroup } from "@angular/forms";
import { getAsFormGroup } from "../../utils/utils";

@Component({
    selector: 'app-addresses-settings',
    templateUrl: './addresses-settings.component.html',
    styleUrls: ['./addresses-settings.scss']
})
export class AddressesSettingsComponent extends SettingsBaseComponent {
    public readonly getAsFormGroup = getAsFormGroup;

    public addressesFormArray: FormArray = new FormArray<any>([]);

    protected createForm(): FormGroup {
        const addressesFormArray = new FormArray<any>([]);
        this.site.addresses.addresses.forEach((address) => {
            const addressForm = this.fb.group({
                sportType: [address.sportType],
                address: [address.address]
            });
            addressesFormArray.push(addressForm);
        });
        this.addressesFormArray = addressesFormArray;

        return this.fb.group({
            title: this.site.addresses.title,
            addresses: addressesFormArray
        });
    }

    protected saveSiteSettings() {
        this.site.addresses = this.form.value;
    }

    public createAddress() {
        this.addressesFormArray.push(this.fb.group({
            sportType: '',
            address: ''
        }));
    }

    public deleteAddress(index: number) {
        this.addressesFormArray.removeAt(index);
    }
}
