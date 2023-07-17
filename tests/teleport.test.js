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
    await login.doLogin(constant.userName, constant.passWord);
})

test.afterAll(async()=>{
   await page.waitForTimeout(10000);
})


test.describe('teleport connected', () => {
    
    test('verify login profile name', async () => {
       
        await expect(await login.verifyProfileName()).toEqual(constant.profileName);
        //await  navigate.navigateToIntegrationTab();
        await navigate.navigateToApplication(constant.appName);
        await navigate.verifyTheAppIsConnected(constant.appName);

    });


    // test('navigate to application & checking whether is connected or not', async () => {

        
    // });

  
});