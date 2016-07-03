import * as mongoose from 'mongoose';
import { Gettable } from './interfaces/Gettable';
import User from '../models/users/User';
import { UserModelInterface } from '../models/users/UserModelInterface';
import { reporter } from '../services/reporter/singleton';

export class UserRepository implements Gettable {

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
