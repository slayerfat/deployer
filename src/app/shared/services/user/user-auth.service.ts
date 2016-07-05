import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoginResponse } from '../../interfaces/server/LoginResponse';
import 'rxjs/add/operator/map';
import { environment as env } from '../../../environment';
import { BackendHttpService } from '../misc/backend-http.service';
import { StateService } from '../misc/state.service';
import { UserStateInterface } from '../interfaces/UserStateInterface';

// TODO check angular-cli 3rd party support
// import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserAuthService extends BackendHttpService {
  private userState: UserStateInterface = {
    isLoggedIn: false
  };

  constructor(http: Http, private state: StateService) {
    super(http);
    this.userState.isLoggedIn = !!localStorage.getItem('auth_token');
  }

  public login(name, password): Observable<Response> {
    return this.http.post(
      env.endpoints.login,
      JSON.stringify({name, password}),
      {headers: this.headers}
    ).map((res: LoginResponse) => res.json())
      .map((res: LoginResponse) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.token);
          // this.userState.user = jwt.verify(res.token, env.jwtSecret);
          this.userState.isLoggedIn = true;
        }

        return res.success;
      }).catch(this.handleError);
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.userState.isLoggedIn = false;
  }
}
