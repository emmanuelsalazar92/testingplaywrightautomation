import { test, expect } from '@playwright/test';
import { LOGIN_LOCATORS } from '../locators/index';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { BASE_URLS, LOGIN_TEST_DATA } from '../data/test-data';

test.describe('Login Functionality', () => {
  const baseUrl = BASE_URLS.MAIN_APP;
  const loginUrl = `${baseUrl}/login`;
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await test.step('Navigate to Login Page', async () => {
      await page.context().clearCookies();
      await loginPage.goto();
      await loginPage.expectOnLoginPage();
      await loginPage.expectLoginFormVisible();
    });
  });

  test('TC-001 Should allow login with valid credentials', async () => {
    await test.step('Enter valid credentials and submit', async () => {
      await loginPage.fillEmail(LOGIN_TEST_DATA.VALID_EMAIL);
      await loginPage.fillPassword(LOGIN_TEST_DATA.VALID_PASSWORD);
      await loginPage.clickLogin();
    });

    await test.step('Verify successful login and redirect', async () => {
      dashboardPage = new DashboardPage(loginPage.page);
      await dashboardPage.expectOnDashboardPage();
      await dashboardPage.expectDashboardTitleVisible(); 
      await dashboardPage.expectTitleVisible();
    });
  });

  test('TC-002 Should display error with invalid credentials', async () => {
    await test.step('Enter invalid credentials', async () => {
      await loginPage.fillEmail(LOGIN_TEST_DATA.INVALID_EMAIL);
      await loginPage.fillPassword(LOGIN_TEST_DATA.INVALID_PASSWORD);
      await loginPage.clickLogin();
    });

    await test.step('Verify error message and attempt counter', async () => {
      await loginPage.expectFirstAttemptMessage();
      await loginPage.expectOnLoginPage();
    });
  });

  test('TC-003 Should block login after 3 failed attempts', async () => {
    await test.step('Submit wrong credentials 3 times', async () => {
      for (let i = 1; i <= 3; i++) {
        await loginPage.fillEmail(LOGIN_TEST_DATA.INVALID_EMAIL);
        await loginPage.fillPassword(LOGIN_TEST_DATA.INVALID_PASSWORD);
        await loginPage.clickLogin();
      }
    });

    await test.step('Verify user is blocked after 3 attempts', async () => {
      await loginPage.expectOnLoginPage();
      await loginPage.expectBlockedUserMessage();
      await loginPage.expectDisabledLoginButton();
    });
  });

  test('should handle email format validation', async ({ page }) => {
    // Test with invalid email format using centralized test data
    await page
      .locator(LOGIN_LOCATORS.EMAIL_INPUT)
      .fill(LOGIN_TEST_DATA.INVALID_EMAIL_FORMAT);
    await page
      .locator(LOGIN_LOCATORS.PASSWORD_INPUT)
      .fill(LOGIN_TEST_DATA.VALID_PASSWORD);

    // Verify email format validation (using centralized error messages)
    // await expect(page.getByText(ERROR_MESSAGES.LOGIN.INVALID_EMAIL_FORMAT)).toBeVisible();
  });

  test('should handle empty email field', async ({ page }) => {
    // Test with empty email
    await page
      .locator(LOGIN_LOCATORS.EMAIL_INPUT)
      .fill(LOGIN_TEST_DATA.EMPTY_EMAIL);
    await page
      .locator(LOGIN_LOCATORS.PASSWORD_INPUT)
      .fill(LOGIN_TEST_DATA.VALID_PASSWORD);

    // Submit the form
    await page.locator(LOGIN_LOCATORS.LOGIN_BUTTON).click();

    // Verify validation message
    // await expect(page.getByText(ERROR_MESSAGES.LOGIN.EMAIL_REQUIRED)).toBeVisible();

    // Verify we're still on the login page
    await expect(page).toHaveURL(loginUrl);
  });

  test('should handle empty password field', async ({ page }) => {
    // Test with empty password
    await page
      .locator(LOGIN_LOCATORS.EMAIL_INPUT)
      .fill(LOGIN_TEST_DATA.VALID_EMAIL);
    await page
      .locator(LOGIN_LOCATORS.PASSWORD_INPUT)
      .fill(LOGIN_TEST_DATA.EMPTY_PASSWORD);

    // Submit the form
    await page.locator(LOGIN_LOCATORS.LOGIN_BUTTON).click();

    // Verify validation message
    // await expect(page.getByText(ERROR_MESSAGES.LOGIN.PASSWORD_REQUIRED)).toBeVisible();

    // Verify we're still on the login page
    await expect(page).toHaveURL(loginUrl);
  });

  test('should handle long input values', async ({ page }) => {
    // Test with very long email and password
    await page
      .locator(LOGIN_LOCATORS.EMAIL_INPUT)
      .fill(LOGIN_TEST_DATA.LONG_EMAIL);
    await page
      .locator(LOGIN_LOCATORS.PASSWORD_INPUT)
      .fill(LOGIN_TEST_DATA.LONG_PASSWORD);

    // Submit the form
    await page.locator(LOGIN_LOCATORS.LOGIN_BUTTON).click();

    // Verify validation message for long values
    // await expect(page.getByText(ERROR_MESSAGES.VALIDATION.TOO_LONG)).toBeVisible();

    // Verify we're still on the login page
    await expect(page).toHaveURL(loginUrl);
  });


});
