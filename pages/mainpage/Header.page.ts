import { Page, Locator } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly productsSpan: Locator;
    readonly solutionsSpan: Locator;
    readonly resourcesSpan: Locator;
    readonly companySpan: Locator;
    readonly pricingSpan: Locator;
    readonly productsLink: Locator;
    readonly solutionsLink: Locator;
    readonly resourcesLink: Locator;
    readonly companyLink: Locator;
    readonly pricingLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsSpan = page.locator('span[tabIndex="0"]').nth(0);
        this.solutionsSpan = page.locator('span[tabIndex="0"]').nth(1);
        this.resourcesSpan = page.locator('span[tabIndex="0"]').nth(2);
        this.companySpan = page.locator('span[tabIndex="0"]').nth(3);
        this.pricingSpan = page.locator('span[tabIndex="0"]').nth(4);
        this.productsLink = page.locator('a[href="/products"]').nth(0);
        this.solutionsLink = page.locator('a[href="/solutions"]');
        this.resourcesLink = page.locator('a[href="/resources"]').nth(0);
        this.companyLink = page.locator('a[href="/company"]');
        this.pricingLink = page.locator('a[href="/pricing"]');
    }

    async clickProduct() {
        await this.productsSpan.click();
    }

    async clickSolutions() {
        await this.solutionsSpan.click();
    }

    async clickResources() {
        await this.resourcesSpan.click();
    }

    async clickCompany() {
        await this.companySpan.click();
    }

    async clickPricing() {
        await this.pricingSpan.click();
    }
}