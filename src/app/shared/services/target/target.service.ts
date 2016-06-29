import { Injectable } from '@angular/core';
import { Gettable } from '../interfaces/Gettable';
import { TargetInterface } from '../../interfaces/models/TargetInterface';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environment';
import { BackendHttpService } from '../misc/backend-http.service';

@Injectable()
export class TargetService extends BackendHttpService implements Gettable<TargetInterface> {

  constructor(http: Http) {
    super(http);
  }

  public getAll(): Observable<TargetInterface[]> {
    return this.http.get(environment.endpoints.targets)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  public getOne(id: number): Observable<TargetInterface> {
    return this.http.post(
      `${environment.endpoints.targets}/find`,
      {id: id},
      {headers: this.headers}
    ).map((res) => res.json()).catch(this.handleError);
  }
}
