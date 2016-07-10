/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuard Service', () => {
  beforeEachProviders(() => [AuthGuardService]);

  it('should ...',
    inject([AuthGuardService], (service: AuthGuardService) => {
      expect(service).toBeTruthy();
    }));
});
