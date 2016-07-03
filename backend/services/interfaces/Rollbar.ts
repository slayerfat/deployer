export interface Rollbar {
  init(token: string, options: RollbarOptions);
  reportMessage(message: string, severity?: string, request?: Object, callback?: Function);
  handleError(e, request?: Object, callback?: Function);
}

export interface RollbarOptions {
  branch?: string;
  codeVersion?: string;
  endpoint?: string; // 'https://api.rollbar.com/api/1/'
  environment?: string; // 'unspecified'
  host?: string;
  root?: string;
  scrubFields?: string[]; // 'passwd', 'password', 'secret', 'confirm_password', 'password_confirmation'
  scrubHeaders?: string[];
  Default?: boolean;
  minimumLevel?: string;
  enabled?: boolean;
}
