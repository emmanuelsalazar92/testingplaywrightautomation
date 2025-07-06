import { test, expect } from '@playwright/test';
import { LOGIN_LOCATORS } from '../../locators/index.js';
import { LoginPage } from '../../pages/LoginPage';
import {
  BASE_URLS,
  LOGIN_TEST_DATA,
} from '../../data/test-data.js';

test.describe('Login Functionality', () => {
  const baseUrl = BASE_URLS.MAIN_APP;
  const loginUrl = `${baseUrl}/login`;

  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto(loginUrl);
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Fill in login form using centralized locators and test data
    await page
      .locator(LOGIN_LOCATORS.EMAIL_INPUT)
      .fill(LOGIN_TEST_DATA.VALID_EMAIL);
    await page
      .locator(LOGIN_LOCATORS.PASSWORD_INPUT)
      .fill(LOGIN_TEST_DATA.VALID_PASSWORD);

    // Submit the form
    await page.locator(LOGIN_LOCATORS.LOGIN_BUTTON).click();

    // Additional verification - check if we're redirected to the main page
    await expect(page).toHaveURL(new RegExp(`${baseUrl}/.*`));
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Fill in login form with invalid credentials using centralized data
    await page
      .locator(LOGIN_LOCATORS.EMAIL_INPUT)
      .fill(LOGIN_TEST_DATA.INVALID_EMAIL);
    await page
      .locator(LOGIN_LOCATORS.PASSWORD_INPUT)
      .fill(LOGIN_TEST_DATA.INVALID_PASSWORD);

    // Submit the form
    await page.locator(LOGIN_LOCATORS.LOGIN_BUTTON).click();

    // Verify error message is displayed (using centralized error messages)
    // await expect(page.getByText(ERROR_MESSAGES.LOGIN.INVALID_CREDENTIALS)).toBeVisible();

    // Verify we're still on the login page
    await expect(page).toHaveURL(loginUrl);
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.locator(LOGIN_LOCATORS.LOGIN_BUTTON).click();

    // Verify validation messages (using centralized error messages)
    // await expect(page.getByText(ERROR_MESSAGES.LOGIN.EMAIL_REQUIRED)).toBeVisible();
    // await expect(page.getByText(ERROR_MESSAGES.LOGIN.PASSWORD_REQUIRED)).toBeVisible();

    // Verify we're still on the login page
    await expect(page).toHaveURL(loginUrl);
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
