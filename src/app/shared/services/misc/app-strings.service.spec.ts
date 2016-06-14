import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { AppStringsService } from './app-strings.service';

describe('AppStrings Service', () => {
  beforeEachProviders(() => [AppStringsService]);

  it('should ...',
      inject([AppStringsService], (service: AppStringsService) => {
    expect(service).toBeTruthy();
  }));
});
