import { Component } from '@angular/core';
import { SettingsBaseComponent } from "../settings.base.component";
import { FormArray, FormGroup } from "@angular/forms";
import { getAsFormGroup } from "../../utils/utils";
import { littleToolSet } from "../../fixtures/tui-editor-tools-set.fixture";
import { TuiEditorTool } from "@tinkoff/tui-editor";
import { getAsFormControl } from "../../utils/utils";

@Component({
    selector: 'app-instructors-settings',
    templateUrl: './instructors-settings.component.html',
    styleUrls: ['./instructors-settings.scss']
})
export class InstructorsSettingsComponent extends SettingsBaseComponent {
    readonly tools: TuiEditorTool[] = littleToolSet;
    public readonly getAsFormGroup = getAsFormGroup;
    public readonly getAsFormControl = getAsFormControl;

    public instructorsFormArray: FormArray = new FormArray<any>([]);

    protected createForm(): FormGroup {
        const instructorsFormArray = new FormArray<any>([]);
        this.site.instructors.instructors.forEach((instructor) => {
            const instructorForm = this.fb.group({
                img: [instructor.img],
                name: [instructor.name],
                sportType: [instructor.sportType],
                info: [instructor.info]
            });
            instructorsFormArray.push(instructorForm);
        });
        this.instructorsFormArray = instructorsFormArray;

        return this.fb.group({
            title: this.site.instructors.title,
            instructors: instructorsFormArray
        });
    }

    protected saveSiteSettings(value: any) {
        this.site.instructors = this.form.value;
    }

    public createInstructor() {
        this.instructorsFormArray.push(this.fb.group({
            img: '',
            name: '',
            sportType: '',
            info: ''
        }));
    }

    public deleteInstructor(index: number) {
        this.instructorsFormArray.removeAt(index);
    }
}
