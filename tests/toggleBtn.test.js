import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page.js";
import constant from "../constant.js";
const constants = require("../constantSetmoreTest.js");
import { TeleportconnectionChecking } from "../pages/integration.page.js";
import { ManagePage } from "../pages/manage.page.js";

let page;
let login;
let modules;
let manage;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  login = new LoginPage(page);
  modules = new TeleportconnectionChecking(page);
  manage = new ManagePage(page);

  await login.navigateToURL(constant.URL);
  await login.doLogin(constant.userName, constant.passWord);

  await modules.navigateToIntegrationTab();
  await modules.clickOnGivenApplication(constant.appName);
  await modules.navigateToManageBtn();
});



test.afterAll(async () => {
  await page.waitForTimeout(7000);
  await page.close();
});

test.beforeEach(async () => {
   await manage.doubleClickLinkAllButton();
   await manage.clickOffLinkAllToggleButton();
});

test.describe("verify the toogle btn", () => {
  test("verify all service toggle btns ON, when click linkall toggle btn ON", async () => {
    await manage.clickOnLinkAllToggleButton();
    const fifteenOn = await manage.toggleFifteenMinServiceOn() ;
    const thirtyOn = await manage.toggleThirtyMinServiceOn();
    const sixtyOn = await manage.toggleSixtyMinServiceOn() ;
    await expect(await fifteenOn.isVisible()).toBeTruthy();
    await expect(await thirtyOn.isVisible()).toBeTruthy();
    await expect(await sixtyOn.isVisible()).toBeTruthy();
  });

  test("verify all service toggle btns OFF, when click linkall toggle btn OFF", async () => {
    await manage.clickOffLinkAllToggleButton()
    const fifteenOff = await manage.toggleFifteenMinServiceOff();
    const thirtyOff = await manage.toggleThirtyMinServiceOff();
    const sixtyOff = await manage.toggleSixtyMinServiceOff();
    await expect(await fifteenOff.isVisible()).toBeTruthy();
    await expect(await thirtyOff.isVisible()).toBeTruthy();
    await expect(await sixtyOff.isVisible()).toBeTruthy();
  });

  test("verify the linkAll btn is ON, when all service btn is ON ", async () => {
    await manage.clickOnFifteenMinsService() ;
    await manage.clickOnThirtyMinsService();
    await manage.clickOnSixtyMinsService();
    const linkAllBtnOn = await manage.toggleLinkAllButtonOn();
    await expect(await linkAllBtnOn.isVisible()).toBeTruthy();
  });

  test.only("verify the linkAll btn is OFF, when all service btn is OFF", async () => {
    await manage.clickOnLinkAllToggleButton();
    await manage.clickOffFifteenMinsService();
    await manage.clickOffThirtyMinsService();
    await manage.clickOffSixtyMinsService();
    const linkAllBtnOff = await manage.toggleLinkAllButtonOff();
    await expect(await linkAllBtnOff.isVisible()).toBeTruthy();
  });

  test("verify the linkAll btn is OFF, when any one btn is in OFF ", async () => {
    await manage.clickOnLinkAllToggleButton();
    await manage.clickOffThirtyMinsService();
    const linkAllBtnOff = await manage.toggleLinkAllButtonOff();
    await expect(await linkAllBtnOff.isVisible()).toBeTruthy();
    await manage.clickOnLinkAllToggleButton();
  });

  test("verify the btn comes to same state,when double click", async () => {
    await manage.doubleClickFifteenMinsService();
    const fifteenOff = await manage.toggleFifteenMinServiceOff();
    await expect(await fifteenOff.isVisible()).toBeTruthy();
  });

  test("verify the btn ON/OFF, when click-hold-release", async () => {
    await manage.clickOnLinkAllToggleButton();
    await manage.clickOnHoldFifteenMinsService();
    const fifteenOf = await manage.toggleFifteenMinServiceOff();
    await expect(await fifteenOf.isVisible()).toBeTruthy();
    await manage.clickOnLinkAllToggleButton();
  });

  test("verify the btn working fine, when we click n times", async () => {
    await manage.clickOnLinkAllToggleButton();
    await manage.turnOffOnThirtyMinsServiceNTimes(constants.loopCount);
    const thirtyOn = await manage.toggleThirtyMinServiceOn();
    await expect(await thirtyOn.isVisible()).toBeTruthy();
  });
});
