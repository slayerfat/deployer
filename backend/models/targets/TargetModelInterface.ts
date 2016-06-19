import * as mongoose from 'mongoose';
import { ControlInterface } from '../shared/interfaces/ControlInterface';
import { Sluggable } from '../shared/interfaces/Sluggable';

export interface TargetModelInterface extends mongoose.Document, ControlInterface, Sluggable {
  user: string | number | mongoose.Types.ObjectId;
  name: string;
  commands: string;
}
