import * as mongoose from 'mongoose';
import { ControlInterface } from '../shared/interfaces/ControlInterface';
import { Sluggable } from '../shared/interfaces/Sluggable';
import { TargetInterface } from './TargetInterface';

export interface TargetModelInterface extends mongoose.Document,
  TargetInterface,
  ControlInterface,
  Sluggable {
  // 
}
