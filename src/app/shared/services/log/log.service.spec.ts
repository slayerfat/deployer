import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { LogService } from './log.service';

describe('Log Service', () => {
  beforeEachProviders(() => [LogService]);

  it('should ...',
    inject([LogService], (service: LogService) => {
      expect(service).toBeTruthy();
    }));
});
