import * as mongoose from 'mongoose';

export interface Gettable {
  getAll(): Promise<mongoose.Document[]>;
  getOne(id: mongoose.Types.ObjectId): Promise<mongoose.Document>;
}
