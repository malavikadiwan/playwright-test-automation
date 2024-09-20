import { SignupLoginPage } from './SignupLoginPage';
import { HomePage } from './HomePage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';

export class AEPageObjectManager {
    constructor(page) {
        this.signupLoginPage = new SignupLoginPage(page);
        this.homePage = new HomePage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
    }
}
