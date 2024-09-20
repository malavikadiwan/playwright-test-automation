import { AssertUtils } from "../../utils/AssertUtils.js";
import { expect } from '@playwright/test';

export class ATSCheckoutPage {
    constructor(page) {
        this.page = page;
        this.productName = page.locator('.confirm_products a.checkout_heading');
        this.productPrice = page.locator('td.checkout_heading')
        this.confirmOrderButton = page.locator('#checkout_btn');
        this.orderConfirmationMessage = page.getByText('Your Order Has Been Processed!');
        this.assertUtils = AssertUtils;
    }

    async verifyProductDetailsOnCheckout(expectedProductName, expectedProductPrice) {
        await this.assertUtils.verifyTextContent(this.productName, expectedProductName, 'product name');
        await this.assertUtils.verifyTextContent(this.productPrice, expectedProductPrice, 'product price');
    }

    async confirmOrder() {
        await this.confirmOrderButton.click();
        await expect(this.orderConfirmationMessage).toBeVisible();
    }
}