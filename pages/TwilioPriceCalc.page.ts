import { Page, Locator, expect } from '@playwright/test';

export class TwilioPriceCalcPage {
    readonly page: Page;
    readonly messagingApiPlate: Locator;
    readonly continueButton: Locator;
    readonly calculatorDiv: Locator;
    readonly inputsList: Locator;
    readonly yourSavingsText: Locator;
    readonly decreaseFirstOptionButton: Locator;
    readonly decreaseSecondOptionButton: Locator;
    readonly decreaseThirdOptionButton: Locator;
    readonly increaseFirstOptionButton: Locator;
    readonly increaseSecondOptionButton: Locator;
    readonly increaseThirdOptionButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.calculatorDiv = page.locator('[class="sc-1d1c658f-0 iHDmXz"]');
        this.messagingApiPlate = page.locator('[class="sc-a87e7459-1 gFVaeZ"]').nth(0);
        this.continueButton = page.locator('[class="sc-5d3a275a-0 eKznVb"]').nth(4);
        this.inputsList = page.locator('[class="sc-a87e7459-0 fkuRxe"]');
        this.yourSavingsText = page.locator('[class*="Text-sc-5o8owa-0 sc-c7d3cfaa-1"]');
        this.decreaseFirstOptionButton = page.locator('[class="sc-5588e253-2 dyjmeu"]').nth(0);
        this.decreaseSecondOptionButton = page.locator('[class="sc-5588e253-2 dyjmeu"]').nth(2);
        this.decreaseThirdOptionButton = page.locator('[class="sc-5588e253-2 dyjmeu"]').nth(4);
        this.increaseFirstOptionButton = page.locator('[class="sc-5588e253-2 dyjmeu"]').nth(1);
        this.increaseSecondOptionButton = page.locator('[class="sc-5588e253-2 dyjmeu"]').nth(3);
        this.increaseThirdOptionButton = page.locator('[class="sc-5588e253-2 dyjmeu"]').nth(5);
    }

    async visit() {
        await this.page.goto('/twilio-pricing-calculator');
    }

    async clickMessagingApiPlate() {
        let box = await this.messagingApiPlate.boundingBox();
        await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }

    async clickContinueButton() {
        let box = await this.continueButton.boundingBox();
        await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }

    async checkSavingsDecrease(buttonLocator: Locator) {
        let moreSavingsStr = await this.yourSavingsText.innerText();
        await buttonLocator.click();
        let lessSavingsStr = await this.yourSavingsText.innerText();
        let moreSavings = parseFloat(moreSavingsStr);
        let lessSavings = parseFloat(lessSavingsStr);
        if(moreSavings <= lessSavings) {
            throw new Error('lessSavings number cannot be bigger or equal to moreSavings number');
        }
    }

    async checkSavingsIncrease(buttonLocator: Locator) {
        let moreSavingsStr = await this.yourSavingsText.innerText();
        await buttonLocator.click();
        let lessSavingsStr = await this.yourSavingsText.innerText();
        let moreSavings = parseFloat(moreSavingsStr);
        let lessSavings = parseFloat(lessSavingsStr);
        if(moreSavings >= lessSavings) {
            throw new Error('lessSavings number cannot be bigger or equal to moreSavings number');
        }
    }
}