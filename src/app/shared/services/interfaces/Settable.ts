import * as mongoose from 'mongoose';
import { Observable } from 'rxjs/Rx';

export interface Settable<T> {
  store(data: Object): Observable<T>;
  update(id: mongoose.Types.ObjectId): Observable<T>;
}
