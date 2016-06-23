import * as mongoose from 'mongoose';

export interface LogInterface {
  target?: string | number | mongoose.Types.ObjectId;
  ip: string;
  headers: Object;
  status: Object;
  iteration: number;
  results?: Array<{}>;
}
