import { loginPage } from "../pages/login.page.js";
import { test, expect } from "@playwright/test";
import { teleportconnectionChecking } from "../pages/teleportConnection.page.js";
const constant = require("../constant.js");

let page;
let login;
let navigate;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  login = new loginPage(page);
  navigate = new teleportconnectionChecking(page);

  await login.navigateToURL(constant.URL);
  await login.doLogin(constant.userName, constant.passWord);
});

test.afterAll(async () => {
  await page.waitForTimeout(10000);
});

test.describe("teleport connected", () => {
  test("verify login profile name", async () => {
    await expect(await login.verifyProfileName()).toEqual(constant.profileName);
  });

  test.only("navigate to application & checking whether is connected or not", async () => {
    await navigate.navigateToIntegrationTab();
    await navigate.navigateToApplicationAccordingToGiven(constant.appName);
    await navigate.verifyTheAppIsConnected(constant.appName);
  });
});
