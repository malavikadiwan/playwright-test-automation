import { expect } from "@playwright/test";

export class Demoblaze {
  constructor(page) {
    this.page = page;
    this.signUpLink = page.locator("#signin2");
    this.signUpUsernameField = page.locator("#sign-username");
    this.signUpPasswordField = page.locator("#sign-password");
    this.signUpButton = page.locator(".btn-primary", { hasText: "Sign up" });
    this.loginLink = page.locator("#login2");
    this.loginUsernameField = page.locator("#loginusername");
    this.loginPasswordField = page.locator("#loginpassword");
    this.loginModalCloseIcon = page.getByLabel("Log in").getByLabel("Close");
    this.loginButton = page.locator(".btn-primary", { hasText: "Log in" });
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

  async getProductInCategory(categoryLink, apiCategoryText) {
    await Promise.all([
      this.page.waitForResponse(response =>
        response.url() === 'https://api.demoblaze.com/bycat' && response.text().then(text => text.includes(apiCategoryText))
      ),
      categoryLink.click()
    ]);
    return this.productCard.count();
  }

  async verifyProductInCategories() {
    const laptopCount = await this.getProductInCategory(this.laptopsCategoryLink, 'notebook');
    const monitorCount = await this.getProductInCategory(this.monitorsCategoryLink, 'monitor');
    const phoneCount = await this.getProductInCategory(this.phonesCategoryLink, 'phone');
    return { laptopCount, monitorCount, phoneCount };
  }

  async filterPhone(maxPrice, phone) {
    await this.phonesCategoryLink.click();
    const prices = await this.productCardPrice.allTextContents();
    const names = await this.productCardName.allTextContents();
    return prices.map((price, index) => ({
      name: names[index],
      price,
      parsedPrice: parseInt(price.replace("$", ""))
    })).filter(product => product.parsedPrice <= maxPrice && product.name.includes(phone))
      .map(product => ({ name: product.name, price: product.price }));
  }

  async addLastProductToCart() {
    await this.categoriesLink.click();
    await this.nextButton.click();
    await this.productCard.last().click();
    await this.addToCartButton.click();
  }

  async validateProductInCart() {
    await this.cartLink.click();
    await expect(this.cartItemRow).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
    await expect(this.loginLink).toBeVisible();
  }
}
