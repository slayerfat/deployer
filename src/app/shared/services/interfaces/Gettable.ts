import * as mongoose from 'mongoose';
import { Observable } from 'rxjs/Rx';

export interface Gettable<T> {
  getAll(): Observable<T[]>;
  getOne(id: number | string | mongoose.Types.ObjectId): Observable<T>;
}
