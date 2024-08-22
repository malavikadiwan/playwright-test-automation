export class ProductsPage {
   constructor(page) {
      this.page = page;
      this.productPrice = page.locator(".productinfo h2", { hasText: "Rs." });
      this.addToCartButton = page.locator(".productinfo .btn.add-to-cart");
      this.continueShoppingButton = page.getByText("Continue Shopping");
   }

   async storePriceArrayAddToCart(productCount) {
      const productPriceArray = [];
      for (let i = 0; i < productCount; i++) {
         productPriceArray.push(await this.productPrice.nth(i).textContent());
         await this.addToCartButton.nth(i).click();
         await this.continueShoppingButton.click();
      }
      return productPriceArray;
   }

   async storePriceAndAddToCart(productPosition) {
      const productPrice = await this.productPrice.nth(productPosition).textContent();
      await this.addToCartButton.nth(productPosition).click();
      await this.continueShoppingButton.click();
      return productPrice;
   }
}
