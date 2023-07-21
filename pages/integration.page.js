const constants = require ("../constantSetmoreTest.js")
export class TeleportconnectionChecking {
  // locator
  constructor(page) {
    this.page = page;
    this.integrationBtn = page.locator("#sidebar-app-integration");
    this.integratedApps = '[class="container"] li h6';
    this.integratedApp = page.locator('[class="container"] li');
    this.calendarBtn = page.locator("#sidebar-app-calendar");
    this.disConnectBtn = page.locator(
      '[class="awd-btn awd-btn-tertiary awd-btn--sm fx fx-justify-center mt-auto "]'
    );
    this.connectBtn = page.locator(
      '[class="awd-btn awd-btn-primary awd-btn--sm mt-2 fx fx-justify-center activateBtn "]'
    );
    this.aboutPara = page.locator('[class="awd-text--sm awd-tc-grey--700"]');
    this.closeTabBtn = page.locator(
      '[class="ml-3"]+[class="nostyle close-btn"]'
    );
    this.manageBtn = page.locator('[class="awd-btn awd-btn-secondary awd-btn--sm mt-2 fx fx-justify-center"]');
  }

  //actions

  async navigateToIntegrationTab() {
    await this.integrationBtn.click();
    await this.page.waitForTimeout(constants.hardWait);
  }

  async clickOnGivenApplication (givenApp) {
    const apps = await this.page.$$(this.integratedApps);
    let i = 0;
    for (let app of apps) {
      const appText = await app.textContent();

      if (appText.startsWith(givenApp)) {
        return this.integratedApp.nth(i).click();
      }
      i++;
    }
  }

  async verifyConnectionStatusOfApp(givenApp) {
    const aboutPara = await this.aboutPara.textContent();

    if (!(await this.connectBtn.isHidden())) {
      const connectText = await this.connectBtn.textContent();

      if (connectText.startsWith("Connect")) {
        console.log(givenApp + " : this application is disconnected");
        console.log("about " + givenApp + "  :" + aboutPara);
      }
    } else if (!(await this.disConnectBtn.isHidden())) {
      const disconnectText = await this.disConnectBtn.textContent();

      if (disconnectText.startsWith("Disconnect")) {
        console.log(givenApp + " : this application is connected");
        console.log("about " + givenApp + "  :" + aboutPara);
      }
    } else {
      console.log(
        givenApp + " : this application doesn't have connection functionality"
      );
      console.log("about " + givenApp + "  :" + aboutPara);
    }
  }

  async closeManageTab() {
    await this.closeTabBtn.click();
  }

  async navigateToManageBtn(){
    await this.manageBtn.click();
  }

  async navigateToCalendar() {
    await this.calendarBtn.click();
  }


}
