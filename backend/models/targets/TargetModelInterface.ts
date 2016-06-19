import * as mongoose from 'mongoose';
import { ControlInterface } from '../shared/interfaces/ControlInterface';
import { Sluggable } from '../shared/interfaces/Sluggable';
import { TargetInterface } from './TargetlInterface';

export interface TargetModelInterface extends mongoose.Document,
  TargetInterface,
  ControlInterface,
  Sluggable {
  // 
}
