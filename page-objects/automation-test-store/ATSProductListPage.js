export class ATSProductListPage {
    constructor(page) {
        this.page = page;
        this.sortOption = page.locator("#sort");
        this.gridProductName = page.locator(".grid .prdocutname");
        this.gridProductPrice = page.locator(".grid .oneprice, .grid .pricenew");
        this.outOfStockLabel = page.locator(".nostock");
    }

    async getSortedProducts(sortByOption) {
        await this.sortOption.selectOption({ label: sortByOption });

        const productDetails = [];
        await this.gridProductName.first().waitFor();
        const productNames = await this.gridProductName.allTextContents();
        const productPrices = await this.gridProductPrice.allTextContents();

        productNames.forEach((name, index) => {
            productDetails.push({
                NAME: name,
                PRICE: productPrices[index] || 'N/A' // Handle cases where price might not be available
            });
        });

        return productDetails;
    }

    printNumberOfProductsFetched(products) {
        console.log(products && products.length ? `Number of products fetched: ${products.length}` : 'No products fetched.');
    }
     
    async selectProduct(index) {
        await this.gridProductName.first().waitFor();

        // Get all product names and their stock status
        const products = await this.gridProductName.evaluateAll((nodes, outOfStockSelector) =>
            nodes.map((node, idx) => ({
                name: node.textContent,
                index: idx,
                isOutOfStock: node.closest(outOfStockSelector) !== null
            })), this.outOfStockLabel.selector
        );

        // Get all product prices
        const prices = await this.gridProductPrice.evaluateAll(nodes => nodes.map(node => node.textContent));

        // Filter in-stock products and their corresponding prices
        const inStockProducts = products.filter(product => !product.isOutOfStock);
        const inStockPrices = products.map((product, idx) => !product.isOutOfStock ? prices[idx] : null).filter(price => price !== null);

        if (inStockProducts.length === 0) throw new Error('No in-stock products available');

        // Click on the specified or in-stock product
        const productToClick = inStockProducts[Math.min(index, inStockProducts.length - 1)];
        const productPrice = inStockPrices[Math.min(index, inStockPrices.length - 1)];
        console.log(`Clicking on product: ${productToClick.name} with price: ${productPrice}`);

        await this.gridProductName.nth(productToClick.index).click();

        return { name: productToClick.name, price: productPrice };
    }
}
