import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, Control } from '@angular/common';
import { FormElement } from './FormElement';

@Component({
  moduleId: module.id,
  selector: 'app-form-error',
  templateUrl: 'form-error.component.html',
  styleUrls: ['form-error.component.css'],
})
export class FormErrorComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() errorElements: FormElement[] = [];

  constructor() {
    this.control = new Control();
  }

  ngOnInit() {
  }
}
