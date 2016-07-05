import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BackendHttpService {

  /**
   * The headers to be attached into a request, defaults to json.
   *
   * @type {Headers} headers
   */
  protected headers: Headers;

  /**
   * This options are not required but set
   * additional arguments to the http request.
   *
   * @type {RequestOptionsArgs} options
   */
  protected options: RequestOptionsArgs;

  constructor(protected http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-Deployer-Auth', localStorage.getItem('auth_token'));

    this.options = {headers: this.headers};
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
