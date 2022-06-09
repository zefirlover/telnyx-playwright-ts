import { Page, Locator } from '@playwright/test';

class Base {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async visit(url: string) {
        await this.page.goto(url);
    }

    async checkCookiesMessageBox() {
        let cookiesClose = this.page.locator('button[aria-label="close and deny"]');
        if (cookiesClose !== null) {
            await cookiesClose.click();
        }
    }

    async clickElement(elementLocator: string) {
        await this.page.locator(elementLocator).click();
    }

    async hoverElement(elementLocator: string) {
        await this.page.locator(elementLocator).hover();
    }

    async fillElement(elementLocator: string, filledText: string) {
        await this.page.locator(elementLocator).fill(filledText);
    }
}