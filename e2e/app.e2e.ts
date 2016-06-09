import { DeployerPage } from './app.po';

describe('deployer App', function() {
  let page: DeployerPage;

  beforeEach(() => {
    page = new DeployerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('deployer works!');
  });
});
