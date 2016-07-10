import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthService } from '../user/user-auth.service';

@Injectable()
export class LoggedInGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  public canActivate() {
    if (UserAuthService.isLogged) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
