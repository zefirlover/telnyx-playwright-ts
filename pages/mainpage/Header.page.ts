import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Base.page'

export class Header extends BasePage {
    readonly page: Page;
    readonly productsTab: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.productsTab = page.locator(`//*[@tabindex="0"]/span[text()="Products"]`);
    }
}