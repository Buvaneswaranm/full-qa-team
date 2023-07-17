export class bookingAppointment {
  //locators
  constructor(page) {
    this.page = page;
    this.service = page.locator("#Service");
    this.class = page.locator("#Class");
    this.event = page.locator("#Event");
    this.selectService = page.locator("#service-class-title-input");
    this.chooseService = '[data-testid="service-class-list"] li' ;
    this.serviceClick = page.locator('[data-testid="service-class-list"] li');
    this.fifteenMinsMeeting = page.locator(
      "#scheduleId_b8e9fefd-2c42-41ee-a563-5bc7361e4f21"
    );
    this.thirtyMinsMeeting = page.locator(
      "#scheduleId_e345ade1-304b-49b0-8bb4-316d4cdcaad4"
    );
    this.sixtyMinsMeeting = page.locator(
      "#scheduleId_4432e372-44f0-4219-bbce-4d4fde72e650"
    );
    this.cost = page.locator("#input-cost");
    this.duration = page.locator('[class="awd-input cursor-text"]');
    this.selectMinHrs = page.locator(
      '[class="awd-dropdown-btn awd-btn awd-btn-tertiary awd-btn--sm icon-right as-input show-arrow-onhover"]'
    );
    this.mins = page.locator("#mins");
    this.hrs = page.locator("#hrs");
    this.startTime = page.locator("#start-time-input");
    this.setTime = '[data-testid="app-widget-start-time-list"] li';
    this.setTimer = page.locator(
      '[data-testid="app-widget-start-time-list"] li'
    );

    this.recurringContainers =
      '[data-testid="app-widget-repeat-option-list"] li';
    this.recurringContainer = page.locator(
      '[data-testid="app-widget-repeat-option-list"] li'
    );
    this.repeatSelects =
      '[data-testid="app-widget-custom-repeat-option-list"] li';
    this.repeatSelect = page.locator(
      '[data-testid="app-widget-custom-repeat-option-list"] li'
    );

    this.recurringList = page.locator("#recurring-button");
    this.customDate = page.locator("#interval-input");
    this.repeatClick = page.locator("#repeat-every-button");
    this.neverEndRepeat = page.locator("#never");
    this.afterEndRepeat = page.locator("#after");
    this.afterInputEndRepeat = page.locator("#after-input");
    this.addcustomer = page.locator('[data-testid="app-widget-guest"]');
    this.selectCustomer = page.locator(
      '[data-testid="app-widget-guest-in-suggestion"]'
    );
    this.addGuestsTab = page
      .locator('[class="icon-pic-wrapper widget-left-icon fx-no-shrink"]')
      .nth(1);
    this.teleportMouseHover = page.locator('[data-testid="app-widget-location-label"]');
    this.teleportRemoveBtn = page.locator('[data-testid="app-widget-location-link-remove"]');
    this.notesTab = page.locator(
      '[placeholder="Notes for provider and guest(s)"]'
    );
    this.createBtn = page.locator("#create");
    this.addNewCus = page.locator('#add-new-customer');
    this.newCusSaveBtn = page.locator('[class="awd-btn awd-btn-primary awd-btn--sm"]')
  }
   




  //actions

  async bookService(givenService) {
    await this.service.click();
    await this.selectService.click();

    const chooseServices = await this.page.$$(this.chooseService);
    let i = 0;
    for (let choose of chooseServices) {
      const service = await choose.textContent();
      if (service.startsWith(givenService)) {
        return await this.serviceClick.nth(i).click();
      }
      i++;
    }
 
  }

  async fillCost(price){
    await this.cost.clear();
    await this.cost.fill(price);
  }

  async serviceDuration( time){
    await this.duration.clear();
    await this.duration.fill(time);
    await this.selectMinHrs.click();
    await this.hrs.click();
  }

  async appointmentTiming(givenHour) {
    await this.startTime.click();
    const setTimeElements = await this.page.$$(this.setTime);
    let i = 0;
    for (let time of setTimeElements) {
      const hour = await time.textContent();
      if (hour == givenHour) {
        return await this.setTimer.nth(i).click();
      }
      i++;
    }
  }

  async recurringLists(givenRecurring) {
    await this.recurringList.click();

    const recurrings = await this.page.$$(this.recurringContainers);
    
    let i = 0;
    for (let recurring of recurrings) {
      const recurringText = await recurring.textContent();
      if (recurringText.startsWith(givenRecurring)) {
        return await this.recurringContainer.nth(i).click();
      }
      i++;
    }
  }

  async customSelect(counts, givenrepeattext, recurringText) {
    if (recurringText == "Custom") {
      await this.customDate.clear();
      await this.customDate.fill(counts);
      await this.repeatClick.click();

      const repeats = await this.page.$$(this.repeatSelects);
      let i = 0;
      for (let repeat of repeats) {
        const repeatText = await repeat.textContent();
        if (repeatText == givenrepeattext) {
          return await this.repeatSelect.nth(i).click();
        }
        i++;
      }
    }
  }

  async endRepeat(givenEndRepeat, givenEndRepeatNum, recurringText) {
    if (recurringText != "Does not repeat") {
      if (givenEndRepeat == "Never") {
        this.neverEndRepeat.click();
      } else if (givenEndRepeat == "After:") {
        await this.afterEndRepeat.click();
        await  this.afterInputEndRepeat.clear();
        await this.afterInputEndRepeat.fill(givenEndRepeatNum);
      }
    }
  }

  async verifyGuestAvailableOrAddGuest(guestMailId) {
    await this.addcustomer.clear();
    await this.addcustomer.fill(guestMailId);
    await this.addGuestsTab.click();
    await this.addcustomer.click();

     const cusCheck = await this.addNewCus.textContent();
      //await this.page.waitForTimeout(2000);

    //if(await cusCheck== 'Add new customer')
    if(await cusCheck.isVisible)
    {
     await  this.addNewCus.click();
      await this.newCusSaveBtn.click();

    }else{
      
      await this.selectCustomer.click();
      console.log(this.selectCustomer);
      await this.addGuestsTab.click();
     // await this.addcustomer.click();
    }
   
  }

  async teleport(need) {
    if (need == "No") {
        const teleports =  await this.teleportMouseHover;
        await teleports.hover();
      await this.teleportRemoveBtn.click();
    }
    console.log("yes");
  }

  async notes(msg) {
    await this.notesTab.clear();
    await this.notesTab.fill(msg);
  }

  async create() {
    await this.createBtn.click();
  }
}
