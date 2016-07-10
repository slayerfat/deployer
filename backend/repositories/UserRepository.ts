import * as mongoose from 'mongoose';
import { Gettable } from './interfaces/Gettable';
import User from '../models/users/User';
import { UserModelInterface } from '../models/users/UserModelInterface';
import { AbstractRepository } from './AbstractRepository';
import { reporter } from '../services/reporter/singleton';
import { winston } from '../services/winston';

export class UserRepository extends AbstractRepository implements Gettable {

  /**
   * Gets the current user.
   *
   * @returns {Promise<UserModelInterface>}
   */
  public static getCurrent() {
    // TODO: get the real current user.
    return new Promise<UserModelInterface>((resolve, reject) => {
      User.findOne().exec().then(user => {
        resolve(user);
      }, err => {
        winston.error('couldn\'t get current user successfully.', err.message);
        reporter.handleError(err);

        reject(err);
      });
    });
  }

  // TODO: get users
  public getAll(): Promise<mongoose.Document[]> {
    return undefined;
  }

  // TODO: get one user
  public getOne(id: mongoose.Types.ObjectId): Promise<mongoose.Document> {
    return undefined;
  }
}
