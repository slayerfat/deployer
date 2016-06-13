import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { UserAuthService } from './user-auth.service';

describe('UserAuth Service', () => {
  beforeEachProviders(() => [UserAuthService]);

  it('should ...',
    inject([UserAuthService], (service: UserAuthService) => {
      expect(service).toBeTruthy();
    }));
});
