import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.deleteItemIcon = page.locator(".cart_quantity_delete");
    this.totalPrice = page.locator(".cart_total_price");
  }

  async clearCart() {
    const deleteIcons = await this.deleteItemIcon.all();
    for (const deleteIcon of deleteIcons) {
      await deleteIcon.click();
    }
  }

  async validateCartValue(productPriceArray) {
    const totalPrices = await this.totalPrice.allTextContents();
    totalPrices.forEach((price, index) => {
      expect(price).toContain(productPriceArray[index]);
    });
    return productPriceArray;
  }
}
