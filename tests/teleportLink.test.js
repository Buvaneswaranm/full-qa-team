import { test, expect } from "@playwright/test";
import { ManagePage } from "../pages/manage.page.js";
import { LoginPage } from "../pages/login.page.js";
import { TeleportconnectionChecking } from "../pages/integration.page.js";
import { ValidatingbookingService } from "../pages/bookService.page.js";
import constant from "../constant";
const constants = require("../constantSetmoreTest.js");

let page;
let login;
let manage;
let integration;
let bookService;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  login = new LoginPage(page);
  manage = new ManagePage(page);
  integration = new TeleportconnectionChecking(page);
  bookService = new ValidatingbookingService(page);

  await login.navigateToURL(constant.URL);
  await login.doLogin(constant.userName, constant.passWord);
});

test.beforeEach(async () => {
  await integration.navigateToIntegrationTab();
  await integration.clickOnGivenApplication(constant.appName);
  await integration.navigateToManageBtn();

  await manage.doubleClickLinkAllButton();
  await manage.clickOffLinkAllToggleButton();
});

test.afterAll(async () => {
  await page.waitForTimeout(7000);
  await page.close();
});

test.describe("verify the teleport link", () => {
  test("verify the teleport link present in all service, when linkAll btn ON", async () => {
    await manage.clickOnLinkAllToggleButton();
    await manage.saveChanges();
    await integration.closeManageTab();
    await integration.navigateToCalendar();
    await bookService.selectAppointmentDate();
    await bookService.selectServiceTabs();
    await bookService.selectFifteenMinsAppointment();
    await bookService.assertTeleportLinkPresent();
    await bookService.selectServiceTabs();
    await bookService.selectThirtyMinsAppointment();
    await bookService.assertTeleportLinkPresent();
    await bookService.selectServiceTabs();
    await bookService.selectSixtyMinsAppointment();
    await bookService.assertTeleportLinkPresent();
  });

  test("verify the teleport link not present in all service,when linkAll btn OFF", async () => {
    await manage.clickOffLinkAllToggleButton();
    await manage.saveChanges();
    await integration.closeManageTab();
    await integration.navigateToCalendar();
    await bookService.selectAppointmentDate();
    await bookService.selectServiceTabs();
    await bookService.selectFifteenMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
    await bookService.selectServiceTabs();
    await bookService.selectThirtyMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
    await bookService.selectServiceTabs();
    await bookService.selectSixtyMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
  });

  test("verify the teleport link present only for 15mins meet, when 15mins btn only in ON", async () => {
    await manage.clickOnFifteenMinsService() ;
    await manage.saveChanges();
    await integration.closeManageTab();
    await integration.navigateToCalendar();
    await bookService.selectAppointmentDate();
    await bookService.selectServiceTabs();
    await bookService.selectFifteenMinsAppointment();
    await bookService.assertTeleportLinkPresent();
    await bookService.selectServiceTabs();
    await bookService.selectThirtyMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
    await bookService.selectServiceTabs();
    await bookService.selectSixtyMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
  });

  test("verify the teleport link present only for 30mins meet, when 30mins btn only in ON", async () => {
    await manage.clickOnThirtyMinsService();
    await manage.saveChanges();
    await integration.closeManageTab();
    await integration.navigateToCalendar();
    await bookService.selectAppointmentDate();
    await bookService.selectServiceTabs();
    await bookService.selectFifteenMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
    await bookService.selectServiceTabs();
    await bookService.selectThirtyMinsAppointment();
    await bookService.assertTeleportLinkPresent();
    await bookService.selectServiceTabs();
    await bookService.selectSixtyMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
  });

  test("verify the teleport link present only for 60mins meet, when 60mins btn only in ON", async () => {
    await manage.clickOnSixtyMinsService();
    await manage.saveChanges();
    await integration.closeManageTab();
    await integration.navigateToCalendar();
    await bookService.selectAppointmentDate();
    await bookService.selectServiceTabs();
    await bookService.selectFifteenMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
    await bookService.selectServiceTabs();
    await bookService.selectThirtyMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
    await bookService.selectServiceTabs();
    await bookService.selectSixtyMinsAppointment();
    await bookService.assertTeleportLinkPresent();
  });

  test("verify the 30mins meeting teleport link after OFF/ON several time ", async ({}, testInfo) => {
    testInfo.setTimeout(150000);
    await manage.clickOnLinkAllToggleButton();
    await manage.turnOffOnThirtyMinsServiceNTimes(constants.loopCount);
    await manage.saveChanges();
    await integration.closeManageTab();
    await integration.navigateToCalendar();
    await bookService.selectAppointmentDate();
    await bookService.selectServiceTabs();
    await bookService.selectThirtyMinsAppointment();
    await bookService.assertTeleportLinkPresent();
  });

  test("verify the 60mins meeting teleport link , when double click", async () => {
    await manage.doubleClickSixtyMinsService();
    await manage.saveChanges();
    await integration.closeManageTab();
    await integration.navigateToCalendar();
    await bookService.selectAppointmentDate();
    await bookService.selectServiceTabs();
    await bookService.selectSixtyMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
  });

  test('verify the 15mins service , when 15mins btn click-hold release ', async () => {
    await manage.clickOnLinkAllToggleButton();
    await manage.clickOnHoldFifteenMinsService();
    await manage.saveChanges();
    await integration.closeManageTab();
    await integration.navigateToCalendar();
    await bookService.selectAppointmentDate();
    await bookService.selectServiceTabs();
    await bookService.selectFifteenMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
  });


  test("verify the teleport link , when toggle btn on by keyboard action", async () => {
    await manage.clickOnThirtyMinsService();
    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');
    await page.keyboard.down('Enter');
    await integration.closeManageTab();
    await integration.navigateToCalendar();
    await bookService.selectAppointmentDate();
    await bookService.selectServiceTabs();
    await bookService.selectFifteenMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
    await bookService.selectServiceTabs();
    await bookService.selectThirtyMinsAppointment();
    await bookService.assertTeleportLinkPresent();
    await bookService.selectServiceTabs();
    await bookService.selectSixtyMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
  });

  test("verify the teleport link using backward/forward" , async () => {
    await manage.clickOnSixtyMinsService();
    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    await page.goForward();
    await page.waitForLoadState('domcontentloaded');
    await manage.saveChanges();
    await integration.closeManageTab();
    await integration.navigateToCalendar();
    await bookService.selectAppointmentDate();
    await bookService.selectServiceTabs();
    await bookService.selectFifteenMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
    await bookService.selectServiceTabs();
    await bookService.selectThirtyMinsAppointment();
    await bookService.assertTeleportLinkAbsent();
    await bookService.selectServiceTabs();
    await bookService.selectSixtyMinsAppointment();
    await bookService.assertTeleportLinkPresent();
  });


});
