import { Component, OnInit } from '@angular/core';
import { SettingsBaseComponent } from '../settings.base.component';
import { FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject, switchMap, tap } from 'rxjs';
import { TuiFileLike } from '@taiga-ui/kit';
import { getAsFormControl } from "../../utils/utils";

@Component({
    selector: 'app-nav-settings',
    templateUrl: './nav-settings.component.html',
    styleUrls: ['./nav-settings.scss']
})
export class NavSettingsComponent extends SettingsBaseComponent implements OnInit {
    public getAsFormControl = getAsFormControl;

    public rejectedFiles$ = new Subject<TuiFileLike | null>();
    public loadedFiles$!: Observable<any>;

    override ngOnInit() {
        super.ngOnInit();

        this.loadedFiles$ = getAsFormControl(this.form.get('logoImg')).valueChanges.pipe(
            switchMap(file => (file ? of(file) : of(null))),
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
        this.site.navigation = this.form.value;
    }

    onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles$.next(file as TuiFileLike);
    }

    removeFile(): void {
        getAsFormControl(this.form.get('logoImg')).setValue(null);
    }

    clearRejected(): void {
        this.removeFile();
        this.rejectedFiles$.next(null);
    }
}
