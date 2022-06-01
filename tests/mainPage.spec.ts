import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainpage/Main.page';
import { Header } from '../pages/mainpage/Header.page';
import Helpers from '../helpers/helper';

test.describe('main page testing', () => {
    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.visit();
    });

    test('TNP-01 Verify the main page', async ({ page }) => {
        const mainPage = new MainPage(page);
        await expect(mainPage.emailConfirmForm).toBeVisible();
    })

    test('TNP-02 Verify the main page hovers', async ({ page }) => {
        const mainPage = new MainPage(page);
        const header = new Header(page);
        await mainPage.checkCookiesMessageBox();
        await expect(header.productsLink).not.toBeVisible();
        await header.clickProduct();
        await expect(header.productsLink).toBeVisible();
        await expect(header.solutionsLink).not.toBeVisible();
        await header.clickSolutions();
        await expect(header.solutionsLink).toBeVisible();
        await expect(header.resourcesLink).not.toBeVisible();
        await header.clickResources();
        await expect(header.resourcesLink).toBeVisible();
        await expect(header.companyLink).not.toBeVisible();
        await header.clickCompany();
        await expect(header.companyLink).toBeVisible();
        await expect(header.pricingLink).not.toBeVisible();
        await header.clickPricing();
        await expect(header.pricingLink).toBeVisible();
    })

    test(`TNP-03 Verify the 'Powerful products' cards table`, async ({ page }) => {
        const mainPage = new MainPage(page);
        await Helpers.goToPowerfulProducts(page);
        await expect(mainPage.wirelessCard).toBeVisible();
    })

    test(`TNP-04 Verify the 'Messaging API' card works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        await Helpers.goToPowerfulProducts(page);
        await mainPage.clickMessagingApiCard();
        await expect(mainPage.smsPricingLink).toBeVisible();
    })

    test(`TNP-05 Verify the 'WhatsApp API' card works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        await Helpers.goToPowerfulProducts(page);
        await mainPage.clickWhatsappApiCard();
        await expect(mainPage.whatsappApiCard).toBeVisible();
    })

    test(`TNP-06 Verify the 'Video API' card works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        await Helpers.goToPowerfulProducts(page);
        await mainPage.clickVideoApiCard();
        await expect(mainPage.wikiVideoApiLink).toBeVisible();
    })

    test(`TNP-07 Verify the 'Wireless' card works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        await Helpers.goToPowerfulProducts(page);
        await mainPage.clickWirelessCard();
        await expect(mainPage.simPointsOfSaleLink).toBeVisible();
    })

    test(`TNP-08 Verify the 'Voice API' card works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        await Helpers.goToPowerfulProducts(page);
        await mainPage.clickVoiceApiCard();
        await expect(mainPage.callControlGuideLink).toBeVisible();
    })

    test(`TNP-09 Verify the 'Elastic SIP Trunking' card works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        await Helpers.goToPowerfulProducts(page);
        await mainPage.clickTruckingCard();
        await expect(mainPage.elasticSipPricingLink).toBeVisible();
    })

    test(`TNP-10 Verify the 'Explore our products' button in 'Powerful products' cards table works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        await Helpers.goToPowerfulProducts(page);
        await expect(mainPage.exploreProductsButton).toBeVisible();
        await mainPage.clickExploreProductsButton();
        await expect(mainPage.productFaxLink).toBeVisible();
    })

    test(`TNP-12 Verify the 'Elastic SIP Trunking' link in 'Products' tab dropdownlist works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        const header = new Header(page);
        await mainPage.checkCookiesMessageBox();
        await expect(header.productsLink).not.toBeVisible();
        await expect(header.productsSpan).toBeVisible();
        await header.clickProduct();
        await expect(header.truckingLink).toBeVisible();
        await header.clickTrucking();
        await expect(mainPage.elasticSipPricingLink).toBeVisible();
    })

    test(`TNP-11 Verify the 'See all products' link in 'Products' tab dropdownlist works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        const header = new Header(page);
        await mainPage.checkCookiesMessageBox();
        await expect(header.productsLink).not.toBeVisible();
        await expect(header.productsSpan).toBeVisible();
        await header.clickProduct();
        await expect(header.productsLink).toBeVisible();
        await header.clickProductLink();
        await expect(mainPage.productFaxLink).toBeVisible();
    })

    test(`TNP-13 Verify the 'Voice API' link in 'Products' tab dropdownlist works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        const header = new Header(page);
        await mainPage.checkCookiesMessageBox();
        await expect(header.voiceApiLink).not.toBeVisible();
        await expect(header.productsSpan).toBeVisible();
        await header.clickProduct();
        await expect(header.voiceApiLink).toBeVisible();
        await header.clickVoiceApiLink();
        await expect(mainPage.callControlGuideLink).toBeVisible();
    })

    test(`TNP-14 Verify the 'SMS API' link in 'Products' tab dropdownlist works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        const header = new Header(page);
        await mainPage.checkCookiesMessageBox();
        await expect(header.smsApiLink).not.toBeVisible();
        await expect(header.productsSpan).toBeVisible();
        await header.clickProduct();
        await expect(header.smsApiLink).toBeVisible();
        await header.clickSmsApiLink();
        await expect(mainPage.smsPricingLink).toBeVisible();
    })

    test(`TNP-15 Verify the 'Wireless' link in 'Products' tab dropdownlist works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        const header = new Header(page);
        await mainPage.checkCookiesMessageBox();
        await expect(header.wirelessLink).not.toBeVisible();
        await expect(header.productsSpan).toBeVisible();
        await header.clickProduct();
        await expect(header.wirelessLink).toBeVisible();
        await header.clickWirelessLink();
        await expect(mainPage.simPointsOfSaleLink).toBeVisible();
    })

    test(`TNP-16 Verify the 'Number Lookup' link in 'Products' tab dropdownlist works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        const header = new Header(page);
        await mainPage.checkCookiesMessageBox();
        await expect(header.numberLookupLink).not.toBeVisible();
        await expect(header.productsSpan).toBeVisible();
        await header.clickProduct();
        await expect(header.numberLookupLink).toBeVisible();
        await header.clickNumberLookupLink();
        await expect(mainPage.numberLookupTermsLink).toBeVisible();
    })

    test(`TNP-17 Verify the 'Global Numbers' link in 'Products' tab dropdownlist works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        const header = new Header(page);
        await mainPage.checkCookiesMessageBox();
        await expect(header.globalNumbersLink).not.toBeVisible();
        await expect(header.productsSpan).toBeVisible();
        await header.clickProduct();
        await expect(header.globalNumbersLink).toBeVisible();
        await header.clickGlobalNumbersLink();
        await expect(mainPage.callForwadingCard).toBeVisible();
    })

    test(`TNP-18 Verify the 'Video API' link in 'Products' tab dropdownlist works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        const header = new Header(page);
        await mainPage.checkCookiesMessageBox();
        await expect(header.videoApiLink).not.toBeVisible();
        await expect(header.productsSpan).toBeVisible();
        await header.clickProduct();
        await expect(header.videoApiLink).toBeVisible();
        await header.clickVideoApiLink();
        await expect(mainPage.wikiVideoApiLink).toBeVisible();
    })

    test(`TNP-19 Verify the 'WhatsApp Business API' link in 'Products' tab dropdownlist works`, async ({ page }) => {
        const mainPage = new MainPage(page);
        const header = new Header(page);
        await mainPage.checkCookiesMessageBox();
        await expect(header.whatsappApiLink).not.toBeVisible();
        await expect(header.productsSpan).toBeVisible();
        await header.clickProduct();
        await expect(header.whatsappApiLink).toBeVisible();
        await header.clickWhatsappApiLink();
        await expect(mainPage.whatsappPricingLink).toBeVisible();
    })
})