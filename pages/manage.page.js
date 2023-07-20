const constant = require("../constantSetmoreTest.js")
export class managePage {
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
  }

  //actions

  async onLinkAllToggleBtn() {
    return await this.linkAllToggleBtnOn;
  }

  async offLinkAllToggleBtn() {
    return await this.linkAllToggleBtnOff;
  }

  async fifteenMinsServiceOn() {
    return await this.fifteenMinToogleBtnOn;
  }

  async thirtyMinsServiceOn() {
    return await this.thirtyMinToogleBtnOn;
  }

  async sixtyMinsServiceOn() {
    return await this.sixtyMinToogleBtnOn;
  }

  async fifteenMinsServiceOff() {
    return await this.fifteenMinToogleBtnOff;
  }

  async thirtyMinsServiceOff() {
    return await this.thirtyMinToogleBtnOff;
  }

  async sixtyMinsServiceOff() {
    return await this.sixtyMinToogleBtnOff;
  }

  async verifyAndOffTheLinkAllToggleBtn() {
    await this.page.waitForTimeout(constant.hardWait);
    if (await this.linkAllToggleBtnOn.isVisible()) {
      await this.linkAllToggleBtnOn.click();
    } else if (!(await this.linkAllToggleBtnOn.isVisible())) {
      return "the button already in OFF state";
    }
  }

  async verifyAndOnTheLinkAllToggleBtn() {
    await this.page.waitForSelector(this.linkAllToggleBtnOffs);

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

  async fifteenMinsServiceClickOn() {
    await this.fifteenMinToogleBtnOff.click();
  }

  async thirtyMinsServiceClickOn() {
    await this.thirtyMinToogleBtnOff.click();
  }

  async sixtyMinsServiceClickOn() {
    await this.sixtyMinToogleBtnOff.click();
  }

  async fifteenMinsServiceClickOff() {
    await this.fifteenMinToogleBtnOn.click();
  }

  async thirtyMinsServiceClickOff() {
    await this.thirtyMinToogleBtnOn.click();
  }

  async sixtyMinsServiceClickOff() {
    await this.sixtyMinToogleBtnOn.click();
  }

  async fifteenMinsServiceDblClickOn() {
    await this.fifteenMinToogleBtnOff.dblclick();
  }

  async fifteenMinsServiceClickOnHoldRelease() {
    const fifteenBtn = await this.fifteenMinToogleBtnOn
    await fifteenBtn.click({delay : constant.hardWait})
  }

  async thirtyMinsServiceOffOnNTimes(loopCount) {
    for (let i = 0; i <= loopCount; i++) {
    await this.thirtyMinToogleBtnOn.click();  // 1 3 5
    await this.thirtyMinToogleBtnOff.click(); // 2 4 6
    }
  }
}
