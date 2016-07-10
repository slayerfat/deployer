import { reporter } from '../services/reporter/singleton';
import { winston } from '../services/winston';

export abstract class AbstractRepository {

  /**
   * Handles the errors when a model can not be accessed.
   *
   * @param {string} message
   * @param {Object} error
   * @param {any} error.message
   */
  protected handleError(message: string, error: {message: any}): void {
    winston.error(message, error.message);
    reporter.handleError(error);
  }
}
