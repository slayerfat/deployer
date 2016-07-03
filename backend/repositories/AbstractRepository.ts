import { reporter } from '../services/reporter/singleton';
import { winston } from '../services/winston';

// TODO check if extends bug fails again, ReferenceError: __extends is not defined, cant inherit.
export class AbstractRepository {

  /**
   * Handles the errors when a model can not be accessed.
   *
   * @param {string} message
   * @param {Object} error
   * @param {any} error.message
   */
  public static handleError(message: string, error: {message: any}): void {
    winston.error(message, error.message);
    reporter.handleError(error);
  }
}
