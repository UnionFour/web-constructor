import { Directive, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '../directives/destroyable.component';
import { SiteWithImagesInterface } from '../interfaces/site-with-images-interface';
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, skip, takeUntil, tap } from "rxjs";

@Directive()
export abstract class SettingsBaseComponent extends DestroyableComponent implements OnInit {
    @Input() public site!: SiteWithImagesInterface;

    public form: FormGroup = new FormGroup({});

    constructor(
        protected fb: FormBuilder
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.createForm();

        this.form.valueChanges.pipe(
            takeUntil(this.destroy$),
            distinctUntilChanged((prev, curr) => {
                return JSON.stringify(prev) == JSON.stringify(curr);
            }),
            debounceTime(500)
        ).subscribe(
            (value) => {
                this.saveSiteSettings(value);
            },
            (e) => console.log(e)
        );
    }

    protected abstract createForm(): FormGroup;

    protected abstract saveSiteSettings(value: any): void;
}
