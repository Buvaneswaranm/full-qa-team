import { loginPage } from "../pages/login.page.js";
import {test , expect} from "@playwright/test";
import { navigation } from "../pages/navigation.page.js";
const constant = require('../constant.js');

let page;
let login;
let navigate;

test.beforeAll( async ({browser})=>{
    page = await browser.newPage();
    login = new loginPage(page);
    navigate = new navigation(page);

    await login.goTo(constant.URL);
})

test.afterAll(async()=>{
   await page.waitForTimeout(10000);
})


test.describe('teleport connected', () => {
    
    test('verify login', async () => {
        await login.doLogin(constant.userName, constant.passWord);
        await expect(await login.verifyProfileName()).toEqual(constant.profileName);

    });


    test('navigate to integration and apps tab', async () => {
        await  navigate.navigateToIntegration();

        await navigate.navigateToApp(constant.appName);
        await navigate.connectionCheck(constant.appName);
    })

  
});