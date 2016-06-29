import * as mongoose from 'mongoose';
import { NodeCommands } from './NodeCommands';

export interface TargetInterface {
  user: string | number | mongoose.Types.ObjectId;
  name: string;
  commands: NodeCommands[];
}
