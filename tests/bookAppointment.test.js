import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/login.page.js";
import { dateSelectPage } from "../pages/view.page.js";
import { bookingAppointment } from "../pages/booking.page.js";
const constant = require("../constant.js");

let page;
let login;
let dateSelect;
let booking;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  login = new loginPage(page);
  dateSelect = new dateSelectPage(page);
  booking = new bookingAppointment(page);

  await login.navigateToURL(constant.URL);
  await login.doLogin(constant.userName, constant.passWord);
});

test.afterAll(async () => {
  await page.waitForTimeout(10000);
  await page.close();
});

test.describe("login and booking appoinment", () => {
  test("verify login using valid credentials", async () => {
    await expect(await login.verifyProfileName()).toEqual(constant.profileName);
  });

  test("select year, month, date", async () => {
    await dateSelect.viewTypeSelect();
    await dateSelect.selectMonthYear(constant.month, constant.year);
    await dateSelect.selectDate(constant.year, constant.month, constant.date);
  });

  test("book appoinment with given credentials", async () => {
    //await booking.bookAppointmentService(constant.cost, constant.hours , constant.serviceName);
    await booking.bookService(constant.serviceName);
    await booking.fillCost(constant.cost);
    await booking.serviceDuration(constant.hours);
    await booking.appointmentTiming(constant.time);
    await booking.recurringLists(constant.recurringShift);
    await booking.customSelect(
      constant.counts,
      constant.repeatShift,
      constant.recurringShift
    );
    await booking.endRepeat(
      constant.endRepeatText,
      constant.endRepeatNum,
      constant.recurringShift
    );
    await booking.verifyGuestAvailableOrAddGuest(constant.guestId);
    await booking.teleport(constant.needed);
    await booking.notes(constant.message);
    await booking.create();
  });
});
