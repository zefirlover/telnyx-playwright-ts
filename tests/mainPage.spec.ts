import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainpage/Main.page';
import { SignUpPage } from '../pages/signUp.page';
import { Header } from '../pages/mainpage/Header.page';
import Helpers from '../helpers/helper';

test.describe('main page testing', () => {
    const randomEmail = `${Helpers.makeLorem()}@gmail.com`;

    test.beforeEach(async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.visit();
        await mainPage.checkCookiesMessageBox();
    });

    test('TNP-01 Verify the main page', async ({ page }) => {
        let mainPage = new MainPage(page);
        await expect(mainPage.emailConfirmForm).toBeVisible();
    })

    test(`TNP-03 Verify the 'Powerful products' cards table`, async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.scrollToPowerfulProducts();
        await expect(mainPage.wirelessCard).toBeVisible();
    })

    test(`TNP-04 Verify the 'Messaging API' card works`, async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.scrollToPowerfulProducts();
        await mainPage.clickMessagingApiCard();
        await expect(mainPage.smsPricingLink).toBeVisible();
    })

    test(`TNP-06 Verify the 'Video API' card works`, async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.scrollToPowerfulProducts();
        await mainPage.clickVideoApiCard();
        await expect(mainPage.wikiVideoApiLink).toBeVisible();
    })

    test(`TNP-07 Verify the 'Wireless' card works`, async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.scrollToPowerfulProducts();
        await mainPage.clickWirelessCard();
        await expect(mainPage.simPointsOfSaleLink).toBeVisible();
    })

    test(`TNP-08 Verify the 'Voice API' card works`, async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.scrollToPowerfulProducts();
        await mainPage.clickVoiceApiCard();
        await expect(mainPage.callControlGuideLink).toBeVisible();
    })

    test(`TNP-09 Verify the 'Elastic SIP Trunking' card works`, async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.scrollToPowerfulProducts();
        await mainPage.clickTruckingCard();
        await expect(mainPage.elasticSipPricingLink).toBeVisible();
    })

    test(`TNP-10 Verify the 'Explore our products' button in 'Powerful products' cards table works`, async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.scrollToPowerfulProducts();
        await expect(mainPage.exploreProductsButton).toBeVisible();
        await mainPage.clickExploreProductsButton();
        await expect(mainPage.productFaxLink).toBeVisible();
    })

    test(`TNP-17 Verify the 'Global Numbers' link in 'Products' tab dropdownlist works`, async ({ page }) => {
        let mainPage = new MainPage(page);
        let header = new Header(page);
        await expect(header.globalNumbersLink).not.toBeVisible();
        await expect(header.productsSpan).toBeVisible();
        await header.clickProduct();
        await expect(header.globalNumbersLink).toBeVisible();
        await header.clickGlobalNumbersLink();
        await expect(mainPage.callForwadingCard).toBeVisible();
    })

    test(`TNP-18 Verify the 'Video API' link in 'Products' tab dropdownlist works`, async ({ page }) => {
        let mainPage = new MainPage(page);
        let header = new Header(page);
        await expect(header.videoApiLink).not.toBeVisible();
        await expect(header.productsSpan).toBeVisible();
        await header.clickProduct();
        await expect(header.videoApiLink).toBeVisible();
        await header.clickVideoApiLink();
        await expect(mainPage.wikiVideoApiLink).toBeVisible();
    })

    test('TNP-26 Verify the email input in EmailFormCtaForm on the main page', async ({ page }) => {
        let mainPage = new MainPage(page);
        let signUpPage = new SignUpPage(page);
        await expect(mainPage.emailInput).toBeVisible();
        await expect(mainPage.tryForFreeButton).toBeVisible();
        await mainPage.fillEmailInput(randomEmail);
        await mainPage.clickTryForFreeButton();
        await expect(signUpPage.emailInput).toBeVisible();
        await expect(signUpPage.emailInput).toHaveValue(randomEmail)
    })

    test('TNP-27 Test the email input in Email Form with incorrect data', async ({ page }) => {
        let mainPage = new MainPage(page);
        await expect(mainPage.emailInput).toBeVisible();
        await expect(mainPage.tryForFreeButton).toBeVisible();
        await mainPage.fillEmailInput('testAtgmail.com');
        await mainPage.clickTryForFreeButton();
        await expect(mainPage.emailInput).toBeVisible();
        await expect(mainPage.tryForFreeButton).toBeVisible();
        await mainPage.fillEmailInput('@gmail');
        await mainPage.clickTryForFreeButton();
        await expect(mainPage.emailInput).toBeVisible();
        await expect(mainPage.tryForFreeButton).toBeVisible();
    })
})