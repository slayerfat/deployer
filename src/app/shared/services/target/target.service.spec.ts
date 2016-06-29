import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { TargetService } from './target.service';

describe('Target Service', () => {
  beforeEachProviders(() => [TargetService]);

  it('should ...',
    inject([TargetService], (service: TargetService) => {
      expect(service).toBeTruthy();
    }));
});
