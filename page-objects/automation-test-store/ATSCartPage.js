import { expect } from "@playwright/test";
import { AssertUtils } from "../../utils/AssertUtils.js";

export class ATSCartPage {
    constructor(page) {
        this.page = page;
        this.cartProductName = page.locator(".align_left a[href*='product']");
        this.checkoutButton = page.locator("#cart_checkout1");
        this.removeProductLink = page.locator("[href*='checkout/cart&remove']");
        this.emptyCartMessage = page.getByText('Your shopping cart is empty!');
        this.assertUtils = AssertUtils;
    }

    async verifyProductInCartAndCheckout(productAdded) {
        await this.assertUtils.verifyTextContent(this.cartProductName, productAdded, 'product in cart');
        await this.checkoutButton.click();
    }

    async removeAllProductsFromCart() {
        // Return early if there are no products to remove
        if ((await this.removeProductLink.count()) === 0) return;

        // Remove all products from the cart
        const removeLinksCount = await this.removeProductLink.count();
        for (let i = 0; i < removeLinksCount; i++) {
            await this.removeProductLink.first().click();
            // // Wait for the page to reach the 'networkidle' state after each click
            // await this.page.waitForLoadState('networkidle');
        }

        await expect(this.emptyCartMessage).toBeVisible();
    }
}