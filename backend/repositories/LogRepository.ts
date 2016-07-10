import * as mongoose from 'mongoose';
import { LogModelInterface } from '../models/logs/LogModelInterface';
import { Gettable } from './interfaces/Gettable';
import { Settable } from './interfaces/Settable';
import Log from '../models/logs/Log';
import { AbstractRepository } from './AbstractRepository';

export class LogRepository extends AbstractRepository implements Gettable, Settable {
  public getAll(): Promise<LogModelInterface[]> {
    return new Promise((resolve, reject) => {
      Log
        .find({})
        .sort({updatedAt: -1})
        .exec()
        .then((targets: LogModelInterface[]) => {
          return resolve(targets);
        }, err => {
          this.handleError('couldn\'t get logs index successfully.', err);

          reject(err);
        });
    });
  }

  public getOne(id: mongoose.Types.ObjectId): Promise<LogModelInterface> {
    return new Promise((resolve, reject) => {
      Log.findOne({_id: id}).exec().then((target: LogModelInterface) => {
        if (target) {
          return resolve(target);
        }

        reject({message: 'Log not found.'});
      }, err => {
        this.handleError('couldn\'t get log successfully.', err);

        reject(err);
      });
    });
  }

  public store(data: Object): Promise<LogModelInterface> {
    return new Promise((resolve, reject) => {
      Log.create(data).then(log => {
        resolve(log);
      }, err => {
        this.handleError('couldn\'t store log successfully.', err);

        reject(err);
      });
    });
  }

  public update(id: mongoose.Types.ObjectId): Promise<LogModelInterface> {
    // TODO implement
    return undefined;
  }
}
