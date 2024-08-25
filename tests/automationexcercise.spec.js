import { test,expect } from "@playwright/test";
import { PageObjectManager } from "../page-objects/automation-excercise/PageObjectManager.js";
import { MiscUtils } from "../utils/MiscUtils";
const credentials = JSON.parse(JSON.stringify(require("../test-data/loginData.json")));
const userData = JSON.parse(JSON.stringify(require("../test-data/loginAndProductData.json")));

test("Automation Excercise - Single User", { tag: '@SingleUser' }, async ({ page }) => {
    const pageManager = new PageObjectManager(page);
    await page.goto("https://www.automationexercise.com/");
    await pageManager.getHomePage().navigateToLogin();
    await pageManager.getSignupLoginPage().login(credentials.email, credentials.password);
    await expect(pageManager.getHomePage().logoutLink).toBeVisible();
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
        await pageManager.getSignupLoginPage().login(user.email, user.password);
        await expect(pageManager.getHomePage().logoutLink).toBeVisible();
        await pageManager.getHomePage().navigateToCart();
        await pageManager.getCartPage().clearCart();
        await pageManager.getHomePage().navigateToProducts();
        const productPrice = await pageManager.getProductsPage().storePriceAndAddToCart(user.productPosition);
        await pageManager.getHomePage().navigateToCart();
        await pageManager.getCartPage().validateCartValue(productPrice);
    });
}

test("Automation Excercise - Signup", { tag: '@Signup' }, async ({ page }) => {
    const pageManager = new PageObjectManager(page);
    const miscUtils = new MiscUtils()
    await page.goto("https://www.automationexercise.com/");
    const signupName = await miscUtils.generateRandomString(6);
    await pageManager.getHomePage().navigateToLogin();
    await pageManager.getSignupLoginPage().signup(signupName, await miscUtils.generateRandomEmail(signupName), await miscUtils.generateRandomString(8));
    await expect(pageManager.getSignupLoginPage().accountCreatedText).toBeVisible()
    await pageManager.getSignupLoginPage().continueButton.click();
    await pageManager.getHomePage().deleteAccountLink.click();
    await expect(pageManager.getSignupLoginPage().accountDeletedText).toBeVisible();
});
