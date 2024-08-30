import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../page-objects/automation-excercise/PageObjectManager.js";
import { MiscUtils } from "../utils/MiscUtils";
import credentials from "../test-data/loginData.json";
import userData from "../test-data/loginAndProductData.json";

test("Automation Exercise - Single User", { tag: '@SingleUser' }, async ({ page }) => {
    const pageManager = new PageObjectManager(page);
    await page.goto("https://www.automationexercise.com/");
    await pageManager.homePage.navigateToLogin();
    await pageManager.signupLoginPage.login(credentials.email, credentials.password);
    await expect(pageManager.homePage.logoutLink).toBeVisible();
    await pageManager.homePage.navigateToCart();
    await pageManager.cartPage.clearCart();
    await pageManager.homePage.navigateToProducts();
    const productPriceArray = await pageManager.productsPage.storePriceArrayAddToCart(2);
    await pageManager.homePage.navigateToCart();
    await pageManager.cartPage.validateCartValue(productPriceArray);
});

for (const user of userData) {
    test(`Automation Exercise - User ${user.productPosition}`, { tag: '@MultiUser' }, async ({ page }) => {
        const pageManager = new PageObjectManager(page);
        await page.goto("https://www.automationexercise.com/");
        await pageManager.homePage.navigateToLogin();
        await pageManager.signupLoginPage.login(user.email, user.password);
        await expect(pageManager.homePage.logoutLink).toBeVisible();
        await pageManager.homePage.navigateToCart();
        await pageManager.cartPage.clearCart();
        await pageManager.homePage.navigateToProducts();
        const productPrice = await pageManager.productsPage.storePriceAndAddToCart(user.productPosition);
        await pageManager.homePage.navigateToCart();
        await pageManager.cartPage.validateCartValue(productPrice);
    });
}

test("Automation Exercise - Signup", { tag: '@Signup' }, async ({ page }) => {
    const pageManager = new PageObjectManager(page);
    const miscUtils = new MiscUtils();
    await page.goto("https://www.automationexercise.com/");
    const signupName = await miscUtils.generateRandomString(6);
    await pageManager.homePage.navigateToLogin();
    await pageManager.signupLoginPage.signup(signupName, await miscUtils.generateRandomEmail(signupName), await miscUtils.generateRandomString(8));
    await expect(pageManager.signupLoginPage.accountCreatedText).toBeVisible();
    await pageManager.signupLoginPage.continueButton.click();
    await pageManager.homePage.deleteAccountLink.click();
    await expect(pageManager.signupLoginPage.accountDeletedText).toBeVisible();
});
