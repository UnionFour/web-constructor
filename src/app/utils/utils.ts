import { AbstractControl, FormGroup } from "@angular/forms";

export function getAsFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
}
