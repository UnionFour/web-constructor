import { Component, OnInit } from '@angular/core';
import { SettingsBaseComponent } from '../settings.base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, map, Observable, of, Subject, switchMap, tap, timer } from 'rxjs';
import { TuiFileLike } from '@taiga-ui/kit';
import { getAsFormGroup } from '../../utils/utils';

@Component({
    selector: 'app-nav-settings',
    templateUrl: './nav-settings.component.html',
    styleUrls: ['./nav-settings.scss']
})
export class NavSettingsComponent extends SettingsBaseComponent implements OnInit {
    public readonly getAsFormGroup = getAsFormGroup;

    // копипаста из документации тайги
    public imageControl!: FormControl;
    public rejectedFiles$ = new Subject<TuiFileLike | null>();
    public loadingFiles$ = new Subject<TuiFileLike | null>();
    public loadedFiles$!: Observable<any>;

    override ngOnInit() {
        super.ngOnInit();

        this.imageControl = this.form.controls['logoImg'] as FormControl;
        this.loadedFiles$ = this.imageControl.valueChanges.pipe(
            tap((v) => console.log(v)),
            switchMap(file => (file ? this.makeRequest(file) : of(null))),
        );
    }

    protected createForm(): FormGroup {
        return this.fb.group({
            logoImg: [this.site.navigation.logoImg, {validators: [Validators.required]}],
            companyName: [this.site.navigation.companyName, {validators: [Validators.required]}],
            description: [this.site.navigation.description, {validators: [Validators.required]}],
            news: [this.site.navigation.news, {validators: [Validators.required]}],
            addresses: [this.site.navigation.addresses, {validators: [Validators.required]}],
            instructors: [this.site.navigation.instructors, {validators: [Validators.required]}],
            services: [this.site.navigation.services, {validators: [Validators.required]}],
        });
    }

    protected saveSiteSettings(value: any) {
        this.site.news = this.form.value;
    }

    // копипаст из тайнги
    onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles$.next(file as TuiFileLike);
    }

    removeFile(): void {
        this.imageControl.setValue(null);
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
}
