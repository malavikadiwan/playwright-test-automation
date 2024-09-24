# Final Assessment Project

This project contains automated tests for the Automation Test Store using Playwright. The project includes utilities for interacting with the web application and for managing data storage in Excel files.

## Folder Structure
playwright-test-automation/
├── page-objects/
│   └── automation-test-store/
│       ├── ATSAccountPage.js
│       ├── ATSCartPage.js
│       ├── ATSCheckoutPage.js   
│       ├── ATSCommonComponents.js
│       ├── ATSPageObjectManager.js
│       ├── ATSProductDetailsPage.js
│       └── ATSProductListPage.js
├── playwright-report/
│   └── index.html
├── test-data/
│   ├── atsLoginData.json
│   └── FinalAssessmentProductOutput.xlsx
├── tests/
│   └── finalAssessment.spec.js
├── utils/
│   ├── ExcelUtils.js
│   └── JsonTestResultParser.js
└── test-results.json

## Files Description

- **page-objects/automation-test-store/**: Contains Page Object Model (POM) classes for different pages and components of the Automation Test Store.
  - `ATSAccountPage.js`: Manages login functionality on the account page.
  - `ATSCartPage.js`: Manages clearing the cart and validating products added to the cart page.
  - `ATSCheckoutPage.js`: Manages validating product details on the checkout page and placing orders.
  - `ATSCommonComponents.js`: Manages interactions with common components across the site.
  - `ATSPageObjectManager.js`: Manages instances of page objects.
  - `ATSProductDetailsPage.js`: Manages validating product names and adding products to the cart from the product details page.
  - `ATSProductListPage.js`: Manages sorting and selecting products from the product list page.

- **playwright-report/**: Contains test execution reports.
  - `index.html`: Test execution report in HTML format.

- **test-data/**: Contains test data files.
  - `atsLoginData.json`: Contains login credentials for the tests.
  - `FinalAssessmentProductOutput.xlsx`: Excel file where product details fetched from the site are saved.

- **tests/**: Contains test specifications.
  - `finalAssessment.spec.js`: Test specification for the final assessment, including tests for logged-in users.

- **utils/**: Contains utility classes.
  - `ExcelUtils.js`: Utility class for handling Excel file operations.
  - `JsonTestResultParser.js`: Script to parse and process test results from a JSON file.

- **test-results.json**: Test execution report in JSON format.

## Usage

### 1. Setup
   - Ensure you have Node.js installed.
   - Install dependencies by running:
     ```bash
     npm install
     ```

### 2. Running Tests
   - To run all tests, use:
     ```bash
     npx playwright test
     ```
   - To run a specific test, use:
     ```bash
     npx playwright test tests/finalAssessment.spec.js
     ```
   - To run `finalAssessment.spec.js` only in the Chrome browser, use:
     ```bash
     npm run FinalAssessmentChrome
     ```

### 3. JSON Test Results
   - JSON test results are saved in [`test-results.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmadiwan%2FDocuments%2FPlaywright%2Fplaywright-test-automation%2Ftest-results.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2299832cc9-61bc-400c-abc4-5c9de2052a41%22%5D "/Users/madiwan/Documents/Playwright/playwright-test-automation/test-results.json") and can be processed using `parseJsonResult.js`.
   - To process test results, run:
     ```bash
     node parseJsonResult.js
     ```

### 4. Viewing HTML Reports
   - HTML reports are generated in the [`playwright-report`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmadiwan%2FDocuments%2FPlaywright%2Fplaywright-test-automation%2Fplaywright-report%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2299832cc9-61bc-400c-abc4-5c9de2052a41%22%5D "/Users/madiwan/Documents/Playwright/playwright-test-automation/playwright-report") folder.
   - To open the report, use:
     ```bash
     npx playwright show-report
     ```

## Test Scenario

This test performs the following steps:
   - Logs in a user.
   - Removes existing products from the cart, if any.
   - Navigates to the fragrance page.
   - Sorts products by price and prints the total number of products.
   - Saves product names and prices to an Excel file and validates the saved data.
   - Selects a product from the product list page (PLP).
   - Verifies the selected product and adds it to the cart from the product details page (PDP).
   - Verifies cart contents and proceeds to checkout.
   - Verifies product name and price and confirms the order.