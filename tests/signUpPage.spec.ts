import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/signUp.page';
import { MainPage } from '../pages/mainpage/Main.page';
const arrIncorrectEmails = [
    { id: 0, email: 'testAtgmail.com' },
    { id: 1, email: '@gmail' },
    { id: 2, email: 'test@gmailcom' }
];
const arrIncorrectPasswords = [
    { id: 0, password: 'h' },
    { id: 1, password: 'huskthebest' },
    { id: 2, password: 'huskthebestt' },
    { id: 3, password: 'HUSKTHEBEST' },
    { id: 4, password: '7' },
    { id: 5, password: '*' },
    { id: 6, password: 'HuskTheBestt' },
    { id: 7, password: 'HuskTheBest75' },
    { id: 8, password: 'HuskTheBest_' }
]

test.describe('sign up page testing', () => {
    test.beforeEach(async ({ page }) => {
        let signUpPage = new SignUpPage(page);
        await signUpPage.visit();
        await signUpPage.checkCookiesMessageBox();
    })

    test('TNP-20 Verify the Sign Up page', async ({ page }) => {
        let mainPage = new MainPage(page);
        let signUpPage = new SignUpPage(page);
        await mainPage.visit();
        await expect(mainPage.signUpButton).toBeVisible();
        await mainPage.clickSignUpButton();
        await expect(signUpPage.emailInput).toBeVisible();
    })

    test('TNP-29 Verify the error messages on the Sign Up page are dislayed with empty inputs registration', async ({ page }) => {
        let signUpPage = new SignUpPage(page);
        await expect(signUpPage.emailInput).toBeVisible();
        await signUpPage.clickEmailInput();
        await expect(signUpPage.emailErrorMessage).not.toBeVisible();
        await expect(signUpPage.nameErrorMessage).not.toBeVisible();
        await expect(signUpPage.passwordRequirements).not.toBeVisible();
        await expect(signUpPage.nameInput).toBeVisible();
        await signUpPage.clickNameInput();
        await expect(signUpPage.emailErrorMessage).toBeVisible();
        await expect(signUpPage.nameErrorMessage).not.toBeVisible();
        await expect(signUpPage.passwordRequirements).not.toBeVisible();
        await expect(signUpPage.passwordInput).toBeVisible();
        await signUpPage.clickPasswordInput();
        await expect(signUpPage.emailErrorMessage).toBeVisible();
        await expect(signUpPage.nameErrorMessage).toBeVisible();
        await expect(signUpPage.passwordRequirements).toBeVisible();
        await expect(signUpPage.emailInput).toBeVisible();
        await signUpPage.clickEmailInput();
        await expect(signUpPage.emailErrorMessage).toBeVisible();
        await expect(signUpPage.nameErrorMessage).toBeVisible();
        await expect(signUpPage.passwordRequirements).toBeVisible();
        await expect(signUpPage.passwordErrors).toHaveCount(4);
    })

    test('TNP-22 Test the email validation on the Sign Up page with incorrect data', async ({ page }) => {
        let signUpPage = new SignUpPage(page);
        await expect(signUpPage.emailInput).toBeVisible();
        for (let i = 0; i < arrIncorrectEmails.length; i++) {
            let element = arrIncorrectEmails.find(e => e.id === i);
            if (element == undefined) {
                throw new Error('"element" is undefined');
            }
            await signUpPage.fillEmailInput(element.email);
            await signUpPage.clickNameInput();
            await expect(signUpPage.emailErrorMessage).toBeVisible();
        }
    })

    test('TNP-25 Verify the Show/Hide password button', async ({ page }) => {
        let signUpPage = new SignUpPage(page);
        await expect(signUpPage.passwordInput).toBeVisible();
        await expect(signUpPage.passwordInput).toHaveAttribute('type', 'password');
        await signUpPage.clickShowPasswordButton();
        await expect(signUpPage.passwordInput).toHaveAttribute('type', 'text');
        await signUpPage.clickShowPasswordButton();
        await expect(signUpPage.passwordInput).toHaveAttribute('type', 'password');
    })

    test('TNP-24 Test the password validation on the Sign Up page with incorrect data', async ({ page }) => {
        let signUpPage = new SignUpPage(page);
        await expect(signUpPage.passwordInput).toBeVisible();
        await signUpPage.clickPasswordInput();
        for (let i = 0; i < arrIncorrectPasswords.length; i++) {
            let element = arrIncorrectPasswords.find(e => e.id === i);
            if (element == undefined) {
                throw new Error('"element" is undefined');
            }
            if (/[A-Z]/.test(element.password)) {
                await signUpPage.fillPasswordInput(element.password);
                await expect(signUpPage.passwordRequirementErrors.nth(4)).toHaveAttribute('aria-hidden', 'true');
                await signUpPage.verifyErrorsAreLessThanFour();
            }
            if (element.password.length >= 12) {
                await signUpPage.fillPasswordInput(element.password);
                await expect(signUpPage.passwordRequirementErrors.nth(1)).toHaveAttribute('aria-hidden', 'true');
                await signUpPage.verifyErrorsAreLessThanFour();
            }
            if (/[0-9]/.test(element.password)) {
                await signUpPage.fillPasswordInput(element.password);
                await expect(signUpPage.passwordRequirementErrors.nth(2)).toHaveAttribute('aria-hidden', 'true');
                await signUpPage.verifyErrorsAreLessThanFour();
            }
            if (/[*|\":<>[\]{}`\\()';@&$]/.test(element.password)) {
                await signUpPage.fillPasswordInput(element.password);
                await expect(signUpPage.passwordRequirementErrors.nth(3)).toHaveAttribute('aria-hidden', 'true');
                await signUpPage.verifyErrorsAreLessThanFour();
            }
            if (!/[A-Z]/.test(element.password) && element.password.length < 12 
                && !/[0-9]/.test(element.password) && !/[*|\":<>[\]{}`\\()';@&$]/.test(element.password)) {
                await signUpPage.fillPasswordInput(element.password);
                await expect(signUpPage.passwordErrors).toHaveCount(4);
            }
        }
    })
})