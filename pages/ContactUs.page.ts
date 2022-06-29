import { Page, Locator } from '@playwright/test';
import { BasePage } from './Base.page';

export class ContactUsPage extends BasePage {
    readonly page: Page;
    readonly salesMailtoLink: Locator;
    readonly submitButton: Locator;
    readonly reasonError: Locator;
    readonly inputErrors: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.salesMailtoLink = page.locator('a[href="mailto:sales@telnyx.com"]');
        this.submitButton = page.locator('button[type="submit"]');
        this.reasonError = page.locator('#ValidMsgReason_for_Contact__c');
        this.inputErrors = page.locator('[aria-invalid="true"]');
    }

    async visit() {
        await this.page.goto('https://telnyx.com/contact-us');
    }

    async verifyInputErrorsAre5() {
        if (await this.inputErrors.count() != 5)
            throw new Error("inputErrors.count() must be equal 5");
    }
}