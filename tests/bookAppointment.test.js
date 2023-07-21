import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page.js";
import { DateSelectPage } from "../pages/view.page.js";
import { BookingAppointment } from "../pages/booking.page.js";
const constant = require("../constant.js");

let page;
let login;
let dateSelect;
let booking;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  login = new LoginPage(page);
  dateSelect = new DateSelectPage(page);
  booking = new BookingAppointment(page);

  await login.navigateToURL(constant.URL);
  await login.doLogin(constant.userName, constant.passWord);
});

test.afterAll(async () => {
  await page.waitForTimeout(10000);
  await page.close();
});

test.describe("login and booking appoinment", () => {
  test("verify login using valid credentials", async () => {
    await expect(await login.getProfileName()).toEqual(constant.profileName);
  });

  test("select year, month, date", async () => {
    await dateSelect.selectViewTypeAndMonth();
    await dateSelect.selectMonthAndYear(constant.month, constant.year);
    await dateSelect.selectDate(constant.year, constant.month, constant.date);
  });

  test("book appoinment with given credentials", async () => {
    //await booking.bookAppointmentService(constant.cost, constant.hours , constant.serviceName);
    await booking.selectService(constant.serviceName);
    await booking.fillCostInput(constant.cost);
    await booking.setServiceDuration(constant.hours);
    await booking.selectAppointmentTiming(constant.time);
    await booking.selectRecurringOption(constant.recurringShift);
    await booking.customSelectRepeat(
      constant.counts,
      constant.repeatShift,
      constant.recurringShift
    );
    await booking.setEndRepeatOption(
      constant.endRepeatText,
      constant.endRepeatNum,
      constant.recurringShift
    );
    await booking.verifyGuestAvailabilityOrAddGuest(constant.guestId);
    await booking.toggleTeleport(constant.needed);
    await booking.notes(constant.message);
    await booking.clickCreate();
  });
});
