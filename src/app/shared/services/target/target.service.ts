import { Injectable } from '@angular/core';
import { Gettable } from '../interfaces/Gettable';
import { Sluggable } from '../interfaces/Sluggable';
import { TargetInterface } from '../../interfaces/models/TargetInterface';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment as env } from '../../../environment';
import { BackendHttpService } from '../misc/backend-http.service';

@Injectable()
export class TargetService extends BackendHttpService implements Gettable<TargetInterface>, Sluggable<TargetInterface> {
  constructor(http: Http) {
    super(http);
  }

  public getAll(): Observable<TargetInterface[]> {
    return this.http.get(env.endpoints.targets, this.options)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  public getOne(id: number): Observable<TargetInterface> {
    return this.http.post(`${env.endpoints.targets}/find`, {id: id}, this.options)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  public getBySlug(slug: String): Observable<TargetInterface> {
    return this.http.post(`${env.endpoints.targets}/find/slug`, {slug: slug}, this.options)
      .map((res) => res.json())
      .catch(this.handleError);
  }
}
