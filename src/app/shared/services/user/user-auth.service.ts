import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoginResponse } from '../../interfaces/server/LoginResponse';
import 'rxjs/add/operator/map';
import { environment } from '../../../environment';
import { BackendHttpService } from '../misc/backend-http.service';

@Injectable()
export class UserAuthService extends BackendHttpService {
  private loggedIn = false;

  constructor(http: Http) {
    super(http);
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  public login(name, password): Observable<Response> {
    return this.http.post(
      environment.endpoints.login,
      JSON.stringify({name, password}),
      {headers: this.headers}
    ).map((res: LoginResponse) => res.json())
      .map((res: LoginResponse) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
        }

        return res.success;
      }).catch(this.handleError);
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  public isLoggedIn() {
    return this.loggedIn;
  }
}
