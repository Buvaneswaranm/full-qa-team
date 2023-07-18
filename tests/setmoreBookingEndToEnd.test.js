import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/login.page";
import { teleportconnectionChecking } from "../pages/integration.page";
import { validatingbookingService } from "../pages/bookService.page";
const constant = require("../constant.js");
const constantSetmoreTest = require("../constantSetmoreTest.js");

let page;
let login;
let teleportCheck;
let bookService;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  teleportCheck = new teleportconnectionChecking(page);
  login = new loginPage(page);
  bookService = new validatingbookingService(page);

  await login.navigateToURL(constant.URL);
  await login.doLogin(constant.userName, constant.passWord);
});

test.afterAll(async () => {
  await page.waitForTimeout(7000);
  await page.close();
});

test.describe("teleport connected", () => {
  test("navigate to application & checking whether is connected or not", async () => {
    await page.waitForLoadState("load");
    await teleportCheck.navigateToIntegrationTab();
    await teleportCheck.navigateToApplicationAccordingToGiven(constant.appName);
    await teleportCheck.verifyTheAppIsConnected(constant.appName);
    await teleportCheck.closeTab();
  });

  test("verify the profile name", async () => {
    await login.navigateToCalendar();
    const profileName = await login.verifyProfileName();
    await expect(constant.profileName).toBe(profileName);
  });

  test("verify can we book any time duration", async () => {
    await bookService.selectAppointmentDate();
    await bookService.selectAppointment();
    await bookService.fillCost(constantSetmoreTest.costForService);
    await bookService.fillDuration(constantSetmoreTest.durationOfService);
    await bookService.addCustomerId(constantSetmoreTest.guestId);
    await bookService.validationHrsAndCreateBtn(
      constantSetmoreTest.durationOfService
    );
  });

  test("verify the teleport link is available", async () => {
    await bookService.selectAppointmentDate();
    await bookService.selectAppointment();
    const teleportText = await bookService.VerifyTeleportLinkAvailable();

    await expect.soft(await teleportText).toBe("Teleport");
    await bookService.createAppointment();
  });
});
