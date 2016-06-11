import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../services/user/auth-user.service';
import { AppStringsService } from '../services/strings/app-strings.service';
import { ControlGroup, FormBuilder, Validators, AbstractControl } from '@angular/common';
import { Validator } from '../shared/validator/validator';
import { FormErrorComponent } from '../shared/form-error/form-error.component';
import { FormElement } from '../shared/form-error/FormElement';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [FormErrorComponent],
})
export class LoginComponent implements OnInit {

  heading: string;
  form: ControlGroup;
  emailControl: AbstractControl;
  pwControl: AbstractControl;
  emailErrorElements: FormElement[] = [];
  pwErrorElements: FormElement[] = [];

  constructor(private authUserService: AuthUserService,
              private appStrings: AppStringsService,
              private router: Router,
              private fb: FormBuilder,
              private strings: AppStringsService) {
    let brand = appStrings.brand;
    this.heading = `Login to ${brand}!`;

    this.form = fb.group({
      'email': ['', Validators.compose([
        Validators.required,
        Validator.email
      ])],
      'password': ['', Validators.required]
    });

    this.emailControl = this.form.controls['email'];
    this.pwControl = this.form.controls['password'];

    this.emailErrorElements = [
      {name: 'required', message: this.strings.validation.required.message},
      {name: 'email', message: this.strings.validation.email.message}
    ];

    this.pwErrorElements = [
      {name: 'required', message: this.strings.validation.required.message}
    ];
  }

  onSubmit(data: any) {
    return console.log(data);
  }

  ngOnInit() {
  }
}
