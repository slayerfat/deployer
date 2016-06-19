import * as mongoose from 'mongoose';
import { ControlInterface } from '../shared/interfaces/ControlInterface';

export interface LogModelInterface extends mongoose.Document, ControlInterface {
  target: string | number | mongoose.Types.ObjectId;
  ip: string;
  headers: string;
  status: string;
  results: string;
  error: string;
  errorCode: string;
}
