import {validatingbookingService} from '../pages/bookService.page'


export class bookEvents{

    //locators 
    constructor(page){
        this.page=page;
        this.eventBtn = page.locator('#Event');
        
    }


    //actions

    async createEventWithoutAnyCredentials(){
        const bookingService = new validatingbookingService(this.page);
        await this.eventBtn.click();
        await bookingService.createBtn.click();
    }
}