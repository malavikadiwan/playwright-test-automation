import { AssertUtils } from "../../utils/AssertUtils.js";

export class ATSProductDetailsPage {
    constructor(page) {
        this.page = page;
        this.productName = page.locator(".bgnone");
        this.addToCartLink = page.locator(".productpagecart .cart");
        this.assertUtils = AssertUtils;
    }

    async verifyProductAndAddToCart(productSelected) {
        await this.assertUtils.verifyTextContent(this.productName, productSelected, 'product on PDP');
        await this.addToCartLink.click();
    }
}