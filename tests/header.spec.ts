import { test, expect, Page } from '@playwright/test';
import { Header } from '../pages/mainpage/Header.page';
const navBarItems = ['Products', 'Solutions', 'Resources', 'Company', 'Pricing'];
let page: Page;
let header: any;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    header = new Header(page);
    await header.visit('');
})
test.afterAll(async ({ browser }) => {
    await browser.close();
})

test.describe('header functionality tests', () => {
    test.beforeEach(async () => {
        await header.visit('');
        await header.checkCookiesMessageBox();
    });

    test('TNP-02 Verify the main page hovers', async () => {
        for(let item in navBarItems) {
            await header.hoverNavBarElement(item);
            await expect(header.verificationLinks(item)).toBeVisible();
        }
    })
})