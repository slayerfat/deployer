import * as mongoose from 'mongoose';
import { LogModelInterface } from '../models/logs/LogModelInterface';
import { Gettable } from './interfaces/Gettable';
import { Settable } from './interfaces/Settable';
import Log from '../models/logs/Log';

export class LogRepository implements Gettable, Settable {
  getAll(): Promise<LogModelInterface[]> {
    return undefined;
  }

  getOne(id: mongoose.Types.ObjectId): Promise<LogModelInterface> {
    return undefined;
  }

  store(data: Object): Promise<LogModelInterface> {
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

  update(id: mongoose.Types.ObjectId): Promise<LogModelInterface> {
    return undefined;
  }
}
