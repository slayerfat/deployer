import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { Validator } from './validator';

describe('Validator Service', () => {
  beforeEachProviders(() => [Validator]);

  it('should ...',
      inject([Validator], (service: Validator) => {
    expect(service).toBeTruthy();
  }));
});
