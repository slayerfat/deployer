import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoginResponse } from '../../interfaces/server/LoginResponse';
import 'rxjs/add/operator/map';
import { environment as env } from '../../../environment';
import { BackendHttpService } from '../misc/backend-http.service';
import { StateService, stateService } from '../misc/state.service';

@Injectable()
export class UserAuthService extends BackendHttpService {

  private state: StateService;

  constructor(http: Http) {
    super(http);
    this.state = stateService;
    this.state.set('isLoggedIn', !!localStorage.getItem('auth_token'));
  }

  public login(name, password): Observable<Response> {
    return this.http.post(env.endpoints.login, JSON.stringify({name, password}), this.options)
      .map((res: LoginResponse) => res.json())
      .map((res: LoginResponse) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.token);
          this.state.set('isLoggedIn', true);
        }

        return res.success;
      }).catch(this.handleError);
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.state.set('isLoggedIn', false);
  }
}
