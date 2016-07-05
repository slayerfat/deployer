/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { StateService } from './state.service';

describe('State Service', () => {
  beforeEachProviders(() => [StateService]);

  it('should ...',
    inject([StateService], (service: StateService) => {
      expect(service).toBeTruthy();
    }));
});
