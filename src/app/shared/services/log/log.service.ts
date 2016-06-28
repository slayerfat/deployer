import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environment';
import { Gettable } from '../interfaces/Gettable';
import { BackendHttpService } from '../misc/backend-http.service';

@Injectable()
export class LogService extends BackendHttpService implements Gettable {

  constructor(http: Http) {
    super(http);
  }

  public getAll(): Observable<Response> {
    return this.http.get(environment.endpoints.logs)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  public getOne(id: number): Observable<Response> {
    return this.http.get(`${environment.endpoints.logs}/${id}`)
      .map((res) => {
        console.log(res);
        res.json();
      }).catch(this.handleError);
  }
}
