import { Injectable } from '@angular/core';
import { Control } from '@angular/common';

@Injectable()
export class Validator {

  constructor() {}

  /**
   * Checks the value and returns true if is invalid.
   *
   * @param control
   * @returns {{email: boolean}}
   */
  public static email(control: Control): { [s: string]: boolean } {
    /* tslint:disable:max-line-length */
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!control.value.match(regex)) {
      return {email: true};
    }
  }
}
