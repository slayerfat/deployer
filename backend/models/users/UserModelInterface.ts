import * as mongoose from 'mongoose';
import { ControlInterface } from '../shared/interfaces/ControlInterface';
import { Sluggable } from '../shared/interfaces/Sluggable';

export interface UserModelInterface extends mongoose.Document, ControlInterface, Sluggable {
  email: string;
  password: string;
  remember_token: string;
}
