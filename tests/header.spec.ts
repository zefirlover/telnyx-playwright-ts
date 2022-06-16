import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainpage/Main.page';
import { Header } from '../pages/mainpage/Header.page';
const arrNavBarElements = [
    { id: 0, name: 'Products' },
    { id: 1, name: 'Solutions' },
    { id: 2, name: 'Resources' },
    { id: 3, name: 'Company' },
    { id: 4, name: 'Pricing' }
]
const arrProducts = [
    { id: 0, link: 'sip-trunks', checkText: 'SIP Trunks' },
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
        let mainPage = new MainPage(page);
        await mainPage.visit();
        await mainPage.checkCookiesMessageBox();
    });

    test('TNP-02 Verify the header hovers', async ({ page }) => {
        for (let i = 0; i < arrNavBarElements.length; i++) {
            let element = arrNavBarElements.find(e => e.id === i);
            let tabLocator = page.locator(`//*[@tabindex="0"]/span[text()="${element?.name}"]`);
            let linkLocator = page.locator(`header *> li *> a[href*="/${element?.name.toLowerCase()}"]`).first();
            await expect(tabLocator).toBeVisible();
            await expect(linkLocator).not.toBeVisible();
            await tabLocator.hover();
            await expect(linkLocator).toBeVisible();
        }
    })

    test(`TNP-11-16,41 part 1 Verify links in 'Products' tab dropdownlist works`, async ({ page }) => {
        let header = new Header(page);
        for (let i = 0; i < arrProducts.length - 4; i++) {
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

    test(`TNP-11-16,41 part 2 Verify links in 'Products' tab dropdownlist works`, async ({ page }) => {
        let header = new Header(page);
        for (let i = 4; i < arrProducts.length - 4; i++) {
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