import { test, expect } from '@playwright/test';
import { ElasticSipPage } from '../pages/ElasticSip.page';
import { TwilioPriceCalcPage } from '../pages/TwilioPriceCalc.page';

test.describe('testing the twilio price calculator page', () => {
    test.beforeEach(async ({ page }) => {
        let twilioPriceCalcPage = new TwilioPriceCalcPage(page);
        await twilioPriceCalcPage.visit();
        await twilioPriceCalcPage.checkCookiesMessageBox();
        await twilioPriceCalcPage.scrollToCalculatorDiv();
        await twilioPriceCalcPage.clickMessagingApiPlate();
        await twilioPriceCalcPage.continueButton.click();
        await twilioPriceCalcPage.continueButtonByText.click();
    })

    test('TNP-32 Verify the twilio price calculator page', async ({ page }) => {
        let elasticSipPage = new ElasticSipPage(page);
        let twilioPriceCalcPage = new TwilioPriceCalcPage(page);
        await elasticSipPage.visit();
        await expect(elasticSipPage.calculateSavingsLink).toBeVisible();
        await elasticSipPage.clickCalculateSavingsLink();
        await twilioPriceCalcPage.scrollToCalculatorDiv();
        await expect(twilioPriceCalcPage.inputsList).toBeVisible();
    })

    test('TNP-33 Verify the twilio price calculator functionality', async ({ page }) => {
        let twilioPriceCalcPage = new TwilioPriceCalcPage(page);
        let calcInputs = [
            twilioPriceCalcPage.sendSmsInput,
            twilioPriceCalcPage.receiveSmsInput,
            twilioPriceCalcPage.sendMmsInput,
            twilioPriceCalcPage.receiveMmsInput
        ]
        await twilioPriceCalcPage.receiveMmsInput.scrollIntoViewIfNeeded();
        await twilioPriceCalcPage.page.waitForSelector('#send-sms');
        for (let i = 0; i < calcInputs.length; i++) {
            if (calcInputs[i] == undefined) {
                throw new Error('"element" is undefined');
            }
            await twilioPriceCalcPage.checkSavingsDecrease(calcInputs[i]);
            await twilioPriceCalcPage.checkSavingsIncrease(calcInputs[i]);
        }
    })

    test('TNP-34 Verify the Get the full price breakdown overlap is displayed', async ({ page }) => {
        let twilioPriceCalcPage = new TwilioPriceCalcPage(page);
        await twilioPriceCalcPage.scrollToSubmitButton();
        await expect(twilioPriceCalcPage.emailInput).toBeVisible();
    })

    test('TNP-35 Verify all inputs in breakdown overlap are required', async ({ page }) => {
        let twilioPriceCalcPage = new TwilioPriceCalcPage(page);
        await twilioPriceCalcPage.scrollToSubmitButton();
        await expect(twilioPriceCalcPage.firstNameInput).toHaveValue('');
        await expect(twilioPriceCalcPage.lastNameInput).toHaveValue('');
        await expect(twilioPriceCalcPage.emailInput).toHaveValue('');
        await expect(twilioPriceCalcPage.websiteInput).toHaveValue('');
        await expect(twilioPriceCalcPage.submitButton).toBeVisible();
        await twilioPriceCalcPage.clickSubmitButton();
        await expect(twilioPriceCalcPage.firstNameError).toBeVisible();
        await expect(twilioPriceCalcPage.lastNameError).toBeVisible();
        await expect(twilioPriceCalcPage.emailError).toBeVisible();
        await expect(twilioPriceCalcPage.websiteError).toBeVisible();
    })
})