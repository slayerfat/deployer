import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  ComponentFixture,
  TestComponentBuilder
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NotFoundComponent } from './not-found.component';

describe('Component: Dashboard', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [NotFoundComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([NotFoundComponent],
    (component: NotFoundComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', inject([], () => {
    return builder.createAsync(NotFoundComponentTestComponent)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(NotFoundComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-dashboard></app-dashboard>
  `,
  directives: [NotFoundComponent]
})
class NotFoundComponentTestComponent {
}

