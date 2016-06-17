import * as mongoose from 'mongoose';

export interface UserControlInterface {
  createdBy: string | number | mongoose.Types.ObjectId;
  updatedBy: string | number | mongoose.Types.ObjectId;
}
