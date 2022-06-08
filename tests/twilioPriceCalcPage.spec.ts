import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainpage/Main.page';
import { ElasticSipPage } from '../pages/ElasticSip.page';
import { TwilioPriceCalcPage } from '../pages/TwilioPriceCalc.page';

test.describe('testing the twilio price calculator page', () => {
    test.beforeEach(async ({ page }) => {
        let mainPage = new MainPage(page);
        let twilioPriceCalcPage = new TwilioPriceCalcPage(page);
        await twilioPriceCalcPage.visit();
        await mainPage.checkCookiesMessageBox();
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
        await twilioPriceCalcPage.scrollToCalculatorDiv();
        await twilioPriceCalcPage.clickMessagingApiPlate();
        await twilioPriceCalcPage.clickContinueButton();
        await twilioPriceCalcPage.clickContinueButton();
        await twilioPriceCalcPage.checkSavingsDecrease(twilioPriceCalcPage.decreaseFirstOptionButton);
        await twilioPriceCalcPage.checkSavingsDecrease(twilioPriceCalcPage.decreaseSecondOptionButton);
        await twilioPriceCalcPage.checkSavingsDecrease(twilioPriceCalcPage.decreaseThirdOptionButton);
        await twilioPriceCalcPage.checkSavingsIncrease(twilioPriceCalcPage.increaseFirstOptionButton);
        await twilioPriceCalcPage.checkSavingsIncrease(twilioPriceCalcPage.increaseSecondOptionButton);
        await twilioPriceCalcPage.checkSavingsIncrease(twilioPriceCalcPage.increaseThirdOptionButton);
    })

    test('TNP-34 Verify the Get the full price breakdown overlap is displayed', async ({ page }) => {
        let twilioPriceCalcPage = new TwilioPriceCalcPage(page);
        await twilioPriceCalcPage.scrollToCalculatorDiv();
        await twilioPriceCalcPage.messagingApiPlate.click();
        await twilioPriceCalcPage.clickMessagingApiPlate();
        await twilioPriceCalcPage.clickContinueButton();
        await twilioPriceCalcPage.clickContinueButton();
        await twilioPriceCalcPage.scrollToSubmitButton();
        await expect(twilioPriceCalcPage.emailInput).toBeVisible();
    })

    test('TNP-35 Verify all inputs in breakdown overlap are required', async ({ page }) => {
        let twilioPriceCalcPage = new TwilioPriceCalcPage(page);
        await twilioPriceCalcPage.scrollToCalculatorDiv();
        await twilioPriceCalcPage.messagingApiPlate.click();
        await twilioPriceCalcPage.clickMessagingApiPlate();
        await twilioPriceCalcPage.clickContinueButton();
        await twilioPriceCalcPage.clickContinueButton();
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