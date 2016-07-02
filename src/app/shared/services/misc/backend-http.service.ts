import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BackendHttpService {

  /**
   * The headers to be attached into a request, defaults to json.
   *
   * @type {Headers} headers
   */
  protected headers: Headers;

  constructor(protected http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  /**
   * Just rethrow the error for now.
   *
   * @param error
   * @returns {ErrorObservable}
   */
  protected handleError(error: any) {
    return Observable.throw(error);
  }
}
