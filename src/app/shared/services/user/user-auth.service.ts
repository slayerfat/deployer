import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { StateService } from '../misc/state.service';
import { environment as env } from '../../../environment';
import { BackendHttpService } from '../misc/backend-http.service';
import { LoginResponse } from '../../interfaces/server/LoginResponse';

@Injectable()
export class UserAuthService extends BackendHttpService {

  /**
   * https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service
   *
   * @type {Subject<boolean>}
   */
  public loggedInSubject = new Subject<boolean>();
  public isLoggedInObservable = this.loggedInSubject.asObservable();

  constructor(http: Http, private state: StateService) {
    super(http);
    this.state.set('isLoggedIn', UserAuthService.isLogged);
    this.updateLoggedStatus(UserAuthService.isLogged);
  }

  public static get isLogged() {
    return !!localStorage.getItem('auth_token');
  }

  public updateLoggedStatus(status: boolean) {
    this.loggedInSubject.next(status);
  }

  public login(name, password): Observable<Response> {
    return this.http.post(env.endpoints.login, JSON.stringify({name, password}), this.options)
      .map((res: LoginResponse) => res.json())
      .map((res: LoginResponse) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.token);
          this.state.set('isLoggedIn', true);
          this.updateLoggedStatus(UserAuthService.isLogged);
        }

        return res.success;
      }).catch(this.handleError);
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.updateLoggedStatus(UserAuthService.isLogged);
    this.state.set('isLoggedIn', false);
  }
}
