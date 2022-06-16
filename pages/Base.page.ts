import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly cookiesClose: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cookiesClose = page.locator('button[aria-label="close and deny"]');
    }

    async checkCookiesMessageBox() {
        if (this.cookiesClose !== null) {
            await this.cookiesClose.click();
        }
    }
}