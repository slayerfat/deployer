import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../shared';

@Component({moduleId: module.id, template: ''})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authService: UserAuthService) {
  }

  public ngOnInit(): any {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
