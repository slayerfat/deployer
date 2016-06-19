import * as mongoose from 'mongoose';
import { Gettable } from './interfaces/Gettable';
import User from '../models/users/User';
import { UserModelInterface } from '../models/users/UserModelInterface';

export class UserRepository implements Gettable {
  getAll(): Promise<mongoose.Document[]> {
    return undefined;
  }

  getOne(id: mongoose.Types.ObjectId): Promise<mongoose.Document> {
    return undefined;
  }

  /**
   * Gets the current user.
   *
   * @returns {Promise<UserModelInterface>}
   */
  public static getCurrent() {
    // TODO: get the real current user.
    return new Promise<UserModelInterface>((resolve, reject) => {
      User.findOne().exec().then(user => {
        console.log('user found!');
        resolve(user);
      }, err => {
        console.log(err);
        console.log('error retrieving current user!');

        reject(err);
      });
    });
  }
}
