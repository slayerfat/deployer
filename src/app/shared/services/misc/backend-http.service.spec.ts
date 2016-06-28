import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { BackendHttpService } from './backend-http.service';

describe('BackendHttp Service', () => {
  beforeEachProviders(() => [BackendHttpService]);

  it('should ...',
    inject([BackendHttpService], (service: BackendHttpService) => {
      expect(service).toBeTruthy();
    }));
});
