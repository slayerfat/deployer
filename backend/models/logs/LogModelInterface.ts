import * as mongoose from 'mongoose';
import { ControlInterface } from '../shared/interfaces/ControlInterface';
import { LogInterface } from './LogInterface';

export interface LogModelInterface extends mongoose.Document, LogInterface, ControlInterface {
  //
}
