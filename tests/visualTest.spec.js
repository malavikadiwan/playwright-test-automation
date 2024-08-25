import { test, expect } from "@playwright/test";

test('Visual Testing for navbar', { tag: '@VisualTest' }, async ({ page }) => {
    await page.goto("https://amazon.in/");
    await expect(page.locator("#nav-belt")).toHaveScreenshot("Amazon-NavBelt.png");
});

test('Visual Testing with Masking', { tag: '@VisualTest' }, async ({ page }) => {
    await page.goto("https://google.com/");
    await expect(page).toHaveScreenshot("Google-HomePage.png", {
        mask: [page.getByAltText("Sign in to Google")]
    });
});

test('Visual Testing with Max Diff Pixel Ratio', { tag: '@VisualTest' }, async ({ page }) => {
    await page.goto("https://demoqa.com/books");
    await expect(page).toHaveScreenshot("Demoqa-Bookstore.png", {
        maxDiffPixelRatio: 0.2
    });
});

test('Visual Testing with Full page scroll', { tag: '@VisualTest' }, async ({ page }) => {
    await page.goto("https://demoqa.com/");
    await expect(page).toHaveScreenshot("Demoqa-HomePage.png", {
        fullPage: true,
        maxDiffPixels: 80000
    });
});