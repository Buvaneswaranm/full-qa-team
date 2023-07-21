import { expect } from "@playwright/test";

export class ValidatingbookingService {
  constructor(page) {
    this.page = page;
    this.selectDate = page.locator('[class="fc-daygrid-day-top"]').nth(17);
    this.fifteenMinService = page.locator(
      "#scheduleId_b8e9fefd-2c42-41ee-a563-5bc7361e4f21"
    );
    this.thirtyMinsService = page.locator(
      "#scheduleId_e345ade1-304b-49b0-8bb4-316d4cdcaad4"
    );
    this.sixtyMinsService = page.locator(
      "#scheduleId_4432e372-44f0-4219-bbce-4d4fde72e650"
    );
    this.inputCost = page.locator("#input-cost");
    this.inputDuration = page.locator('[class="awd-input cursor-text"]');
    this.hrsMinsDropDown = page.locator("#duration-dropdown-container");
    this.hrsDropDown = page.locator("#hrs");
    this.addCustomer = page.locator('[data-testid="app-widget-guest"]');
    this.addCustomers = '[data-testid="app-widget-guest"]';
    this.selectCustomer = page.locator(
      '[data-testid="app-widget-guest-in-suggestion"]'
    );
    this.customerLogo = page
      .locator('[class="icon-pic-wrapper widget-left-icon fx-no-shrink"]')
      .nth(1);
    this.createBtn = page.locator('[data-testid="app-widget-footer"] button');
    this.teleportLink = page.locator(
      ".fx-c.fx-center.hide-overflow.fx-grow.mh-24"
    );
    this.bookedAppointments = page
      .locator('[class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"]')
      .nth(17);
    this.appointmentLink = page.locator(
      '[class="fx-c fx-center hide-overflow fx-grow mh-24"] a'
    );
    this.selectServiceTab = this.page.locator("#service-class-title-input");
    this.teleportPlaceHolder = this.page.getByPlaceholder('Add video meeting link');
  }

  //actions

  async selectAppointmentDate() {
    await this.selectDate.click();
  }

  async selectServiceTabs() {
    await this.selectServiceTab.click();
  }

  async selectFifteenMinsAppointment() {
    await this.fifteenMinService.click();
  }

  async selectThirtyMinsAppointment() {
    await this.thirtyMinsService.click();
  }

  async selectSixtyMinsAppointment() {
    await this.sixtyMinsService.click();
  }

  async fillCost(givenCost) {
    await this.inputCost.clear();
    await this.inputCost.type(givenCost);
  }

  async fillDuration(givenDuration) {
    await this.inputDuration.clear();
    await this.inputDuration.fill(givenDuration);
    await this.hrsMinsDropDown.click();
    //await this.page.selectOption('[class="awd-dropdown-list"]' , 'hrs').click();
    await this.hrsDropDown.click();
  }

  async updateCustomerId(guestId) {
    await this.addCustomer.click();
    await this.addCustomer.clear();
    await this.addCustomer.fill(guestId);
    await this.customerLogo.click();

    await this.page.waitForSelector(this.addCustomers);
    await this.addCustomer.click();
    await this.selectCustomer.click();
  }

  async createAppointment() {
    await this.createBtn.click();
  }

  // async validateDurationAndClickCreate(givenDuration){
  //     if(givenDuration<25){
  //      await  expect.soft(this.createBtn).toBeEnabled();
  //      console.log("the duration is less than 24")
  //     }else if (givenDuration>24){
  //         await expect.soft(this.createBtn).toBeDisabled();
  //         console.log("the duration is greater than 24")
  //     }
  // }

  async validateDurationAndClickCreate(givenDuration) {
    if (givenDuration < 25) {
      await expect.soft(this.createBtn).toBeEnabled();
      console.log("the duration is less than 24");
      this.createAppointment();
    } else if (!this.createBtn.click) {
      console.log("the duration is greater than 24");
    }
  }

  async getTeleportTabText() {
    return await this.teleportLink.textContent();
  }

  async getTeleportPlaceHolder(){
    return await this.teleportPlaceHolder;
  }

  async clickOnBookedAppointment() {
    await this.page.waitForTimeout(5000);
    await this.bookedAppointments.click();
  }

  async getAppointmentLinkText() {
    return await this.appointmentLink.textContent();
  }

  async assertTeleportLinkPresent(){
    const teleportText = await this.teleportLink.textContent();
    expect.soft(await teleportText).toBe("Teleport");
  }

  async assertTeleportLinkAbsent(){
    const teleportPlaceHolder = await this.teleportPlaceHolder;
    expect(await teleportPlaceHolder.isVisible()).toBeTruthy();
  }
}
