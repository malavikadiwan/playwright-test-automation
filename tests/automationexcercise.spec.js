import { test } from "@playwright/test";
import { PageObjectManager } from "../page-objects/automation-excercise/PageObjectManager.js";
const credentials = JSON.parse(JSON.stringify(require("../test-data/loginData.json")));
const userData = JSON.parse(JSON.stringify(require("../test-data/loginAndProductData.json")));

test("Automation Excercise - Single User", { tag: '@SingleUser' }, async ({ page }) => {
    const pageManager = new PageObjectManager(page);
    await page.goto("https://www.automationexercise.com/");
    await pageManager.getHomePage().navigateToLogin();
    await pageManager.getLoginPage().login(credentials.email, credentials.password);
    await pageManager.getHomePage().navigateToCart();
    await pageManager.getCartPage().clearCart();
    await pageManager.getHomePage().navigateToProducts();
    const productPriceArray = await pageManager.getProductsPage().storePriceArrayAddToCart(2);
    await pageManager.getHomePage().navigateToCart();
    await pageManager.getCartPage().validateCartValue(productPriceArray);
});

for (const user of userData) {
    test(`Automation Excercise - User ${user.productPosition}`, { tag: '@MultiUser' }, async ({ page }) => {
        const pageManager = new PageObjectManager(page);
        await page.goto("https://www.automationexercise.com/");
        await pageManager.getHomePage().navigateToLogin();
        await pageManager.getLoginPage().login(user.email, user.password);
        await pageManager.getHomePage().navigateToCart();
        await pageManager.getCartPage().clearCart();
        await pageManager.getHomePage().navigateToProducts();
        const productPrice = await pageManager.getProductsPage().storePriceAndAddToCart(user.productPosition);
        await pageManager.getHomePage().navigateToCart();
        await pageManager.getCartPage().validateCartValue(productPrice);
    });
}
