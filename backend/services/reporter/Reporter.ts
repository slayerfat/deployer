import { Reportable } from './interfaces/Reportable';

export class Reporter {
  constructor(private service: Reportable) {
  }

  /**
   * Sends a log message to the service provider.
   *
   * @param {string} message
   * @param {string} severity
   * @param {Object} request
   * @param {Function} callback
   */
  public log(message: string, severity?: string, request?: Object, callback?: Function) {
    this.service.log(message, severity, request, callback);
  }

  /**
   * Lets the service handle the error, with optional request and callback.
   *
   * @param {Error} e
   * @param {Object} request
   * @param {Function} callback
   */
  public handleError(e, request?: Object, callback?: Function) {
    this.service.handleError(e, request, callback);
  }
}
