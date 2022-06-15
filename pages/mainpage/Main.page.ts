import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Base.page';

export class MainPage extends BasePage {
    readonly page: Page;
    readonly emailConfirmForm: Locator;
    readonly wirelessCard: Locator;
    readonly elasticSipPricingLink: Locator;
    readonly signUpButton: Locator;
    readonly emailInput: Locator;
    readonly tryForFreeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.emailConfirmForm = page.locator('form[name="EmailFormCtaForm"]');
        this.wirelessCard = page.locator('main *> a[href*="/iot-sim-card"]');
        this.elasticSipPricingLink = page.locator('footer *> a[href="/pricing/elastic-sip"]');
        this.signUpButton = page.locator('header *> li *> a[href="/sign-up"]');
        this.emailInput = page.locator('input[type="email"]');
        this.tryForFreeButton = page.locator('button[type="submit"]');
    }

    async visit() {
        await this.page.goto('https://telnyx.com');
    }

    async scrollToPowerfulProducts() {
        await this.wirelessCard.scrollIntoViewIfNeeded();
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async clickTryForFreeButton() {
        await this.tryForFreeButton.click();
    }

    async clickElasticSipPricingLink() {
        await this.elasticSipPricingLink.click();
    }

    async fillEmailInput(someText: string) {
        await this.emailInput.fill(someText)
    }
}