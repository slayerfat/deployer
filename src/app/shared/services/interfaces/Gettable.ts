import * as mongoose from 'mongoose';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

export interface Gettable {
  getAll(): Observable<Response>;
  getOne(id: number | string | mongoose.Types.ObjectId): Observable<Response>;
}
