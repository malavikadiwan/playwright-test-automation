import { expect } from '@playwright/test';

export class AssertUtils {
    static async verifyTextContent(locator, expectedText, description) {
        const actualText = await locator.textContent();
        expect(actualText.trim()).toBe(expectedText.trim(), `Expected ${description} to be "${expectedText}", but got "${actualText.trim()}"`);
    }
}