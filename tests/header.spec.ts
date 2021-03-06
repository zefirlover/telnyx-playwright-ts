import { test, expect } from '@playwright/test';
import { Header } from '../pages/mainpage/Header.page';
const arrNavBarElements = [ 'Products', 'Solutions', 'Resources', 'Company', 'Pricing' ]
const arrProducts = [
    { id: 0, link: 'sip-trunks', checkText: 'SIP Trunking' },
    { id: 1, link: 'voice-api', checkText: 'Voice API' },
    { id: 2, link: 'sms-api', checkText: 'Send and receive texts' },
    { id: 3, link: 'iot-sim-card', checkText: 'IoT SIM Cards' },
    { id: 4, link: 'number-lookup', checkText: 'behind every number' },
    { id: 5, link: 'phone-numbers', checkText: 'phone numbers' },
    { id: 6, link: 'video', checkText: 'integrated video solution' },
    { id: 7, link: 'storage', checkText: 'cloud storage' }
]

test.describe('header testing', () => {
    test.beforeEach(async ({ page }) => {
        let header = new Header(page);
        await header.visit();
        await header.checkCookiesMessageBox();
    });

    test('TNP-02 Verify the header hovers', async ({ page }) => {
        for (let i = 0; i < arrNavBarElements.length; i++) {
            let tabLocator = page.locator(`//*[@tabindex="0"]/span[text()="${arrNavBarElements[i]}"]`);
            let linkLocator = page.locator(`header *> li *> a[href*="/${arrNavBarElements[i].toLowerCase()}"]`).first();
            await expect(tabLocator).toBeVisible();
            await expect(linkLocator).not.toBeVisible();
            await tabLocator.hover();
            await expect(linkLocator).toBeVisible();
        }
    })

    test(`TNP-11-16,41 Verify links in 'Products' tab dropdownlist works`, async ({ page }) => {
        let header = new Header(page);
        test.setTimeout(120000);
        for (let i = 0; i < arrProducts.length; i++) {
            let element = arrProducts.find(e => e.id === i);
            let redirectLink = page.locator(`header *> li *> a[href*="/${element?.link}"]`).first();
            let headerText = page.locator(`
                //h1//strong[contains(text(), '${element?.checkText}')]|//h1//span[contains(text(), '${element?.checkText}')]
            `)
            await header.productsTab.hover();
            await expect(redirectLink).toBeVisible();
            await redirectLink.click();
            await expect(headerText).toBeVisible();
        }
    })
})