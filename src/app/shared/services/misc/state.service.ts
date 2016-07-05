import { Injectable } from '@angular/core';

@Injectable()
export class StateService {

  private internal: Array<any>;

  // Already return a `clone` of the current `state`
  public get state() {
    return this.clone(this.internal);
  }

  /**
   * Gets data from the internal state.
   *
   * @param {any=} prop
   * @returns {any}
   */
  public get(prop?: any) {
    // Use our `state` getter for the `clone`
    return this.state[prop] || this.state;
  }

  /**
   * Sets data to the internal state.
   *
   * @param {string} prop
   * @param {any} value
   * @returns {any}
   */
  public set(prop: string, value: any) {
    return this.internal[prop] = value;
  }

  /**
   * Makes a crude copy of an object.
   *
   * @param {Object} object
   * @returns {Object}
   */
  private clone(object: Object) {
    // Simple object `clone`
    return JSON.parse(JSON.stringify(object));
  }
}
