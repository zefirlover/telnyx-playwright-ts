import { Page, Locator } from '@playwright/test';
import { BasePage } from './Base.page';

export class ContactUsPage extends BasePage {
    readonly page: Page;
    readonly salesMailtoLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.salesMailtoLink = page.locator('a[href="mailto:sales@telnyx.com"]');
    }

    async visit() {
        await this.page.goto('https://telnyx.com/contact-us');
    }
}