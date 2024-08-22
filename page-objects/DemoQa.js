import { expect } from "@playwright/test";

export class DemoQa {
    constructor(page) {
        this.page = page;
        this.elementsCard = page.getByText("Elements");
        this.textBoxListItem = page.getByText("Text Box");
        this.fullNameField = page.locator("#userName");
        this.emailField = page.locator("#userEmail");
        this.emailFieldError = page.locator("#userEmail.field-error");
        this.currentAddressField = page.locator("#currentAddress");
        this.permanentAddressField = page.locator("#permanentAddress");
        this.submitButton = page.locator("#submit");
        this.nameOutput = page.locator("p#name");
        this.emailOutput = page.locator("p#email");
        this.currentAddressOutput = page.locator("p#currentAddress");
        this.permanentAddressOutput = page.locator("p#permanentAddress");
        this.alertsFramesWindowsCard = page.getByText("Alerts, Frame & Windows");
        this.browserWindowsListItem = page.getByText("Browser Windows");
        this.newWindowButton = page.locator("#windowButton");
    }

    async navigateToTextBox() {
        await this.elementsCard.click();
        await this.textBoxListItem.click();
    }

    async enterInfo(name, email, currentAddress, permanentAddress) {
        await this.fullNameField.fill(name);
        await this.emailField.fill(email);
        await this.currentAddressField.fill(currentAddress);
        await this.permanentAddressField.fill(permanentAddress);
        await this.submitButton.click();
    }

    async validateInfo(name, email, currentAddress, permanentAddress) {
        await expect(this.nameOutput).toContainText(name);
        await expect(this.emailOutput).toContainText(email);
        await expect(this.currentAddressOutput).toContainText(currentAddress);
        await expect(this.permanentAddressOutput).toContainText(permanentAddress);
    }

    async navigateToWindowsQa() {
        await this.alertsFramesWindowsCard.click();
        await this.browserWindowsListItem.click();
    }
}
