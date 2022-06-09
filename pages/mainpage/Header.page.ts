import { Page, Locator } from '@playwright/test';
const { Base } = require("./Main.page");

export class Header extends Base {
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
    readonly truckingLink: Locator;
    readonly voiceApiLink: Locator;
    readonly smsApiLink: Locator;
    readonly wirelessLink: Locator;
    readonly numberLookupLink: Locator;
    readonly globalNumbersLink: Locator;
    readonly videoApiLink: Locator;
    readonly whatsappApiLink: Locator;

    constructor(page: Page) {
        super();
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
        this.truckingLink = page.locator('a[href="/products/sip-trunks"]').nth(0);
        this.voiceApiLink = page.locator('a[href="/products/voice-api"]').nth(0);
        this.smsApiLink = page.locator('a[href="/products/sms-api"]').nth(0);
        this.wirelessLink = page.locator('a[href="/products/iot-sim-card"]').nth(0);
        this.numberLookupLink = page.locator('a[href="/number-lookup"]').nth(0);
        this.globalNumbersLink = page.locator('a[href="/products/phone-numbers"]').nth(0);
        this.videoApiLink = page.locator('a[href="/products/video"]').nth(0);
        this.whatsappApiLink = page.locator('a[href="/products/whatsapp-api"]').nth(0);
    }

    async hoverNavBarElement(elementText: string) {
        super.hoverElement(`//*[@tabindex='0']/span[text()='${elementText}']`);
    }

    async verificationLinks(elementText: string) {
        this.page.locator(`a[href*='/${elementText.toLowerCase()}']`)
    }

    // deprecated
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

    async clickTrucking() {
        await this.truckingLink.click();
    }

    async clickProductLink() {
        await this.productsLink.click();
    }

    async clickVoiceApiLink() {
        await this.voiceApiLink.click();
    }

    async clickSmsApiLink() {
        await this.smsApiLink.click();
    }

    async clickWirelessLink() {
        await this.wirelessLink.click();
    }

    async clickNumberLookupLink() {
        await this.numberLookupLink.click();
    }

    async clickGlobalNumbersLink() {
        await this.globalNumbersLink.click();
    }

    async clickVideoApiLink() {
        await this.videoApiLink.click();
    }

    async clickWhatsappApiLink() {
        await this.whatsappApiLink.click();
    }
}