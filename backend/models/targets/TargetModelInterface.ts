import * as mongoose from 'mongoose';
import { ControlInterface } from '../shared/interfaces/ControlInterface';

export interface TargetModelInterface extends mongoose.Document, ControlInterface {
  user: string | number | mongoose.Types.ObjectId;
  name: string;
  commands: string;
}
