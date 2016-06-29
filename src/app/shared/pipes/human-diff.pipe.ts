import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'humanDiff'})
export class HumanDiff implements PipeTransform {

  /**
   * Changes a date to human readable.
   *
   * @param {string} value
   * @param {boolean} withoutSuffix if is set, it will not print the suffix
   * @returns {string}
   */
  public transform(value: string, withoutSuffix?: boolean): any {
    withoutSuffix = withoutSuffix || false;
    return moment(value).fromNow(withoutSuffix);
  }
}
