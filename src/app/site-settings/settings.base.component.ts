import { Directive, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '../directives/destroyable.component';
import { SiteInterface } from '../interfaces/site.interface';
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime, takeUntil } from "rxjs";

@Directive()
export abstract class SettingsBaseComponent extends DestroyableComponent implements OnInit {
    @Input() public site!: SiteInterface;

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
            debounceTime(500)
        ).subscribe(
            (value) => this.saveSiteSettings(value),
            (e) => console.log(e)
        );
    }

    protected abstract createForm(): FormGroup;

    protected abstract saveSiteSettings(value: any): void;
}
