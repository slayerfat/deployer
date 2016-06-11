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
    if (!control.value.match(/^123/)) {
      return {email: true};
    }
  }
}
