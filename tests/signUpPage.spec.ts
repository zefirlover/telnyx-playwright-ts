import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/signUp.page';
import { MainPage } from '../pages/mainpage/Main.page';
import Helpers from '../helpers/helper';

test.describe('sign up page testing', () => {

    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const signUpPage = new SignUpPage(page);
        await signUpPage.visit();
        await mainPage.checkCookiesMessageBox();
    })

    test('TNP-20 Verify the Sign Up page',async ({ page }) => {
        const mainPage = new MainPage(page);
        const signUpPage = new SignUpPage(page);
        await mainPage.visit();
        await expect(mainPage.signUpButton).toBeVisible();
        await mainPage.clickSignUpButton();
        await expect(signUpPage.emailInput).toBeVisible();
    })

    test('TNP-29 Verify the error messages on the Sign Up page are dislayed with empty inputs registration',async ({ page }) => {
        const signUpPage = new SignUpPage(page);
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

    test('TNP-22 Test the email validation on the Sign Up page with incorrect data',async ({ page }) => {
        const signUpPage = new SignUpPage(page);
        await expect(signUpPage.emailInput).toBeVisible();
        await signUpPage.emailInput.fill('testatgmail.com');
        await signUpPage.clickNameInput();
        await expect(signUpPage.emailErrorMessage).toBeVisible();
        await signUpPage.emailInput.fill('test@gmailcom');
        await signUpPage.clickNameInput();
        await expect(signUpPage.emailErrorMessage).toBeVisible();
        await signUpPage.emailInput.fill('@gmail');
        await signUpPage.clickNameInput();
        await expect(signUpPage.emailErrorMessage).toBeVisible();
    })

    test('TNP-25 Verify the Show/Hide password button',async ({ page }) => {
        const signUpPage = new SignUpPage(page);
        await expect(signUpPage.passwordInput).toBeVisible();
        await expect(signUpPage.passwordInput).toHaveAttribute('type', 'password');
        await signUpPage.clickShowPasswordButton();
        await expect(signUpPage.passwordInput).toHaveAttribute('type', 'text');
        await signUpPage.clickShowPasswordButton();
        await expect(signUpPage.passwordInput).toHaveAttribute('type', 'password');
    })

    test('TNP-24 Test the password validation on the Sign Up page with incorrect data',async ({ page }) => {
        const signUpPage = new SignUpPage(page);
        await expect(signUpPage.passwordInput).toBeVisible();
        await signUpPage.clickPasswordInput();
        await expect(signUpPage.passwordRequirements).toBeVisible();
        await expect(signUpPage.passwordErrors).toHaveCount(4);
        await signUpPage.passwordInput.fill('h');
        await expect(signUpPage.passwordErrors).toHaveCount(4);
        await signUpPage.passwordInput.fill('huskthebest');
        await expect(signUpPage.passwordErrors).toHaveCount(4);
        await signUpPage.passwordInput.fill('huskthebestt');
        await expect(signUpPage.passwordRequirementErrors.nth(1)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(3);
        await signUpPage.passwordInput.fill('HUSKTHEBEST');
        await expect(signUpPage.passwordRequirementErrors.nth(4)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(3);
        await signUpPage.passwordInput.fill('7');
        await expect(signUpPage.passwordRequirementErrors.nth(2)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(3);
        await signUpPage.passwordInput.fill('*');
        await expect(signUpPage.passwordRequirementErrors.nth(3)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(3);
        await signUpPage.passwordInput.fill('HuskTheBestt');
        await expect(signUpPage.passwordRequirementErrors.nth(1)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordRequirementErrors.nth(4)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(2);
        await signUpPage.passwordInput.fill('HuskTheBest75');
        await expect(signUpPage.passwordRequirementErrors.nth(1)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordRequirementErrors.nth(2)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordRequirementErrors.nth(4)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(1);
        await signUpPage.passwordInput.fill('HuskTheBest_');
        await expect(signUpPage.passwordRequirementErrors.nth(1)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordRequirementErrors.nth(3)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordRequirementErrors.nth(4)).toHaveAttribute('aria-hidden', 'true');
        await expect(signUpPage.passwordErrors).toHaveCount(1);
    })
})