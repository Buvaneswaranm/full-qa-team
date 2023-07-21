import { LoginPage } from "../pages/login.page.js";
import { test, expect } from "@playwright/test";
import { TeleportconnectionChecking } from "../pages/integration.page.js";
const constant = require("../constant.js");

let page;
let login;
let teleportCheck;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  login = new LoginPage(page);
  teleportCheck = new TeleportconnectionChecking(page);

  await login.navigateToURL(constant.URL);
  await page.waitForTimeout(2000);
  await page.screenshot({path: "screenshots/" + Date.now() + "loginpage.jpeg"} )
  await login.doLogin(constant.userName, constant.passWord);
 
});

test.afterAll(async () => {
  await page.waitForTimeout(10000);
});

test.describe("teleport connected", () => {
  test("verify login profile name", async () => {
    await expect(await login.getProfileName()).toEqual(constant.profileName);
  });

  test("navigate to application & checking whether is connected or not", async () => {
    await teleportCheck.navigateToIntegrationTab();
    await teleportCheck.clickOnGivenApplication(constant.appName);
    await teleportCheck.verifyConnectionStatusOfApp(constant.appName);
   
  });
});
