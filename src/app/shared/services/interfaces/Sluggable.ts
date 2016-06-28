import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

export interface Sluggable {
  getBySlug(slug: String): Observable<Response>;
}
