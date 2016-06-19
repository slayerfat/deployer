import * as mongoose from 'mongoose';
import { LogModelInterface } from '../models/logs/LogModelInterface';
import { Gettable } from './interfaces/Gettable';
import { Settable } from './interfaces/Settable';
// import { UserRepository } from './UserRepository';
// import Log from '../models/logs/Log';

export class LogRepository implements Gettable, Settable {
  getAll(): Promise<LogModelInterface[]> {
    return undefined;
  }

  getOne(id: mongoose.Types.ObjectId): Promise<LogModelInterface> {
    return undefined;
  }

  store(data: Object): Promise<LogModelInterface> {
    return undefined;
  }

  update(id: mongoose.Types.ObjectId): Promise<LogModelInterface> {
    return undefined;
  }
}
