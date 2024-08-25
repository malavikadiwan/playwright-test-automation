export class SignupLoginPage {
    constructor(page) {
        this.page = page;
        this.loginEmailField = page.locator('[data-qa="login-email"]');
        this.loginPasswordField = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.signupNameField = page.locator('[data-qa="signup-name"]');
        this.signupEmailField = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
        this.signupPasswordField = page.locator('#password');
        this.signupfirstNameField = page.locator('#first_name');
        this.signupLastNameField = page.locator('#last_name');
        this.signupAddressField = page.locator('#address1');
        this.signupStateField = page.locator('#state');
        this.signupCityField = page.locator('#city');
        this.signupZipcodeField = page.locator('#zipcode');
        this.signupMobileField = page.locator('#mobile_number');
        this.createAccountButton = page.locator('[data-qa="create-account"]');
        this.accountCreatedText = page.locator('[data-qa="account-created"]');
        this.continueButton = page.locator('[data-qa="continue-button"]');
        this.accountDeletedText = page.locator('[data-qa="account-deleted"]');
    }

    async login(email, password) {
        await this.loginEmailField.fill(email);
        await this.loginPasswordField.fill(password);
        await this.loginButton.click();
    }

    async signup(name, email, password) {
        await this.signupNameField.fill(name);
        await this.signupEmailField.fill(email);
        await this.signupButton.click();
        await this.signupPasswordField.fill(password);
        await this.signupfirstNameField.fill('Jane');
        await this.signupLastNameField.fill('Doe');
        await this.signupAddressField.fill('Address');
        await this.signupStateField.fill('State');
        await this.signupCityField.fill('City');
        await this.signupZipcodeField.fill('400001');
        await this.signupMobileField.fill('9999999999');
        await this.createAccountButton.click();
    }
}
