import { expect } from "@playwright/test";
// const { expect } = require('playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;
    this.deleteItemIcon = page.locator(".cart_quantity_delete");
    this.totalPrice = page.locator(".cart_total_price");
  }

  async clearCart() {
    for (const deleteIcon of await this.deleteItemIcon.all()) {
      await deleteIcon.click();
    }
    
  }

  async validateCartValue(productPriceArray) {
    for (let i = 0; i < await this.totalPrice.count(); i++) {
      expect(await this.totalPrice.nth(i).textContent()).toContain(productPriceArray[i])
    }
    return productPriceArray;
  }
}
