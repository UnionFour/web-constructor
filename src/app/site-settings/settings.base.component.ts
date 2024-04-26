import { Directive, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '../directives/destroyable.component';
import { SiteInterface } from '../interfaces/site.interface';
import { FormBuilder, FormGroup } from "@angular/forms";

@Directive()
export abstract class SettingsBaseComponent extends DestroyableComponent implements OnInit {
    @Input() public site?: SiteInterface;

    public form: FormGroup = new FormGroup({});

    constructor(
        protected fb: FormBuilder
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.createForm();
    }

    public abstract createForm(): FormGroup;
}
