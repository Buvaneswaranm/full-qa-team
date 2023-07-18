export class validatingbookingService {

    constructor(page){
        this.selectDate = page.locator('[data-date="2023-07-20"]');
        this.fifteenMinService = page.locator('#scheduleId_b8e9fefd-2c42-41ee-a563-5bc7361e4f21');
        this.inputCost = page.locator ('#input-cost');
        this.inputDuration = page.locator('[class="awd-input cursor-text"]');
        this.hrsMinsDropDown = page.locator('#duration-dropdown-container');

    }


    async selectAppointmentDate(){
        await this.selectDate.click();
    }

    async selectAppointment(){
        await this.fifteenMinService.click();
    }

    async fillCost(){
        await this.inputCost.clear();
        await this.inputCost.fill('250');
    }

    async fillDuration(){
        await this.inputDuration.clear();
        await this.inputDuration.fill('20');
        await this.hrsMinsDropDown.click();
        await page.selectOption(this.hrsMinsDropDown, { label: 'hrs' });

    }
}