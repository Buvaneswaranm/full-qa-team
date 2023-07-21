export class DateSelectPage {
  //locators
  constructor(page) {
    this.page = page;
    this.month = page.locator("#month1");
    this.year = page.locator("#year1");
    this.nextBtn = page.locator("#calendar-header-next");
    this.previousBtn = page.locator("#calendar-header-prev");
    this.dateContainer = page.locator(
      '[class="fc-scrollgrid-sync-table"] tr td div div a'
    );
    this.viewType = page.locator("#change-view");
    this.viewMonth = page.locator("#Month");
    this.viewDay = page.locator("#Day");
    this.viewWeek = page.locator("#Week");
  }

  //actions
  async selectViewTypeAndMonth() {
    await this.viewType.click();
    await this.viewMonth.click();
  }

  async selectMonthAndYear(monthName, givenYear) {
    var year = await this.year.textContent();

    if (true) {
      var month = await this.month.textContent();
      while ((await month) != monthName) {
        await this.nextBtn.click();
        var month = await this.month.textContent();
      }

      var year = await this.year.textContent();

      if (year < givenYear) {
        while ((await year) != givenYear) {
          await this.nextBtn.click();
          var year = await this.year.textContent();
        }

        var month = await this.month.textContent();
        while ((await month) != monthName) {
          await this.nextBtn.click();
          var month = await this.month.textContent();
        }
      } else if (year > givenYear) {
        while ((await year) != givenYear) {
          await this.previousBtn.click();
          var year = await this.year.textContent();
        }
        var month = await this.month.textContent();
        while ((await month) != monthName) {
          await this.previousBtn.click();
          var month = await this.month.textContent();
        }
      }
    }
  }

  async selectDate(year, month, date) {
    const monthArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    for (let i = 0; i < monthArray.length; i++) {
      if (monthArray[i] == month) {
        var months = "0" + (i + 1);
      }
    }

    const dates = (await year) + "-" + months + "-" + date;
    await this.page.locator('[data-date="' + (await dates) + '"]').click();
  }
}
