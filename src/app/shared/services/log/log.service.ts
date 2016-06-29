import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environment';
import { Gettable } from '../interfaces/Gettable';
import { BackendHttpService } from '../misc/backend-http.service';
import { LogInterface } from '../../../shared';

@Injectable()
export class LogService extends BackendHttpService implements Gettable<LogInterface> {

  constructor(http: Http) {
    super(http);
  }

  public getAll(): Observable<LogInterface[]> {
    return this.http.get(environment.endpoints.logs)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  public getOne(id: number): Observable<LogInterface> {
    return this.http.post(
      `${environment.endpoints.logs}/find`,
      {id: id},
      {headers: this.headers}
    ).map((res) => res.json()).catch(this.handleError);
  }
}