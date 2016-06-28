import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { UserAuthService, AppStringsService } from './shared';
import { NavbarComponent } from './navbar';
import { FooterComponent } from './footer';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, NavbarComponent, FooterComponent],
  providers: [UserAuthService, AppStringsService]
})
export class AppComponent {
}
