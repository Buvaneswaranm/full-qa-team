export class loginPage {
  // locators
  constructor(page) {
    this.page = page;
    this.userName = page.locator("#username");
    this.passWord = page.locator("input#password");
    this.loginBtn = page.locator("#sm-login-btn");
    this.profile = page.locator("#profile-name");
    this.profileName = page.getByTestId("staffname-Buvaneswaran");
    this.calendarBtn = page.locator("#sidebar-app-calendar");
  }

  //actions

  async doLogin(userName, passWord) {
    await this.userName.fill(userName);
    await this.passWord.fill(passWord);
    await this.loginBtn.click();
  }

  async navigateToURL(URL) {
    await this.page.goto(URL);
  }

  async verifyProfileName() {
    await this.profile.click();
    return await this.profileName.textContent();
  }

  async navigateToCalendar() {
    await this.calendarBtn.click();
  }
}
