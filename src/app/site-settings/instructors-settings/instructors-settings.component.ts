import { Component } from '@angular/core';
import { SettingsBaseComponent } from "../settings.base.component";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { getAsFormGroup } from "../../utils/utils";
import { finalize, map, Observable, of, Subject, switchMap, timer } from "rxjs";
import { TuiFileLike } from "@taiga-ui/kit";
import { littleToolSet } from "../../fixtures/tui-editor-tools-set.fixture";
import { TuiEditorTool } from "@tinkoff/tui-editor";

@Component({
    selector: 'app-instructors-settings',
    templateUrl: './instructors-settings.component.html',
    styleUrls: ['./instructors-settings.scss']
})
export class InstructorsSettingsComponent extends SettingsBaseComponent {
    readonly tools: TuiEditorTool[] = littleToolSet;
    public readonly getAsFormGroup = getAsFormGroup;

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

    // копипаст из тайнги
    readonly control = new FormControl();

    readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
    readonly loadingFiles$ = new Subject<TuiFileLike | null>();
    readonly loadedFiles$ = this.control.valueChanges.pipe(
        switchMap(file => (file ? this.makeRequest(file) : of(null))),
    );

    onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles$.next(file as TuiFileLike);
    }

    removeFile(): void {
        this.control.setValue(null);
    }

    clearRejected(): void {
        this.removeFile();
        this.rejectedFiles$.next(null);
    }

    makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
        this.loadingFiles$.next(file);

        return timer(1000).pipe(
            map(() => {
                if (Math.random() > 0.5) {
                    return file;
                }

                this.rejectedFiles$.next(file);

                return null;
            }),
            finalize(() => this.loadingFiles$.next(null)),
        );
    }

    protected readonly littleToolSet = littleToolSet;
}
