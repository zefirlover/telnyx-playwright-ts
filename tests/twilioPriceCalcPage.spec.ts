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
        //await twilioPriceCalcPage.clickContinueButton();
        await twilioPriceCalcPage.continueButton.click();
        await twilioPriceCalcPage.calculatorDiv.click();
        //await twilioPriceCalcPage.clickContinueButton();
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
/* fix this piece of shit later
    test('TNP-33 Verify the twilio price calculator functionality', async ({ page }) => {
        let twilioPriceCalcPage = new TwilioPriceCalcPage(page);
        let calcInputs = [
            { id: 0, locator: twilioPriceCalcPage.sendSmsInput },
            { id: 1, locator: twilioPriceCalcPage.receiveSmsInput },
            { id: 2, locator: twilioPriceCalcPage.sendMmsInput },
            { id: 3, locator: twilioPriceCalcPage.receiveMmsInput }
        ]
        for (let i = 0; i < calcInputs.length; i++) {
            let element = calcInputs.find(e => e.id === i);
            if (element == undefined) {
                throw new Error('"element" is undefined');
            }
            twilioPriceCalcPage.checkSavingsDecrease(element.locator);
            twilioPriceCalcPage.checkSavingsIncrease(element.locator);
        }
    })
*/
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