import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { StateService } from '../misc/state.service';
import { environment as env } from '../../../environment';
import { BackendHttpService } from '../misc/backend-http.service';
import { LoginResponse } from '../../interfaces/server/LoginResponse';
import { Comprobable } from '../../interfaces/server/Comprobable';

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

    if (UserAuthService.isLogged) {
      this.checkToken().subscribe((res: any) => {
        if (res.success) {
          return this.updateLoggedStatus(UserAuthService.isLogged);
        }
      }, err => {
        if (err.success !== false) {
          this.handleError(err);
        }

        return this.logout();
      });
    }
  }

  public static get isLogged() {
    return !!localStorage.getItem('auth_token');
  }

  public updateLoggedStatus(status: boolean) {
    this.loggedInSubject.next(status);
  }

  /**
   * Tries to login the user.
   *
   * @param {string} name
   * @param {string} password
   * @returns {Observable<Response>}
   */
  public login(name: string, password: string): Observable<Response> {
    return this.http.post(env.endpoints.login, JSON.stringify({name, password}), this.options)
      .map((res: LoginResponse) => res.json())
      .map((res: Comprobable) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.token);
          this.state.set('isLoggedIn', true);
          this.updateLoggedStatus(UserAuthService.isLogged);
        }

        return res;
      }).catch(this.handleError);
  }

  /**
   * Logs out the current user.
   */
  public logout(): void {
    localStorage.removeItem('auth_token');
    this.updateLoggedStatus(UserAuthService.isLogged);
    this.state.set('isLoggedIn', UserAuthService.isLogged);
  }

  /**
   * Checks if the current token is valid.
   *
   * @returns {Observable<Response>}
   */
  private checkToken(): Observable<Response> {
    return this.http.get(env.endpoints.checkToken, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
