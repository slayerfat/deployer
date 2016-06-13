import * as mongoose from 'mongoose';
import { ControlInterface } from '../shared/interfaces/ControlInterface';

export interface UserModelInterface extends mongoose.Document {
  email: string;
  password: string;
  remember_token: string;
  control: ControlInterface;
}
