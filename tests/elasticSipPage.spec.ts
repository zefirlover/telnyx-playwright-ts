import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainpage/Main.page';
import { ElasticSipPage } from '../pages/ElasticSip.page';
const arrCurrency = [
    { id: 0, name: 'USD', currency: '$' },
    { id: 1, name: 'AUD', currency: 'A*$' },
    { id: 2, name: 'GBP', currency: '£' },
    { id: 3, name: 'EUR', currency: '€' }
]

test.describe('testing the elastic sip pricing page', () => {
    test.beforeEach(async ({ page }) => {
        let elasticSipPage = new ElasticSipPage(page);
        await elasticSipPage.visit();
        await elasticSipPage.checkCookiesMessageBox();
    });

    test('TNP-30 Verify the Elastic SIP Trunking Pricing page', async ({ page }) => {
        let mainPage = new MainPage(page);
        let elasticSipPage = new ElasticSipPage(page);
        await mainPage.visit();
        await expect(mainPage.elasticSipPricingLink).toBeVisible();
        await mainPage.clickElasticSipPricingLink();
        await expect(elasticSipPage.chooseCurrencyListbox).toBeVisible();
    })

    test('TNP-31 Verify the currency was changed when the currency was changed in the listbox', async ({ page }) => {
        let elasticSipPage = new ElasticSipPage(page);
        await expect(elasticSipPage.chooseCurrencyListbox).toBeVisible();
        await elasticSipPage.clickChooseCurrencyListbox();
        for (let i = 0; i < arrCurrency.length; i++) {
            let element = arrCurrency.find(e => e.id === i);
            let currency = new RegExp(`${element.currency}`);
            let locator = page.locator(`//*[@role="option"]/div[text()="${element.name}"]`);
            await expect(locator).toBeVisible();
            await locator.click();
            await elasticSipPage.clickChooseCurrencyListbox();
            await elasticSipPage.allPriceTextContains(currency);
        }
    })
})