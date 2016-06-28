import * as mongoose from 'mongoose';
import { LogModelInterface } from '../models/logs/LogModelInterface';
import { Gettable } from './interfaces/Gettable';
import { Settable } from './interfaces/Settable';
import Log from '../models/logs/Log';

export class LogRepository implements Gettable, Settable {
  public getAll(): Promise<LogModelInterface[]> {
    return new Promise((resolve, reject) => {
      Log
        .find({})
        .sort({updatedAt: -1})
        .exec()
        .then((targets: LogModelInterface[]) => {
          return resolve(targets);
        }, err => {
          console.log(err);

          return reject(err);
        });
    });
  }

  public getOne(id: mongoose.Types.ObjectId): Promise<LogModelInterface> {
    return new Promise((resolve, reject) => {
      Log.findOne({_id: id}).exec().then((target: LogModelInterface) => {
        if (target) {
          return resolve(target);
        }

        return reject();
      }, err => {
        console.log(err);

        return reject(err);
      });
    });
  }

  public store(data: Object): Promise<LogModelInterface> {
    return new Promise((resolve, reject) => {
      Log.create(data).then(log => {
        resolve(log);
      }, err => {
        // TODO: morgan file log
        console.log(err);

        reject(err);
      });
    });
  }

  public update(id: mongoose.Types.ObjectId): Promise<LogModelInterface> {
    // TODO implement
    return undefined;
  }
}
