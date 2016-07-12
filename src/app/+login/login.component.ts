import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlGroup, FormBuilder, Validators, AbstractControl } from '@angular/common';
import { UserAuthService, FormErrorComponent, FormElement, AppStringsService } from '../shared/';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [FormErrorComponent],
})
export class LoginComponent {

  /**
   * The heading of the form.
   *
   * @type {string}
   */
  public heading: string;
  public form: ControlGroup;
  public nameControl: AbstractControl;
  public pwControl: AbstractControl;
  public nameErrorElements: FormElement[] = [];
  public pwErrorElements: FormElement[] = [];

  /**
   * Sets the error message when form submit fails.
   *
   * @type {{success: boolean, message: string}}
   */
  private submitError = {
    success: true,
    message: ''
  };

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

  public onSubmit(data: {name: string, password: string}) {
    this.userAuthService.login(data.name, data.password).subscribe((result: any) => {
      if (result && result.success === true) {
        return this.router.navigate(['/dashboard']);
      }

      this.submitError = result;
    });
  }
}
