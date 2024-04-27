import { Component } from '@angular/core';
import { SettingsBaseComponent } from "../settings.base.component";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { finalize, map, Observable, of, Subject, switchMap, timer } from "rxjs";
import { TuiFileLike } from "@taiga-ui/kit";
import { defaultEditorTools, TuiEditorTool } from "@tinkoff/tui-editor";
import { littleToolSet } from "../../fixtures/tui-editor-tools-set.fixture";

@Component({
    selector: 'app-news-settings',
    templateUrl: './news-settings.component.html',
    styleUrls: ['./news-settings.scss']
})
export class NewsSettingsComponent extends SettingsBaseComponent {
    readonly tools: TuiEditorTool[] = littleToolSet;

    protected createForm(): FormGroup {
        const form = this.fb.group({
            title: [this.site.news?.title],
            news: this.fb.array([])
        });

        this.site.news?.news.forEach((news) => {
            const newsForm = this.fb.group({
                img: [news.img],
                title: [news.title],
                text: [news.text]
            });
            (form.controls['news'] as FormArray).push(newsForm);
        });

        return form;
    }

    public createNews() {
        this.getNewsFormArray().push(this.fb.group({
            img: [''],
            title: [''],
            text: ['']
        }));
    }

    public deleteNews(index: number) {
        this.getNewsFormArray().removeAt(index);
    }

    protected saveSiteSettings(value: any) {
        this.site.news = this.form.value;
    }

    private getNewsFormArray() {
        return this.form.controls['news'] as FormArray;
    }

    public getNewsFormGroup(i: number) {
        return this.getNewsFormArray().controls[i] as FormGroup;
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

    protected readonly defaultEditorTools = defaultEditorTools;
}
