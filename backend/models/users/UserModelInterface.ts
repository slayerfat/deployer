import * as mongoose from 'mongoose';
import { ControlInterface } from '../shared/interfaces/ControlInterface';
import { Sluggable } from '../shared/interfaces/Sluggable';
import { UserInterface } from './UserInterface';

export interface UserModelInterface extends mongoose.Document,
  UserInterface,
  ControlInterface,
  Sluggable {
  //
}
