import * as mongoose from 'mongoose';

export interface Settable {
  store(data: Object): Promise<mongoose.Document>;
  update(id: mongoose.Types.ObjectId): Promise<mongoose.Document>;
}
