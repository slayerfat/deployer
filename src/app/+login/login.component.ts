import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlGroup, FormBuilder, Validators, AbstractControl } from '@angular/common';
import { AppStringsService } from '../shared/services/app-strings.service';
import { UserAuthService, FormErrorComponent, FormElement } from '../shared/';

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
  nameControl: AbstractControl;
  pwControl: AbstractControl;
  nameErrorElements: FormElement[] = [];
  pwErrorElements: FormElement[] = [];

  constructor(private userAuthService: UserAuthService,
              private appStrings: AppStringsService,
              private router: Router,
              private fb: FormBuilder,
              private strings: AppStringsService) {
    let brand = appStrings.brand;
    this.heading = `Login to ${brand}!`;

    this.form = fb.group({
      'name': ['', Validators.compose([
        Validators.required
      ])],
      'password': ['', Validators.required]
    });

    this.nameControl = this.form.controls['name'];
    this.pwControl = this.form.controls['password'];

    this.nameErrorElements = [
      {name: 'required', message: this.strings.validation.required.message}
    ];

    this.pwErrorElements = [
      {name: 'required', message: this.strings.validation.required.message}
    ];
  }

  onSubmit(data: any) {
    this.userAuthService.login(data.name, data.password).subscribe(result => {
      if (result) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit() {
  }
}
