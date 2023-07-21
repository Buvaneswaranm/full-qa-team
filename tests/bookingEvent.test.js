
import {test , expect } from  '@playwright/test'
import {BookEvents} from '../pages/bookEvent.page'
import { LoginPage } from '../pages/login.page';
import { ValidatingbookingService } from "../pages/bookService.page";
const constant = require ('../constant.js')

let page;
let events;
let bookService;
let login;

test.beforeAll(async ({browser})=>{
    page = await browser.newPage();
    events = new BookEvents(page)
    login = new LoginPage(page);
    bookService = new ValidatingbookingService(page);

    await login.navigateToURL(constant.URL);
    await login.doLogin(constant.userName, constant.passWord);
})

test.afterAll(async () => {
    await page.waitForTimeout(7000);
    await page.close();
  });
  

test.describe('verify the event functionality',  () => {
    
    test('Book the event without any credentials', async () => {
        await  bookService.selectAppointmentDate();
        await events.createEventWithoutCredentials();
    });
});
