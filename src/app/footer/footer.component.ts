import { Component, OnInit } from '@angular/core';
import { AppStringsService } from '../shared/services/app-strings.service';

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit {
  public year: number;

  constructor(public appStrings: AppStringsService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
