import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainpage/Main.page';
import { SignUpPage } from '../../telnyx-playwright-ts/pages/SignUp.page';
import Helpers from '../helpers/helper';
const arrProducts1 = [
    { id: 0, link: 'sms-api', checkText: 'Send and receive texts' },
    { id: 1, link: 'video', checkText: 'integrated video solution' }
];
const arrProducts2 = [
    { id: 0, link: 'iot-sim-card', checkText: 'IoT SIM Cards' },
    { id: 1, link: 'voice-api', checkText: 'Voice API' }
];
const arrProducts3 = [
    { id: 0, link: 'sip-trunks', checkText: 'SIP Trunks' },
    { id: 1, link: 'storage', checkText: 'cloud storage' }
];
const arrIncorrectEmails = [ 'testAtgmail.com', '@gmail' ]

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

    test(`TNP-03-10,42 part 1 Verify the 'Powerful products' cards table and it cards`, async ({ page }) => {
        let mainPage = new MainPage(page);
        for (let i = 0; i < arrProducts1.length; i++) {
            let element = arrProducts1.find(e => e.id === i);
            let cardLink = page.locator(`main *> a[href*="/${element?.link}"]`);
            let headerString = `//h1//strong[contains(text(), '${element?.checkText}')]|//h1//span[contains(text(), '${element?.checkText}')]`;
            let headerText = page.locator(headerString);
            await mainPage.scrollToPowerfulProducts();
            await cardLink.click();
            await expect(headerText).toBeVisible();
            await mainPage.visit();
        }
    })

    test(`TNP-03-10,42 part 2 Verify the 'Powerful products' cards table and it cards`, async ({ page }) => {
        let mainPage = new MainPage(page);
        for (let i = 0; i < arrProducts2.length; i++) {
            let element = arrProducts2.find(e => e.id === i);
            let cardLink = page.locator(`main *> a[href*="/${element?.link}"]`);
            let headerString = `//h1//strong[contains(text(), '${element?.checkText}')]|//h1//span[contains(text(), '${element?.checkText}')]`;
            let headerText = page.locator(headerString);
            await mainPage.scrollToPowerfulProducts();
            await cardLink.click();
            await expect(headerText).toBeVisible();
            await mainPage.visit();
        }
    })

    test(`TNP-03-10,42 part 3 Verify the 'Powerful products' cards table and it cards`, async ({ page }) => {
        let mainPage = new MainPage(page);
        for (let i = 0; i < arrProducts3.length; i++) {
            let element = arrProducts3.find(e => e.id === i);
            let cardLink = page.locator(`main *> a[href*="/${element?.link}"]`);
            let headerString = `//h1//strong[contains(text(), '${element?.checkText}')]|//h1//span[contains(text(), '${element?.checkText}')]`;
            let headerText = page.locator(headerString);
            await mainPage.scrollToPowerfulProducts();
            await cardLink.click();
            await expect(headerText).toBeVisible();
            await mainPage.visit();
        }
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
        for (let i = 0; i < arrIncorrectEmails.length; i++) {
            if (arrIncorrectEmails[i] == undefined) {
                throw new Error('"element" is undefined');
            }
            await expect(mainPage.emailInput).toBeVisible();
            await expect(mainPage.tryForFreeButton).toBeVisible();
            await mainPage.fillEmailInput(arrIncorrectEmails[i]);
            await mainPage.clickTryForFreeButton();
            await expect(mainPage.emailInput).toBeVisible();
            await expect(mainPage.tryForFreeButton).toBeVisible();
        }
    })
})