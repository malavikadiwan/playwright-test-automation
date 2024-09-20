import { ATSCommonComponents } from './ATSCommonComponents';
import { ATSProductListPage } from './ATSProductListPage';
import { ATSProductDetailsPage } from './ATSProductDetailsPage';
import { ATSCartPage } from './ATSCartPage';
import { ATSCheckoutPage } from './ATSCheckoutPage';
import { ATSAccountPage } from './ATSAccountPage';

export class ATSPageObjectManager {
    constructor(page) {
        this.atsCommonComponents = new ATSCommonComponents(page);
        this.atsProductListPage = new ATSProductListPage(page);
        this.atsProductDetailsPage = new ATSProductDetailsPage(page);
        this.atsCartPage = new ATSCartPage(page);
        this.atsCheckoutPage = new ATSCheckoutPage(page);
        this.atsAccountPage = new ATSAccountPage(page);
    }
}
