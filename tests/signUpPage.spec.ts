import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/signUp.page';
import { MainPage } from '../pages/mainpage/Main.page';

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
        await signUpPage.fillEmailInput('testatgmail.com');
        await signUpPage.clickNameInput();
        await expect(signUpPage.emailErrorMessage).toBeVisible();
        await signUpPage.fillEmailInput('test@gmailcom');
        await signUpPage.clickNameInput();
        await expect(signUpPage.emailErrorMessage).toBeVisible();
        await signUpPage.fillEmailInput('@gmail');
        await signUpPage.clickNameInput();
        await expect(signUpPage.emailErrorMessage).toBeVisible();
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
        await expect(signUpPage.passwordRequirements).toBeVisible();
        await expect(signUpPage.passwordErrors).toHaveCount(4);
        await signUpPage.fillPasswordInput('h');
        await expect(signUpPage.passwordErrors).toHaveCount(4);
        await signUpPage.fillPasswordInput('huskthebest');
        await expect(signUpPage.passwordErrors).toHaveCount(4);
        await signUpPage.fillPasswordInput('huskthebestt');
        await expect(signUpPage.passwordRequirementErrors.nth(1)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(3);
        await signUpPage.fillPasswordInput('HUSKTHEBEST');
        await expect(signUpPage.passwordRequirementErrors.nth(4)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(3);
        await signUpPage.fillPasswordInput('7');
        await expect(signUpPage.passwordRequirementErrors.nth(2)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(3);
        await signUpPage.fillPasswordInput('*');
        await expect(signUpPage.passwordRequirementErrors.nth(3)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(3);
        await signUpPage.fillPasswordInput('HuskTheBestt');
        await expect(signUpPage.passwordRequirementErrors.nth(1)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordRequirementErrors.nth(4)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(2);
        await signUpPage.fillPasswordInput('HuskTheBest75');
        await expect(signUpPage.passwordRequirementErrors.nth(1)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordRequirementErrors.nth(2)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordRequirementErrors.nth(4)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(1);
        await signUpPage.fillPasswordInput('HuskTheBest_');
        await expect(signUpPage.passwordRequirementErrors.nth(1)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordRequirementErrors.nth(3)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordRequirementErrors.nth(4)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(1);
    })
})