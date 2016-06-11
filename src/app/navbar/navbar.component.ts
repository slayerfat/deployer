import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AppStringsService } from '../services/strings/app-strings.service';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [AppStringsService]
})
export class NavbarComponent implements OnInit {

  constructor(public appStrings: AppStringsService) {}

  ngOnInit() {
  }
}
