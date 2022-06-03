import { expect, Page, Locator } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly emailConfirmForm: Locator;
    readonly cookiesClose: Locator;
    readonly messagingApiCard: Locator;
    readonly wirelessCard: Locator;
    readonly smsPricingLink: Locator;
    readonly whatsappApiCard: Locator;
    readonly videoApiCard: Locator;
    readonly voiceApiCard: Locator;
    readonly truckingCard: Locator;
    readonly whatsappPricingLink: Locator;
    readonly wikiVideoApiLink: Locator;
    readonly simPointsOfSaleLink: Locator;
    readonly callControlGuideLink: Locator;
    readonly elasticSipPricingLink: Locator;
    // not in main page, change later, maybe
    readonly exploreProductsButton: Locator;
    readonly productFaxLink: Locator;
    readonly numberLookupTermsLink: Locator;
    readonly callForwadingCard: Locator;
    readonly signUpButton: Locator;
    readonly emailInput: Locator;
    readonly tryForFreeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailConfirmForm = page.locator('form[name="EmailFormCtaForm"]');
        this.cookiesClose = page.locator('button[aria-label="close and deny"]');
        this.messagingApiCard = page.locator('a[href*="/sms-api"]').nth(1);
        this.wirelessCard = page.locator('a[href*="/iot-sim-card"]').nth(1);
        this.whatsappApiCard = page.locator('a[href*="/whatsapp-api"]').nth(1);
        this.videoApiCard = page.locator('a[href="/products/video"]').nth(1);
        this.voiceApiCard = page.locator('a[href="/products/voice-api"]').nth(1);
        this.truckingCard = page.locator('a[href="/products/sip-trunks"]').nth(1);
        this.smsPricingLink = page.locator('a[href*="/pricing/messaging"]').nth(1);
        this.whatsappPricingLink = page.locator('a[href*="/pricing/whatsapp"]').nth(1);
        this.wikiVideoApiLink = page.locator('a[href*="/docs/api/v2/video"]').nth(0);
        this.simPointsOfSaleLink = page.locator('a[href*="sim-card/point-of-sale"]');
        this.callControlGuideLink = page.locator('a[href*="/call-control/quickstart"]').nth(0);
        this.elasticSipPricingLink = page.locator('a[href="/pricing/elastic-sip"]').nth(1);
        this.exploreProductsButton = page.locator('a[href="/products"]').nth(1);
        this.productFaxLink = page.locator('a[href="/products/fax-api"]').nth(0);
        this.numberLookupTermsLink = page.locator('a[href="#number-lookup-terms"]');
        this.callForwadingCard = page.locator('a[href*="call-forwarding"]');
        this.signUpButton = page.locator('a[href="/sign-up"]').nth(1);
        this.emailInput = page.locator('input[type="email"]');
        this.tryForFreeButton = page.locator('button[type="submit"]');
    }

    async visit() {
        await this.page.goto('');
    }

    async scrollToPowerfulProducts() {
        await this.wirelessCard.scrollIntoViewIfNeeded();
    }

    async clickMessagingApiCard() {
        await this.messagingApiCard.click();
    }

    async clickWhatsappApiCard() {
        await this.whatsappApiCard.click();
    }

    async clickVideoApiCard() {
        await this.videoApiCard.click();
    }

    async clickWirelessCard() {
        await this.wirelessCard.click();
    }

    async clickVoiceApiCard() {
        await this.voiceApiCard.click();
    }

    async clickTruckingCard() {
        await this.truckingCard.click();
    }

    async clickExploreProductsButton() {
        await this.exploreProductsButton.click();
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async clickTryForFreeButton() {
        await this.tryForFreeButton.click();
    }

    async fillEmailInput(someText: string) {
        await this.emailInput.fill(someText)
    }

    async checkCookiesMessageBox() {
        if (this.cookiesClose !== null) {
            await this.cookiesClose.click();
        }
    }
}