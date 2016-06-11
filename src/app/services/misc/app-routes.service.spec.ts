import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { AppRoutesService } from './app-routes.service';

describe('AppRoute Service', () => {
  beforeEachProviders(() => [AppRoutesService]);

  it('should ...',
      inject([AppRoutesService], (service: AppRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
