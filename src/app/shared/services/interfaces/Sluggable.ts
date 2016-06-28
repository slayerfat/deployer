import { Observable } from 'rxjs/Rx';

export interface Sluggable<T> {
  getBySlug(slug: String): Observable<T>;
}
