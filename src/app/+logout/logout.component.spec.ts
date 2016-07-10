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
import { LogoutComponent } from './logout.component';

describe('Component: Login', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [LogoutComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([LogoutComponent],
    (component: LogoutComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', inject([], () => {
    return builder.createAsync(LogoutComponentTestComponent)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(LogoutComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-login></app-login>
  `,
  directives: [LogoutComponent]
})
class LogoutComponentTestComponent {
}

