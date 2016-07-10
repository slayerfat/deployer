import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  public canActivate() {
    if (!!localStorage.getItem('auth_token')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
