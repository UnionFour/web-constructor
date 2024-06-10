import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { NgIf, NgTemplateOutlet } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiInputModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.scss'],
    standalone: true,
    imports: [
        HttpClientModule,
        NgTemplateOutlet,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        NgIf
    ],
    providers: [
        AuthService
    ]
})
export class AuthComponent implements OnInit {
    public isAuth: boolean = true;
    public loading: boolean = false;

    public signInForm!: FormGroup;
    public signUpForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.initForms();
    }

    ngOnInit() {
    }

    public signIn() {
        if (this.signInForm.invalid) {
            this.signInForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.authService.signIn().subscribe(
            (v) => {
                this.loading = false;
                console.log(v);
            },
            (e) => {
                this.loading = false;
                console.log(e);
            }
        )
    }

    public signUp() {
        if (this.signUpForm.invalid) {
            this.signUpForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.authService.signUp().subscribe(
            (v) => {
                this.loading = false;
                console.log(v);
            },
            (e) => {
                this.loading = false;
                console.log(e);
            }
        )
    }

    public toggle() {
        this.signInForm.reset();
        this.signUpForm.reset();
        this.isAuth = !this.isAuth;
    }

    private initForms() {
        this.signInForm = this.fb.group({
            email: ['', {validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30),
                    Validators.email
                ]}],
            password: ['', {validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                ]}],
        });

        this.signUpForm = this.fb.group({
            companyName: ['', {validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30),
                ]}],
            email: ['', {validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30),
                    Validators.email
                ]}],
            password: ['', {validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                ]}],
        });
    }
}
