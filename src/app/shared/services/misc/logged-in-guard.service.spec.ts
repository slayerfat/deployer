/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { LoggedInGuardService } from './logged-in-guard.service';

describe('LoggedInGuard Service', () => {
  beforeEachProviders(() => [LoggedInGuardService]);

  it('should ...',
    inject([LoggedInGuardService], (service: LoggedInGuardService) => {
      expect(service).toBeTruthy();
    }));
});
