
import {test,expect} from '@playwright/test'
import {loginPage} from '../pages/login.page'
import {teleportconnectionChecking} from '../pages/teleportConnection.page'
const constant = require ('../constant.js')

let page;
let login;
let teleportCheck;

test.beforeAll(async({browser})=>{
    page = browser.newPage();
    teleportCheck = new  teleportconnectionChecking(page);
    login = new loginPage(page);

   await  login.navigateToURL(constant.URL);
   await  login.doLogin(constant.userName,constant.passWord)

})

test.afterAll(async()=>{
   await page.waitForTimeout(7000);
   await close();
})