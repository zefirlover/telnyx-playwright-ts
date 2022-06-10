import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './Base.page';

export class ElasticSipPage extends BasePage {
    readonly page: Page;
    readonly chooseCurrencyListbox: Locator;
    readonly usdCurrencyOption: Locator;
    readonly audCurrencyOption: Locator;
    readonly gbpCurrencyOption: Locator;
    readonly eurCurrencyOption: Locator;
    readonly priceText: Locator;
    readonly calculateSavingsLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.chooseCurrencyListbox = page.locator('button[aria-haspopup="listbox"]').nth(1);
        this.priceText = page.locator('[class="sc-3ef5d51e-18 emWxIX"]');
        this.calculateSavingsLink = page.locator('a[href="/twilio-pricing-calculator"]').nth(1);
    }

    async visit() {
        await this.page.goto('/pricing/elastic-sip');
    }

    async clickChooseCurrencyListbox() {
        await this.chooseCurrencyListbox.click();
    }

    async clickCalculateSavingsLink() {
        await this.calculateSavingsLink.click();
    }

    async allPriceTextContains(currency: RegExp) {
        let exceptions: number[] = [2, 4, 5, 8, 9, 20]
        for (let i = 0; i < 31; i++) {
            if (exceptions.find(exception => exception == i) == null) {
                await expect(this.priceText.nth(i)).toHaveText(currency);
            }
        }
    }
}