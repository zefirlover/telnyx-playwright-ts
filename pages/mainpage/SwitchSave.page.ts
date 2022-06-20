import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Base.page';

export class SwitchSavePage extends BasePage {
    readonly page: Page;
    readonly buttonSms: Locator;
    readonly divScrollTo: Locator;
    readonly sendMessagesText: Locator;
    readonly receiveMessagesText: Locator;
    readonly startTrialButton: Locator;
    readonly contactUsLink: Locator;
    readonly telnyxPrice: Locator;
    readonly twilioPrice: Locator;
    readonly localRadio: Locator;
    readonly tollFreeRadio: Locator;
    readonly programmableVoiceNoRadio: Locator;
    readonly programmableVoiceYesRadio: Locator;
    readonly smsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.buttonSms = page.locator('//button[text()="SMS"]');
        this.divScrollTo = page.locator('div[class="sc-1e626587-1 fjgfOb"]');
        this.sendMessagesText = page.locator('//div[text()="Send messages"]');
        this.receiveMessagesText = page.locator('//div[text()="Receive messages"]');
        this.startTrialButton = page.locator('main *> div > a[href="https://telnyx.com/sign-up"]');
        this.contactUsLink = page.locator('main *> div > a[href="https://telnyx.com/contact-us"]');
        this.telnyxPrice = page.locator('main *> div > span > span');
        this.twilioPrice = page.locator('main *> span[class="sc-8fdf323d-13 KyHUb"]');
        this.localRadio = page.locator('//span[text()="Local numbers"]/parent::div');
        this.tollFreeRadio = page.locator('//span[text()="Toll-free numbers"]/parent::div');
        this.programmableVoiceNoRadio = page.locator('//span[text()="No"]/parent::div');
        this.programmableVoiceYesRadio = page.locator('//span[text()="Yes"]/parent::div');
        this.smsButton = page.locator('//button[text()="SMS"]');
    }

    async radioLocator(spanText: string) {
        await this.page.locator(`//span[text()="${spanText}"]/parent::div`);
    }

    async checkRadioIncrease(radioText: string) {
        let telnyxString1 = (await this.telnyxPrice.innerText()).replace(/,/gi, "");
        let telnyxPrice1 = Number(telnyxString1.replace(/\$/gi, ""));
        await this.page.locator(`//span[text()="${radioText}"]/parent::div`).click();
        let telnyxString2 = (await this.telnyxPrice.innerText()).replace(/,/gi, "");
        let telnyxPrice2 = Number(telnyxString2.replace(/\$/gi, ""));
        if(telnyxPrice1 >= telnyxPrice2) {
            throw new Error('lessSavings number cannot be bigger or equal to moreSavings number');
        }
    }

    async checkRadioDecrease(radioText: string) {
        let telnyxString1 = (await this.telnyxPrice.innerText()).replace(/,/gi, "");
        let telnyxPrice1 = Number(telnyxString1.replace(/\$/gi, ""));
        await this.page.locator(`//span[text()="${radioText}"]/parent::div`).click();
        let telnyxString2 = (await this.telnyxPrice.innerText()).replace(/,/gi, "");
        let telnyxPrice2 = Number(telnyxString2.replace(/\$/gi, ""));
        if(telnyxPrice1 <= telnyxPrice2) {
            throw new Error('lessSavings number cannot be bigger or equal to moreSavings number');
        }
    }
}