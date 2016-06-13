import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoginResponse } from '../interfaces/server/LoginResponse';
import 'rxjs/add/operator/map';
import { environment } from '../../environment';

@Injectable()
export class UserAuthService {
  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(name, password): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(
      environment.endpoints.login,
      JSON.stringify({name, password}),
      {headers}
    ).map((res: LoginResponse) => res.json())
      .map((res: LoginResponse) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
        }

        return res.success;
      }).catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
