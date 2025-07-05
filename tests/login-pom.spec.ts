import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {
  BASE_URLS,
  LOGIN_TEST_DATA,
} from '../data/test-data.js';

test.describe('Login Page Object Model Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.waitForPageLoad();
  });

  test('should display login form elements', async () => {
    await loginPage.expectLoginFormVisible();
  });

  test('should successfully login with valid credentials using POM', async ({
    page,
  }) => {
    // Use the Page Object Model methods
    await loginPage.loginWithValidCredentials();

    // Verify successful login
    await expect(
      page.getByRole('heading', { name: 'UI Test App' }),
    ).toBeVisible();

    // Verify URL change
    await expect(page).toHaveURL(new RegExp(`${BASE_URLS.MAIN_APP}/.*`));
  });

  test('should handle login with custom credentials', async ({ page }) => {
    const customEmail = LOGIN_TEST_DATA.VALID_EMAIL;
    const customPassword = LOGIN_TEST_DATA.VALID_PASSWORD;

    await loginPage.login(customEmail, customPassword);

    // Verify successful login
    await expect(
      page.getByRole('heading', { name: 'UI Test App' }),
    ).toBeVisible();
  });

  test('should remain on login page with invalid credentials', async () => {
    await loginPage.loginWithInvalidCredentials();

    // Verify we're still on the login page
    await loginPage.expectOnLoginPage();
  });

  test('should handle empty form submission', async () => {
    await loginPage.clickLogin();

    // Verify we're still on the login page
    await loginPage.expectOnLoginPage();
  });

  test('should fill form fields individually', async () => {
    await loginPage.fillEmail(LOGIN_TEST_DATA.VALID_EMAIL);
    await loginPage.fillPassword(LOGIN_TEST_DATA.VALID_PASSWORD);

    // Verify fields are filled
    await expect(loginPage.emailInput).toHaveValue(LOGIN_TEST_DATA.VALID_EMAIL);
    await expect(loginPage.passwordInput).toHaveValue(
      LOGIN_TEST_DATA.VALID_PASSWORD,
    );
  });

  test('should clear form fields', async () => {
    // Fill the form first
    await loginPage.fillEmail(LOGIN_TEST_DATA.VALID_EMAIL);
    await loginPage.fillPassword(LOGIN_TEST_DATA.VALID_PASSWORD);

    // Clear the form
    await loginPage.clearForm();

    // Verify fields are empty
    await loginPage.expectEmailEmpty();
    await loginPage.expectPasswordEmpty();
  });

  test('should get field values', async () => {
    const testEmail = LOGIN_TEST_DATA.VALID_EMAIL;
    const testPassword = LOGIN_TEST_DATA.VALID_PASSWORD;

    await loginPage.fillEmail(testEmail);
    await loginPage.fillPassword(testPassword);

    // Get and verify field values
    const emailValue = await loginPage.getEmailValue();
    const passwordValue = await loginPage.getPasswordValue();

    expect(emailValue).toBe(testEmail);
    expect(passwordValue).toBe(testPassword);
  });

  test('should verify login button state', async () => {
    // Button should be enabled by default
    await loginPage.expectLoginButtonEnabled();
  });
});
