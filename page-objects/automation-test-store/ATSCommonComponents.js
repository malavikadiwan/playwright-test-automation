import { expect } from "@playwright/test";
import { AssertUtils } from "../../utils/AssertUtils.js";

export class ATSCommonComponents {
    constructor(page) {
        this.page = page;
        this.fragranceLink = page.getByRole('link', { name: 'Fragrance' });
        this.headingMainText = page.locator('span.maintext');
        this.accountLink = page.locator('.topnavbar [data-id="menu_account"]');
        this.cartLink = page.locator('.topnavbar [data-id="menu_cart"]');
        this.assertUtils = AssertUtils;
    }

    async navigateToFragrancePage() {
        await this.fragranceLink.click();
        await this.assertUtils.verifyTextContent(this.headingMainText, "Fragrance", "Fragrance heading text");
    }

    async navigateToCartPage() {
        await this.cartLink.click();
        await this.assertUtils.verifyTextContent(this.headingMainText, "Shopping Cart", "Cart heading text");
    }

    async navigateToAccountPage() {
        await this.accountLink.click();
        await this.assertUtils.verifyTextContent(this.headingMainText, "Account Login", "Account heading text");
    }
}
