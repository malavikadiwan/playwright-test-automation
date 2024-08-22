export class HomePage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.locator('a[href*="login"]');
    this.produtsLink = page.locator('.navbar-nav a[href="/products"]');
    this.cartLink = page.locator('.navbar-nav a[href*="view_cart"]');
  }

  async navigateToLogin(password) {
    await this.loginLink.click();
  }

  async navigateToProducts() {
    await this.produtsLink.click();
  }

  async navigateToCart() {
    await this.cartLink.click();
  }
}
