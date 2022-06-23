import { test, expect } from '@playwright/test';
import { ContactUsPage } from '../pages/ContactUs.page';
import { Header } from '../pages/mainpage/Header.page';

test.describe('contact us page testing', () => {
    test.beforeEach(async ({ page }) => {
        let contactUsPage = new ContactUsPage(page);
        await contactUsPage.visit();
        await contactUsPage.checkCookiesMessageBox();
    });

    test('TNP-49 Verify the contact us page', async ({ page }) => {
        let header = new Header(page);
        let contactUsPage = new ContactUsPage(page);
        await header.visit();
        await header.contactUsLink.click();
        await expect(contactUsPage.salesMailtoLink).toBeVisible();
    })
})