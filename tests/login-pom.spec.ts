import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TEST_DATA } from '../utils/test-helpers';

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

  test('should successfully login with valid credentials using POM', async ({ page }) => {
    // Use the Page Object Model methods
    await loginPage.loginWithValidCredentials();
    
    // Verify successful login
    await expect(page.getByRole('heading', { name: 'UI Test App' })).toBeVisible();
    
    // Verify URL change
    await expect(page).toHaveURL(new RegExp(`${TEST_DATA.BASE_URL}/.*`));
  });

  test('should handle login with custom credentials', async ({ page }) => {
    const customEmail = 'admin@test.com';
    const customPassword = 'password123';
    
    await loginPage.login(customEmail, customPassword);
    
    // Verify successful login
    await expect(page.getByRole('heading', { name: 'UI Test App' })).toBeVisible();
  });

  test('should remain on login page with invalid credentials', async () => {
    await loginPage.login(TEST_DATA.INVALID_EMAIL, TEST_DATA.INVALID_PASSWORD);
    
    // Verify we're still on the login page
    await loginPage.expectOnLoginPage();
  });

  test('should handle empty form submission', async () => {
    await loginPage.clickLogin();
    
    // Verify we're still on the login page
    await loginPage.expectOnLoginPage();
  });

  test('should fill form fields individually', async () => {
    await loginPage.fillEmail(TEST_DATA.VALID_EMAIL);
    await loginPage.fillPassword(TEST_DATA.VALID_PASSWORD);
    
    // Verify fields are filled
    await expect(loginPage.emailInput).toHaveValue(TEST_DATA.VALID_EMAIL);
    await expect(loginPage.passwordInput).toHaveValue(TEST_DATA.VALID_PASSWORD);
  });
}); 