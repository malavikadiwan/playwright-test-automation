import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';

export class PageObjectManager { 
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
    }

    getLoginPage() {
        return this.loginPage;
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
