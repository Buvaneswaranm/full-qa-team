import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { TeleportconnectionChecking } from "../pages/integration.page";
import { ValidatingbookingService } from "../pages/bookService.page";
const constant = require("../constant.js");
const constantSetmoreTest = require("../constantSetmoreTest.js");

let page;
let login;
let teleportCheck;
let bookService;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  teleportCheck = new TeleportconnectionChecking(page);
  login = new LoginPage(page);
  bookService = new ValidatingbookingService(page);

  await login.navigateToURL(constant.URL);
  await login.doLogin(constant.userName, constant.passWord);
});

test.afterAll(async () => {
  await page.waitForTimeout(7000);
  await page.close();
});

test.describe("teleport connected", () => {
  test.skip("navigate to application & checking whether is connected or not", async () => {
    await page.waitForLoadState("load");
    await teleportCheck.navigateToIntegrationTab();
    await teleportCheck.clickOnGivenApplication(constant.appName);
    await teleportCheck.verifyConnectionStatusOfApp(constant.appName);
    await teleportCheck.closeManageTab();
  });

  test.skip("verify the profile name", async () => {
    await login.navigateToCalendar();
    const profileName = await login.getProfileName();
    await expect(constant.profileName).toBe(profileName);
  });

  test.skip("verify can we book any time duration", async () => {
    await bookService.selectAppointmentDate();
    await bookService.selectFifteenMinsAppointment();
    await bookService.fillCostInput(constantSetmoreTest.costForService);
    await bookService.fillDuration(constantSetmoreTest.durationOfService);
    await bookService.updateCustomerId(constantSetmoreTest.guestId);
    await bookService.validateDurationAndClickCreate(
      constantSetmoreTest.durationOfService
    );
  });

  test("verify the teleport button is available", async () => {
    await bookService.selectAppointmentDate();
    await bookService.selectFifteenMinsAppointment();
    await bookService.addCustomerId(constantSetmoreTest.guestId);
    const teleportText = await bookService.getTeleportTabText();

    await expect.soft(await teleportText).toBe("Teleport");
    await bookService.createAppointment();
  });

  test("verify the teleport link is available", async () => {

    await bookService.clickOnBookedAppointment();
  
    await expect
      .soft(await bookService.getAppointmentLinkText())
      .toContain("https://teleport.video/meeting/setmore/");
  });
});
