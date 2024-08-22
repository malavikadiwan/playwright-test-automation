import { test, expect } from "@playwright/test";
import { DemoQa } from "../page-objects/DemoQa.js";

test("Demo QA - Verify Email error", async ({ page }) => {
  const demoQa = new DemoQa(page);
  await page.goto("https://demoqa.com/");
  await expect(page).toHaveTitle("DEMOQA");
  await demoQa.navigateToTextBox();
  await demoQa.enterInfo("abc", "abc", "abc", "abc");
  await expect(demoQa.emailFieldError).toBeVisible();
});

test("Demo QA - Verify User Input", { tag: '@DemoQA' }, async ({ page }) => {
  const demoQa = new DemoQa(page);
  await page.goto("https://demoqa.com/");
  await expect(page).toHaveTitle("DEMOQA");
  await demoQa.navigateToTextBox();
  await demoQa.enterInfo("abc", "abc@gmail.com", "abc", "abc");
  await demoQa.validateInfo("abc", "abc@gmail.com", "abc", "abc");
});

test("Demo QA - Handle new window", { tag: '@DemoQA' }, async ({ context, page }) => {
  const demoQa = new DemoQa(page);
  await page.goto("https://demoqa.com/");
  await demoQa.navigateToWindowsQa();
  const pagePromise = context.waitForEvent("page");
  await demoQa.newWindowButton.click();
  const newPage = await pagePromise;
  console.log(await newPage.title());
  console.log(await newPage.locator("h1#sampleHeading").textContent());
  await page.bringToFront();
  console.log(await page.title());
});
