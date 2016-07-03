export interface Reportable {
  log(message: string, severity?: string, request?: Object, callback?: Function);

  /**
   * Lets the service handle the error, with optional request and callback.
   *
   * @param {Error} e
   * @param {Object} request
   * @param {Function} callback
   */
  handleError(e, request?: Object, callback?: Function);
}
