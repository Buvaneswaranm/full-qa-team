
import {test , expect } from  '@playwright/test'
import {bookEvents} from '../pages/bookEvent.page'
import { loginPage } from '../pages/login.page';
import { validatingbookingService } from "../pages/bookService.page";
const constant = require ('../constant.js')

let page;
let events;
let bookService;
let login;

test.beforeAll(async ({browser})=>{
    page = await browser.newPage();
    events = new bookEvents(page)
    login = new loginPage(page);
    bookService = new validatingbookingService(page);

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
        await events.createEventWithoutAnyCredentials();
    });
});
