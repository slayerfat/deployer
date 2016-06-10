import { Component } from '@angular/core';
import { LoginComponent } from './+login';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'deployer-app',
  templateUrl: 'deployer.component.html',
  styleUrls: ['deployer.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/login', component: LoginComponent}
])
export class DeployerAppComponent {
  title = 'deployer works!';
}
