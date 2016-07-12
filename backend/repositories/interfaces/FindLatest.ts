import * as mongoose from 'mongoose';

export interface FindLatest {
  getLatest(amount?: number): Promise<mongoose.Document[]>;
}
