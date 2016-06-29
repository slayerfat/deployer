import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { HumanDiff } from './human-diff.pipe';

describe('HumanDiff Pipe', () => {
  beforeEachProviders(() => [HumanDiff]);

  it('should transform the input', inject([HumanDiff], (pipe: HumanDiff) => {
    expect(pipe.transform('test')).toBe(null);
  }));
});
