import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { DeployerAppComponent } from '../app/deployer.component';

beforeEachProviders(() => [DeployerAppComponent]);

describe('App: Deployer', () => {
  it('should create the app',
      inject([DeployerAppComponent], (app: DeployerAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'deployer works!\'',
      inject([DeployerAppComponent], (app: DeployerAppComponent) => {
    expect(app.title).toEqual('deployer works!');
  }));
});
