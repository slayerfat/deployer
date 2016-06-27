import { Component, Input } from '@angular/core';
import { AbstractControl, Control } from '@angular/common';
import { FormElement } from './FormElement';

@Component({
  moduleId: module.id,
  selector: 'app-form-error',
  templateUrl: 'form-error.component.html',
  styleUrls: ['form-error.component.css'],
})
export class FormErrorComponent {
  @Input() public control: AbstractControl;
  @Input() public errorElements: FormElement[] = [];

  constructor() {
    this.control = new Control();
  }
}
