import { Component, OnInit } from '@angular/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject, switchMap, tap } from 'rxjs';
import { defaultEditorTools, TuiEditorTool } from '@tinkoff/tui-editor';
import { SettingsBaseComponent } from "../settings.base.component";
import { getAsFormControl } from "../../utils/utils";

@Component({
    selector: 'app-main-settings',
    templateUrl: './main-settings.component.html',
    styleUrls: ['./main-settings.scss']
})
export class MainSettingsComponent extends SettingsBaseComponent implements OnInit {
    public getAsFormControl = getAsFormControl;

    // копипаста из документации тайги
    readonly tools: TuiEditorTool[] = defaultEditorTools;

    public rejectedFiles$ = new Subject<TuiFileLike | null>();
    public loadedFiles$!: Observable<any>;

    override ngOnInit() {
        super.ngOnInit();

        this.loadedFiles$ = getAsFormControl(this.form.get('img')).valueChanges.pipe(
            switchMap(file => (file ? of(file) : of(null))),
        );
    }

    protected createForm(): FormGroup {
        return this.fb.group({
            img: [this.site.main.img, {validators: [Validators.required]}],
            title: [this.site.main.title, {validators: [Validators.required]}],
            text: [this.site.main.text, {validators: [Validators.required]}],
        });
    }

    protected saveSiteSettings() {
        this.site.main = this.form.value;
    }

    onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles$.next(file as TuiFileLike);
    }

    removeFile(): void {
        getAsFormControl(this.form.get('img')).setValue(null);
    }

    clearRejected(): void {
        this.removeFile();
        this.rejectedFiles$.next(null);
    }
}
