import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './Base.page';

export class TwilioPriceCalcPage extends BasePage {
    readonly page: Page;
    readonly messagingApiPlate: Locator;
    readonly continueButton: Locator;
    readonly continueButtonByText: Locator;
    readonly submitButton: Locator;
    readonly inputsList: Locator;
    readonly yourSavingsText: Locator;
    readonly sendSmsInput: Locator;
    readonly receiveSmsInput: Locator;
    readonly sendMmsInput: Locator;
    readonly receiveMmsInput: Locator;
    readonly inboundLocalInput: Locator;
    readonly inboundTollFreeInput: Locator;
    readonly outboundInput: Locator;
    readonly inboundCallInput: Locator;
    readonly outboundCallInput: Locator;
    readonly emailInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly websiteInput: Locator;
    readonly firstNameError: Locator;
    readonly lastNameError: Locator;
    readonly emailError: Locator;
    readonly websiteError: Locator;
    readonly formButton: Locator;

    constructor (page: Page) {
        super(page);
        this.page = page;
        this.continueButtonByText = page.locator('//button[text()="Continue"]');
        this.messagingApiPlate = page.locator('[class="sc-a87e7459-1 gFVaeZ"]').nth(0);
        this.continueButton = page.locator('main *> button:not([aria-label])');
        this.submitButton = page.locator('button[type="submit"]');
        this.inputsList = page.locator('[class="sc-a87e7459-0 fkuRxe"]');
        this.yourSavingsText = page.locator('[class="Text-sc-5o8owa-0 sc-c7d3cfaa-1 gBsjXt fdlLDD"]');
        this.sendSmsInput = page.locator('#send-sms');
        this.receiveSmsInput = page.locator('#receive-sms');
        this.sendMmsInput = page.locator('#send-mms');
        this.receiveMmsInput = page.locator('#receive-mms');
        this.inboundLocalInput = page.locator('#receive-inbound-calls-to-local-numbers');
        this.inboundTollFreeInput = page.locator('#receive-inbound-calls-to-toll-free-numbers');
        this.outboundInput = page.locator('#make-outbound-calls');
        this.inboundCallInput = page.locator('#receive-inbound-calls-with-call-control');
        this.outboundCallInput = page.locator('#make-outbound-calls-with-call-control');
        this.emailInput = page.locator('#Email');
        this.firstNameInput = page.locator('#FirstName');
        this.lastNameInput = page.locator('#LastName');
        this.websiteInput = page.locator('#Website');
        this.firstNameError = page.locator('#FirstName_error');
        this.lastNameError = page.locator('#LastName_error');
        this.emailError = page.locator('#Email_error');
        this.websiteError = page.locator('#Website_error');
    }

    async visit() {
        await this.page.goto('https://telnyx.com/twilio-pricing-calculator');
    }

    async clickMessagingApiPlate() {
        let box = await this.messagingApiPlate.boundingBox();
        if (box == null) {
            throw new Error('"box" is null. Possibly, element is not visible');
        }
        let checkedPlate = this.page.locator('[class*="ictSrj"]');
        await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        if (await checkedPlate.count() == 0) {
            this.messagingApiPlate.click();
        }
    }

    async clickOnPlate(plateText: string) {
        let plateLocator = this.page.locator(`//div[text()="${plateText}"]/parent::div`)
        let box = await plateLocator.boundingBox();
        if (box == null) {
            throw new Error('"box" is null. Possibly, element is not visible');
        }
        await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }

    async clickContinueButton() {
        let box = await this.continueButtonByText.boundingBox();
        if (box == null) {
            throw new Error('"box" is null. Possibly, element is not visible');
        }
        let displayedContinueButton = this.page.locator('button[class*="hBNXWZ"]');
        await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        if (await displayedContinueButton.count() >= 1) {
            await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        }
    }
    
    async clickSubmitButton() {
        this.submitButton.click();
    }

    async checkSavingsDecrease(inputLocator: Locator) {
        await expect(this.yourSavingsText).toBeVisible();
        await expect(inputLocator).toBeVisible();
        let moreSavingsStr = await this.yourSavingsText.innerText();
        let inputValue = await inputLocator.inputValue();
        let insertData: number;
        +inputValue <= 0? insertData = 0: insertData = +inputValue - 25000;
        await inputLocator.fill(insertData.toString());
        await expect(this.yourSavingsText).toBeVisible();
        let lessSavingsStr = await this.yourSavingsText.innerText();
        let moreSavings = parseFloat(moreSavingsStr);
        let lessSavings = parseFloat(lessSavingsStr);
        if (moreSavings <= lessSavings) {
            throw new Error('lessSavings number cannot be bigger or equal to moreSavings number');
        }
    }

    async checkSavingsIncrease(inputLocator: Locator) {
        let moreSavingsStr = await this.yourSavingsText.innerText();
        let inputValue = await inputLocator.inputValue();
        let insertData: number;
        +inputValue <= 0? insertData = 0: insertData = +inputValue + 25000;
        await inputLocator.fill(insertData.toString());
        let lessSavingsStr = await this.yourSavingsText.innerText();
        let moreSavings = parseFloat(moreSavingsStr);
        let lessSavings = parseFloat(lessSavingsStr);
        if (moreSavings >= lessSavings) {
            throw new Error('lessSavings number cannot be bigger or equal to moreSavings number');
        }
    }

    async scrollToCalculatorDiv() {
        this.inputsList.scrollIntoViewIfNeeded();
    }

    async scrollToSubmitButton() {
        this.submitButton.scrollIntoViewIfNeeded();
    }
}