import { Component } from '@angular/core';
import { AppStringsService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent {
  public year: number;

  constructor(public appStrings: AppStringsService) {
    this.year = new Date().getFullYear();
  }
}
