import { Page, Locator } from '@playwright/test';
import { MainPage } from './Main.page';

export class Header extends MainPage {
    readonly page: Page;
    readonly productsTab: Locator;
    readonly contactUsLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.productsTab = page.locator(`//*[@tabindex="0"]/span[text()="Products"]`);
        this.contactUsLink = page.locator('header *> ul a[href="/contact-us"]');
    }
}