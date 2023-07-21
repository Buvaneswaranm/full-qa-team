const constant = require("../constantSetmoreTest.js")
export class ManagePage {
  //locators
  constructor(page) {
    this.page = page;
    this.linkAllToggleBtnOff = page.locator(
      '//*[text()="Add video link to all"]/ancestor::div/child::div[@class="awd-togg-btn "]'
    );
    this.linkAllToggleBtnOffs =
      '//*[text()="Add video link to all"]/ancestor::div/child::div[@class="awd-togg-btn "]';
    this.linkAllToggleBtnOn = page.locator(
      '//*[text()="Add video link to all"]/parent::div/child::div[@class="awd-togg-btn awd-togg--on"]'
    );
    this.linkAllToggleBtnOns =
      '//*[text()="Add video link to all"]/parent::div/child::div[@class="awd-togg-btn awd-togg--on"]';

    this.fifteenMinToogleBtnOn = page.locator(
      '//*[text()="15 Minutes Meeting"]/ancestor::li/descendant::div[@class="awd-togg-btn awd-togg--on"]'
    );
    this.thirtyMinToogleBtnOn = page.locator(
      '//*[text()="30 Minutes Meeting"]/ancestor::li/descendant::div[@class="awd-togg-btn awd-togg--on"]'
    );
    this.sixtyMinToogleBtnOn = page.locator(
      '//*[text()="60 Minutes Meeting"]/ancestor::li/descendant::div[@class="awd-togg-btn awd-togg--on"]'
    );
    this.fifteenMinToogleBtnOff = page.locator(
      '//*[text()="15 Minutes Meeting"]/ancestor::li/descendant::div[@class="awd-togg-btn "]'
    );

    this.thirtyMinToogleBtnOff = page.locator(
      '//*[text()="30 Minutes Meeting"]/ancestor::li/descendant::div[@class="awd-togg-btn "]'
    );
    this.sixtyMinToogleBtnOff = page.locator(
      '//*[text()="60 Minutes Meeting"]/ancestor::li/descendant::div[@class="awd-togg-btn "]'
    );
    this.saveBtn = page.locator('//span[text()="Save"]');
    this.linkAllContains = page.locator('//*[text()="Add video link to all"]/ancestor::*/child::*[contains(@class,"awd-togg-btn ")]')
  }

  //actions

  async toggleLinkAllButtonOn(){
    return await this.linkAllToggleBtnOn;
  }

  async toggleLinkAllButtonOff() {
    return await this.linkAllToggleBtnOff;
  }

  async toggleFifteenMinServiceOn() {
    return await this.fifteenMinToogleBtnOn;
  }

  async toggleThirtyMinServiceOn() {
    return await this.thirtyMinToogleBtnOn;
  }

  async toggleSixtyMinServiceOn() {
    return await this.sixtyMinToogleBtnOn;
  }

  async toggleFifteenMinServiceOff() {
    return await this.fifteenMinToogleBtnOff;
  }

  async toggleThirtyMinServiceOff() {
    return await this.thirtyMinToogleBtnOff;
  }

  async toggleSixtyMinServiceOff() {
    return await this.sixtyMinToogleBtnOff;
  }

  async clickOffLinkAllToggleButton() {
    await this.page.waitForTimeout(constant.hardWait);
    if (await this.linkAllToggleBtnOn.isVisible()) {
      await this.linkAllToggleBtnOn.click();
    } else if (!(await this.linkAllToggleBtnOn.isVisible())) {
      return "the button already in OFF state";
    }
  }

  async clickOnLinkAllToggleButton() {
    await this.page.waitForTimeout(constant.hardWait);
    if (await this.linkAllToggleBtnOff.isVisible()) {
      await this.linkAllToggleBtnOff.click();
    } else if (!(await this.linkAllToggleBtnOff.isVisible())) {
      return "the button already in ON state";
    }
  }

  // async verifyToggleOnOff() {
  //     const isOn = await this.page.evaluate((button) => button.classList.contains("awd-togg--on"), this.linkAllToggleBtn);
  //     return isOn;
  //   }

  async clickOnFifteenMinsService() {
    await this.fifteenMinToogleBtnOff.click();
  }

  async clickOnThirtyMinsService() {
    await this.thirtyMinToogleBtnOff.click();
  }

  async clickOnSixtyMinsService() {
    await this.sixtyMinToogleBtnOff.click();
  }

  async clickOffFifteenMinsService() {
    await this.fifteenMinToogleBtnOn.click();
  }

  async clickOffThirtyMinsService() {
    await this.thirtyMinToogleBtnOn.click();
  }

  async clickOffSixtyMinsService() {
    await this.sixtyMinToogleBtnOn.click();
  }

  async doubleClickFifteenMinsService() {
    await this.fifteenMinToogleBtnOff.dblclick();
  }

  async doubleClickLinkAllButton() {
    await this.linkAllContains.dblclick();
  }

  async clickOnHoldFifteenMinsService() {
    const fifteenBtn = await this.fifteenMinToogleBtnOn
    await fifteenBtn.click({delay : constant.hardWait})
  }

  async turnOffOnThirtyMinsServiceNTimes(loopCount) {
    for (let i = 0; i <= loopCount; i++) {
    await this.thirtyMinToogleBtnOn.click();  
    await this.thirtyMinToogleBtnOff.click(); 
    }
  }

  async saveChanges(){
    await this.saveBtn.click();
  }

  async doubleClickSixtyMinsService() {
    await this.sixtyMinToogleBtnOff.dblclick();
  }

}
