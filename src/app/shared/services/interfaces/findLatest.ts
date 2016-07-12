import { Observable } from 'rxjs/Rx';

export interface FindLatest<T> {
  getLatest(amount?: number): Observable<T[]>;
}
