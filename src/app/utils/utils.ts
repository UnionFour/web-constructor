import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export function getAsFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
}

export function getAsFormControl(control: any): FormControl {
    return control as FormControl;
}
