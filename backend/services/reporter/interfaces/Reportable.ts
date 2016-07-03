export interface Reportable {
  log(message: string, severity?: string, request?: Object, callback?: Function);
}
