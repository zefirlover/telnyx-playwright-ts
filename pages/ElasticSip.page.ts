import { Page, Locator } from '@playwright/test';

export class ElasticSipPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}