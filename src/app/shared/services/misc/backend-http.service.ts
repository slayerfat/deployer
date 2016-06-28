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

  // TODO improve error handler
  protected handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
