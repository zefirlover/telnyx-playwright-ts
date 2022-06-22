import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainpage/Main.page';
import { SwitchSavePage } from '../pages/mainpage/SwitchSave.page';
import { SignUpPage } from '../../telnyx-playwright-ts/pages/SignUp.page';
import { ContactUsPage } from '../../telnyx-playwright-ts/pages/ContactUs.page';

test.describe('switch + save form testing', () => {
    test.beforeEach(async ({ page }) => {
        let mainPage = new MainPage(page);
        let switchSavePage = new SwitchSavePage(page);
        await mainPage.visit();
        await mainPage.checkCookiesMessageBox();
        await switchSavePage.divScrollTo.scrollIntoViewIfNeeded();
        await page.waitForSelector('main *> div > span > span');
    });

    test('TNP-43 Verify the Switch + Save form is displayed', async ({ page }) => {
        let switchSavePage = new SwitchSavePage(page);
        await expect(switchSavePage.buttonSms).toBeVisible();
    });

    test('TNP-44 Verify the SMS button works on Switch + Save form',async ({ page }) => {
        let switchSavePage = new SwitchSavePage(page);
        await expect(switchSavePage.buttonSms).toBeVisible();
        await switchSavePage.buttonSms.click();
        await expect(switchSavePage.sendMessagesText).toBeVisible();
        await expect(switchSavePage.receiveMessagesText).toBeVisible();
    });

    test('TNP-45 Verify the "Create a free trial account" works on Switch + Save form', async ({ page }) => {
        let switchSavePage = new SwitchSavePage(page);
        let signUpPage = new SignUpPage(page);
        await expect(switchSavePage.startTrialButton).toBeVisible();
        await switchSavePage.startTrialButton.click();
        await expect(signUpPage.emailInput).toBeVisible();
    });

    test('TNP-46 Verify the "speak to our experts" works on Switch + Save form', async ({ page }) => {
        let switchSavePage = new SwitchSavePage(page);
        let contactUsPage = new ContactUsPage(page);
        await expect(switchSavePage.contactUsLink).toBeVisible();
        await switchSavePage.contactUsLink.click();
        await expect(contactUsPage.salesMailtoLink).toBeVisible();
    });

    test('TNP-47 Verify all radios works on Switch + Save form', async ({ page }) => {
        let switchSavePage = new SwitchSavePage(page);
        await switchSavePage.checkRadioDecrease('Toll-free numbers');
        await switchSavePage.checkRadioIncrease('Local numbers');
        await switchSavePage.checkRadioDecrease('No');
        await switchSavePage.checkRadioIncrease('Yes');
        await switchSavePage.smsButton.click();
        await switchSavePage.checkRadioIncrease('Toll-free numbers');
        await switchSavePage.checkRadioDecrease('Local numbers');
    });

    test('TNP-48 Verify all sliders works on Switch + Save form', async ({ page }) => {
        let switchSavePage = new SwitchSavePage(page);
        await switchSavePage.checkSlider('Make outbound calls');
        await switchSavePage.checkSlider('Receive inbound calls');
        await switchSavePage.smsButton.click();
        await switchSavePage.checkSlider('Send messages');
        await switchSavePage.checkSlider('Receive messages');
    })
})