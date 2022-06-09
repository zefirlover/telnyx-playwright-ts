import { Page, Locator, expect } from '@playwright/test';

export class ElasticSipPage {
    readonly page: Page;
    readonly chooseCurrencyListbox: Locator;
    readonly usdCurrencyOption: Locator;
    readonly audCurrencyOption: Locator;
    readonly gbpCurrencyOption: Locator;
    readonly eurCurrencyOption: Locator;
    readonly priceText: Locator;
    readonly calculateSavingsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chooseCurrencyListbox = page.locator('button[aria-haspopup="listbox"]').nth(1);
        this.usdCurrencyOption = page.locator('//*[@role="option"]/div[text()="USD"]');
        this.audCurrencyOption = page.locator('//*[@role="option"]/div[text()="AUD"]');
        this.gbpCurrencyOption = page.locator('//*[@role="option"]/div[text()="GBP"]');
        this.eurCurrencyOption = page.locator('//*[@role="option"]/div[text()="EUR"]');
        this.priceText = page.locator('[class="sc-3ef5d51e-18 emWxIX"]');
        this.calculateSavingsLink = page.locator('a[href="/twilio-pricing-calculator"]').nth(1);
    }

    async visit() {
        await this.page.goto('/pricing/elastic-sip');
    }

    async clickChooseCurrencyListbox() {
        await this.chooseCurrencyListbox.click();
    }

    async clickAudCurrencyOption() {
        await this.audCurrencyOption.click();
    }

    async clickGbpCurrencyOption() {
        await this.gbpCurrencyOption.click();
    }

    async clickEurCurrencyOption() {
        await this.eurCurrencyOption.click();
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