export class DeployerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('deployer-app h1')).getText();
  }
}
