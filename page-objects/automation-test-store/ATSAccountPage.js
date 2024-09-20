export class ATSAccountPage {
    constructor(page) {
        this.page = page;
        this.loginNameInput = page.locator('#loginFrm_loginname');
        this.passwordInput = page.locator('#loginFrm_password');
        this.loginButton = page.locator('button[title="Login"]');
    }

    async login(loginName, password) {
        await this.loginNameInput.fill(loginName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}