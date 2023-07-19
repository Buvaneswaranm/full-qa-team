import { loginPage } from "../pages/login.page.js";
import { test, expect } from "@playwright/test";
import { teleportconnectionChecking } from "../pages/integration.page.js";
const constant = require("../constant.js");

let page;
let login;
let teleportCheck;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  login = new loginPage(page);
  teleportCheck = new teleportconnectionChecking(page);

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
    await expect(await login.verifyProfileName()).toEqual(constant.profileName);
  });

  test("navigate to application & checking whether is connected or not", async () => {
    await teleportCheck.navigateToIntegrationTab();
    await teleportCheck.navigateToApplicationAccordingToGiven(constant.appName);
    await teleportCheck.verifyTheAppIsConnected(constant.appName);
   
  });
});
