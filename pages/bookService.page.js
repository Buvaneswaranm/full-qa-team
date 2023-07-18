import { expect } from "@playwright/test";

export class validatingbookingService {
  constructor(page) {
    this.selectDate = page.locator('[class="fc-daygrid-day-top"]').nth(24);
    this.fifteenMinService = page.locator(
      "#scheduleId_b8e9fefd-2c42-41ee-a563-5bc7361e4f21"
    );
    this.inputCost = page.locator("#input-cost");
    this.inputDuration = page.locator('[class="awd-input cursor-text"]');
    this.hrsMinsDropDown = page.locator("#duration-dropdown-container");
    this.hrsDropDown = page.locator("#hrs");
    this.addCustomer = page.locator('[data-testid="app-widget-guest"]');
    this.selectCustomer = page.locator('[data-testid="app-widget-guest-in-suggestion"]')
    this.customerLogo = page.locator('[class="icon-pic-wrapper widget-left-icon fx-no-shrink"]').nth(1);
    this.createBtn = page.locator('#create');

  }

  async selectAppointmentDate() {
    await this.selectDate.click();
  }

  async selectAppointment() {
    await this.fifteenMinService.click();
  }

  async fillCost(givenCost) {
    await this.inputCost.clear();
    await this.inputCost.type( givenCost);
  }

  async fillDuration(givenDuration) {
    await this.inputDuration.clear();
    await this.inputDuration.fill( givenDuration);
    await this.hrsMinsDropDown.click();
    //await this.page.selectOption('[class="awd-dropdown-list"]' , 'hrs').click();
    await this.hrsDropDown.click();

  }

  async addCustomerId(guestId){
    await this.addCustomer.click();
    await this.addCustomer.clear();
    await this.addCustomer.fill(guestId);
    await this.customerLogo.click();
    await this.addCustomer.click();
    await this.selectCustomer.click();
  }

  async createAppointment(){
        await this.createBtn.click();
    }

    async validationHrsAndCreateBtn(givenDuration){
        if(givenDuration<25){
         await  expect.soft(this.createBtn).isEnabled();
        }else if (givenDuration>24){
            await expect.soft(this.createBtn).not.isEnabled();
        }
    }
    


}
