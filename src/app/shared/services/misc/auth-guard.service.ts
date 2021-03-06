import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthService } from '../user/user-auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  public canActivate() {
    if (UserAuthService.isLogged) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
