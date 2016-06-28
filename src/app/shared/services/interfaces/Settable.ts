import * as mongoose from 'mongoose';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

export interface Settable {
  store(data: Object): Observable<Response>;
  update(id: mongoose.Types.ObjectId): Observable<Response>;
}
