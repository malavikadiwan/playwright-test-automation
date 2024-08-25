import { SignupLoginPage } from './SignupLoginPage';
import { HomePage } from './HomePage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';

export class PageObjectManager {
    constructor(page) {
        this.page = page;
        this.signupLoginPage = new SignupLoginPage(page);
        this.homePage = new HomePage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
    }

    getSignupLoginPage() {
        return this.signupLoginPage;
    }

    getHomePage() {
        return this.homePage;
    }

    getProductsPage() {
        return this.productsPage;
    }

    getCartPage() {
        return this.cartPage;
    }
}
