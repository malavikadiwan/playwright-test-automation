import { expect } from "@playwright/test";

export class Demoblaze {
  constructor(page) {
    this.page = page;
    this.signUpLink = page.locator("#signin2");
    this.signUpUsernameField = page.locator("#sign-username");
    this.signUpPasswordField = page.locator("#sign-password");
    this.signUpButton = page.locator(".btn-primary").getByText("Sign up");
    this.loginLink = page.locator("#login2");
    this.loginUsernameField = page.locator("#loginusername");
    this.loginPasswordField = page.locator("#loginpassword");
    this.loginModalCloseIcon = page.getByLabel("Log in").getByLabel("Close");
    this.loginButton = page.locator(".btn-primary").getByText("Log in");
    this.welcomeUserLinkText = page.locator("#nameofuser");
    this.productCard = page.locator(".card");
    this.productCardPrice = page.locator(".card-block h5");
    this.productCardName = page.locator(".card-block h4");
    this.phonesCategoryLink = page.getByText("Phones");
    this.laptopsCategoryLink = page.getByText("Laptops");
    this.monitorsCategoryLink = page.getByText("Monitors");
    this.categoriesLink = page.getByText("Categories");
    this.nextButton = page.locator("#next2");
    this.addToCartButton = page.locator(".btn-success");
    this.cartLink = page.getByText("Cart", { exact: true });
    this.cartItemRow = page.locator("tr.success");
    this.logoutLink = page.locator("#logout2");
  }

  async signUp(name, password) {
    await this.signUpLink.click();
    await this.signUpUsernameField.fill(name);
    await this.signUpPasswordField.fill(password);
    await this.signUpButton.click();
  }

  async login(name, password) {
    await this.loginLink.click();
    await this.loginUsernameField.fill(name);
    await this.loginPasswordField.fill(password);
    await this.loginButton.click();
  }

  async verifyProductInCategories() {
    await this.laptopsCategoryLink.click();
    await this.page.waitForTimeout(2000);
    console.log("Number of laptops: " + (await this.productCard.count()));
    await this.monitorsCategoryLink.click();
    await this.page.waitForTimeout(2000);
    console.log("Number of monitors: " + (await this.productCard.count()));
    await this.phonesCategoryLink.click();
    await this.page.waitForTimeout(2000);
    console.log("Number of phones: " + (await this.productCard.count()));
  }

  async filterPhone(maxPrice, phone) {
    await this.phonesCategoryLink.click();
    const filteredProduct = [];
    for (let i = 0; i < (await this.productCard.count()); i++) {
      const price = await this.productCardPrice.nth(i).textContent();
      const name = await this.productCardName.nth(i).textContent();
      const parsedPrice = parseInt(price.replace("$", ""));
      if (parsedPrice <= maxPrice && name.includes(phone)) {
        filteredProduct.push({ name, price });
      }
    }
    console.log("Filtered product:", filteredProduct);
  }

  async addLastProductToCart() {
    await this.categoriesLink.click();
    await this.nextButton.click();
    // await this.page.waitForTimeout(2000);
    await this.productCard.last().click();
    // await this.page.waitForTimeout(2000);
    await this.addToCartButton.click();
    // await this.page.waitForTimeout(2000);
    await this.cartLink.click();
    await expect(this.cartItemRow).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
    await expect(this.loginLink).toBeVisible();
  }
}
