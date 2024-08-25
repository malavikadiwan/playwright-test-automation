import { test, expect } from "@playwright/test";
import { Demoblaze } from "../page-objects/Demoblaze";

test("Demoblaze - Sign Up", { tag: '@Demoblaze' }, async ({ page }) => {
  const demoblaze = new Demoblaze(page);
  await page.goto("https://demoblaze.com/");
  await demoblaze.signUp("abc", "abc");
  page.on("dialog", async (alert) => {
    expect(alert.message()).toContain("This user already exist.");
    await alert.accept();
  });
});

test("Demoblaze - Login error and Product browsing", { tag: '@Demoblaze' }, async ({ page }) => {
  const demoblaze = new Demoblaze(page);
  await page.goto("https://demoblaze.com/");
  await demoblaze.login("abc", "abc");
  page.on("dialog", async (alert) => {
    expect(alert.message()).toContain("Wrong password.");
    await alert.accept();
  });
  await demoblaze.loginModalCloseIcon.click();
  const productCounts = await demoblaze.verifyProductInCategories();
  const { laptopCount, monitorCount, phoneCount } = productCounts;
  console.log(`Laptop count: ${laptopCount}`);
  console.log(`Monitor count: ${monitorCount}`);
  console.log(`Phone count: ${phoneCount}`);
  const filteredProducts = await demoblaze.filterPhone(650, "Sony");
  console.log("Filtered products:", filteredProducts);
});

test("Demoblaze - Login, Add to cart and logout", { tag: '@Demoblaze' }, async ({ page }) => {
  const demoblaze = new Demoblaze(page);
  await page.goto("https://demoblaze.com/");
  await demoblaze.login("a", "a");
  await expect(demoblaze.welcomeUserLinkText).toContainText("a");
  await demoblaze.addLastProductToCart();
  page.on("dialog", async (alert) => {
    expect(alert.message()).toContain("Product added.");
    await alert.accept();
  });
  await demoblaze.logout();
});
