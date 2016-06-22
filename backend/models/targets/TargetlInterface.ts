import * as mongoose from 'mongoose';

export interface TargetInterface {
  user: string | number | mongoose.Types.ObjectId;
  name: string;
  commands: String[];
}
