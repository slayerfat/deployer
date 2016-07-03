import { Reportable } from './interfaces/Reportable';
import { Rollbar, RollbarOptions } from '../interfaces/Rollbar';

export class RollbarService implements Reportable {

  private service: Rollbar;

  /**
   * We need to make sure that the service is initialized in the constructor.
   *
   * @param options
   */
  constructor(options: {service: Rollbar, token: string, rollbarOptions?: RollbarOptions}) {
    const {token, rollbarOptions} = options;
    this.service = options.service;
    this.service.init(token, rollbarOptions);
  }

  public log(message: string, severity: string) {
    this.service.reportMessage(message, severity);
  }
}
