import * as mongoose from 'mongoose';

export interface Sluggable {
  getBySlug(slug: String): Promise<mongoose.Document>;
}
