import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainpage/Main.page';
import { ElasticSipPage } from '../pages/ElasticSip.page';

test.describe('testing the elastic sip pricing page', () => {
    test('TNP-30 Verify the Elastic SIP Trunking Pricing page', async ({ page }) => {
        let mainPage = new MainPage(page);
        let elasticSipPage = new ElasticSipPage(page);
        await mainPage.visit();
        await mainPage.checkCookiesMessageBox();
        await expect(mainPage.elasticSipPricingLink).toBeVisible();
        await mainPage.clickElasticSipPricingLink();
        await expect(elasticSipPage.chooseCurrencyListbox).toBeVisible();
    })

    test('TNP-31 Verify the currency was changed when the currency was changed in the listbox', async ({ page }) => {
        let mainPage = new MainPage(page);
        let elasticSipPage = new ElasticSipPage(page);
        await elasticSipPage.visit();
        await mainPage.checkCookiesMessageBox();
        await expect(elasticSipPage.chooseCurrencyListbox).toBeVisible();
        await elasticSipPage.clickChooseCurrencyListbox();
        await expect(elasticSipPage.usdCurrencyOption).toBeVisible();
        await expect(elasticSipPage.usdCurrencyOption).toHaveAttribute('aria-selected', 'true');
        await elasticSipPage.allPriceTextContains(/$/);
        await expect(elasticSipPage.audCurrencyOption).toBeVisible();
        await elasticSipPage.clickAudCurrencyOption();
        await elasticSipPage.clickChooseCurrencyListbox();
        await expect(elasticSipPage.audCurrencyOption).toHaveAttribute('aria-selected', 'true');
        await elasticSipPage.allPriceTextContains(/A$/);
        await expect(elasticSipPage.gbpCurrencyOption).toBeVisible();
        await elasticSipPage.clickGbpCurrencyOption();
        await elasticSipPage.clickChooseCurrencyListbox();
        await expect(elasticSipPage.gbpCurrencyOption).toHaveAttribute('aria-selected', 'true');
        await elasticSipPage.allPriceTextContains(/£/);
        await expect(elasticSipPage.eurCurrencyOption).toBeVisible();
        await elasticSipPage.clickEurCurrencyOption();
        await elasticSipPage.clickChooseCurrencyListbox();
        await expect(elasticSipPage.eurCurrencyOption).toHaveAttribute('aria-selected', 'true');
        await elasticSipPage.allPriceTextContains(/€/);
    })
})