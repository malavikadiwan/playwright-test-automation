import { test, expect } from "@playwright/test";
import { ExcelUtils } from "../utils/ExcelUtils";
import { ATSPageObjectManager } from "../page-objects/automation-test-store/ATSPageObjectManager";
import credentials from "../test-data/atsLoginData.json";

test.describe('Final Assessment - Logged-in Users', () => {
    let pageManager;
    let excelUtils;

    test.beforeEach(async ({ page }) => {
        pageManager = new ATSPageObjectManager(page);
        excelUtils = new ExcelUtils();

        // Navigate to the Automation Test Store homepage
        await page.goto("https://automationteststore.com/");

        // Log in to the account
        await pageManager.atsCommonComponents.navigateToAccountPage();
        await pageManager.atsAccountPage.login(credentials.name, credentials.password);

        // Navigate to the cart page and remove all products from the cart
        await pageManager.atsCommonComponents.navigateToCartPage();
        await pageManager.atsCartPage.removeAllProductsFromCart();
    });

    test('Save Product Details to Excel and Purchase Product', async ({ page }) => {
        // Navigate to the fragrance page
        await pageManager.atsCommonComponents.navigateToFragrancePage();

        // Fetch product details sorted by price
        const productDetails = await pageManager.atsProductListPage.getProductsSortedByPrice();

        // Print the number of products fetched
        pageManager.atsProductListPage.printNumberOfProductsFetched(productDetails);

        const filePath = 'test-data/FinalAssessmentProductOutput.xlsx';
        const baseSheetName = 'ProductDetails';

        // Save product details to Excel
        const sheetName = await excelUtils.saveDataToExcel(filePath, productDetails, baseSheetName);

        // Assert that data has been correctly written to the Excel file
        await excelUtils.assertDataWrittenToExcel(filePath, productDetails, sheetName);

        // Select the product at the given index from the list
        const { name: selectedProductName, price: selectedProductPrice } = await pageManager.atsProductListPage.selectProduct(1);

        // Verify the selected product and add it to the cart
        await pageManager.atsProductDetailsPage.verifyProductAndAddToCart(selectedProductName);

        // Navigate to the cart page and verify the product is in the cart, then proceed to checkout
        await pageManager.atsCommonComponents.navigateToCartPage();
        await pageManager.atsCartPage.verifyProductInCartAndCheckout(selectedProductName);
    });
});
