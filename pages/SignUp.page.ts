import { Page, Locator } from '@playwright/test';
import { BasePage } from './Base.page';

export class SignUpPage extends BasePage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly nameInput: Locator;
    readonly passwordInput: Locator;
    readonly createAccountButton: Locator;
    readonly emailErrorMessage: Locator;
    readonly nameErrorMessage: Locator;
    readonly passwordErrors: Locator;
    readonly passwordRequirements: Locator;
    readonly showPasswordButton: Locator;
    readonly passwordRequirementErrors: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.emailInput = page.locator('#email');
        this.nameInput = page.locator('#full_name');
        this.passwordInput = page.locator('#password');
        this.createAccountButton = page.locator('button[type="submit"]');
        this.emailErrorMessage = page.locator('#email_error');
        this.nameErrorMessage = page.locator('#full_name_error');
        this.passwordErrors = page.locator('div[aria-hidden="false"]');
        this.passwordRequirements = page.locator('#password_requirements');
        this.showPasswordButton = page.locator('//*[@data-icon="eye"]/parent::span/parent::div');
        this.passwordRequirementErrors = page.locator('#password_requirements div');
    }

    async visit() {
        await this.page.goto('https://telnyx.com/sign-up');
    }

    async clickCreateAccountButton() {
        await this.createAccountButton.click();
    }

    async clickNameInput() {
        await this.nameInput.click();
    }

    async clickEmailInput() {
        await this.emailInput.click();
    }

    async clickPasswordInput() {
        await this.passwordInput.click();
    }
    
    async clickShowPasswordButton() {
        await this.showPasswordButton.click();
    }

    async fillEmailInput(someText: string) {
        await this.emailInput.fill(someText);
    }

    async fillPasswordInput(someText: string) {
        await this.passwordInput.fill(someText);
    }

    async verifyErrorsAreLessThanFour() {
        if (await this.passwordErrors.count() >= 4) {
            throw new Error('too many password errors');
        }
    }
}