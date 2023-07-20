import { test, require, expect } from "@playwright/test";
import { loginPage } from "../pages/login.page.js";
import constant from "../constant.js";
const constants = require ("../constantSetmoreTest.js")
import { teleportconnectionChecking } from "../pages/integration.page.js";
import { managePage } from "../pages/manage.page.js";

let page;
let login;
let modules;
let manage;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  login = new loginPage(page);
  modules = new teleportconnectionChecking(page);
  manage = new managePage(page);

  await login.navigateToURL(constant.URL);
  await login.doLogin(constant.userName, constant.passWord);

  await modules.navigateToIntegrationTab();
  await modules.navigateToApplicationAccordingToGiven(constant.appName);
  await modules.navigateToManageBtn();
});

test.afterAll(async () => {
  await page.waitForTimeout(7000);
  await page.close();
});

test.afterEach(async () => {
  await manage.verifyAndOffTheLinkAllToggleBtn();
});

test.describe("verify the toogle btn", () => {
  test("verify all service toggle btns ON, when click linkall toggle btn ON", async () => {
    await manage.verifyAndOnTheLinkAllToggleBtn();
    const fifteenOn = await manage.fifteenMinsServiceOn();
    const thirtyOn = await manage.thirtyMinsServiceOn();
    const sixtyOn = await manage.sixtyMinsServiceOn();
    await expect(await fifteenOn.isVisible()).toBeTruthy();
    await expect(await thirtyOn.isVisible()).toBeTruthy();
    await expect(await sixtyOn.isVisible()).toBeTruthy();
  });

  test("verify all service toggle btns OFF, when click linkall toggle btn OFF", async () => {
    await manage.verifyAndOffTheLinkAllToggleBtn();
    const fifteenOff = await manage.fifteenMinsServiceOff();
    const thirtyOff = await manage.thirtyMinsServiceOff();
    const sixtyOff = await manage.sixtyMinsServiceOff();
    await expect(await fifteenOff.isVisible()).toBeTruthy();
    await expect(await thirtyOff.isVisible()).toBeTruthy();
    await expect(await sixtyOff.isVisible()).toBeTruthy();
  });

  test("verify the linkAll btn is ON, when all service btn is ON ", async () => {
    await manage.fifteenMinsServiceClickOn();
    await manage.thirtyMinsServiceClickOn();
    await manage.sixtyMinsServiceClickOn();
    const linkAllBtnOn = await manage.onLinkAllToggleBtn();
    await expect(await linkAllBtnOn.isVisible()).toBeTruthy();
  });

  test("verify the linkAll btn is OFF, when all service btn is OFF", async () => {
    await manage.verifyAndOnTheLinkAllToggleBtn();
    await manage.fifteenMinsServiceClickOff();
    await manage.thirtyMinsServiceClickOff();
    await manage.sixtyMinsServiceClickOff();
    const linkAllBtnOff = await manage.offLinkAllToggleBtn();
    await expect(await linkAllBtnOff.isVisible()).toBeTruthy();
  });

  test("verify the linkAll btn is OFF, when any one btn is in OFF ", async () => {
    await manage.verifyAndOnTheLinkAllToggleBtn();
    await manage.thirtyMinsServiceClickOff();
    const linkAllBtnOff = await manage.offLinkAllToggleBtn();
    await expect(await linkAllBtnOff.isVisible()).toBeTruthy();
    await manage.verifyAndOnTheLinkAllToggleBtn();
  });

  test("verify the btn comes to same state,when double click", async () => {
    await manage.fifteenMinsServiceDblClickOn();
    const fifteenOff = await manage.fifteenMinsServiceOff();
    await expect(await fifteenOff.isVisible()).toBeTruthy();
  });

  test("verify the btn ON/OFF, when click-hold-release", async () => {
    await manage.verifyAndOnTheLinkAllToggleBtn();
    await manage.fifteenMinsServiceClickOnHoldRelease();
    const fifteenOf = await manage.fifteenMinsServiceOff();
    await expect(await fifteenOf.isVisible()).toBeTruthy();
    await manage.verifyAndOnTheLinkAllToggleBtn();
  });

  test("verify the btn working fine, when we click n times", async () => {
    await manage.verifyAndOnTheLinkAllToggleBtn();
    await manage.thirtyMinsServiceOffOnNTimes(constants.loopCount);
    const thirtyOn = await manage.thirtyMinsServiceOn();
    await expect(await thirtyOn.isVisible()).toBeTruthy();
  });
});
