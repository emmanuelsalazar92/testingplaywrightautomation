import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LOGIN_TEST_DATA } from '../data/test-data';

test.describe('Login Functionality', () => {
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

  test('TC-004 Should prevent submission with empty fields', async () => {
    await test.step('Attempt to submit empty form', async () => {
      await loginPage.clickLogin();
    });

    await test.step('Verify required field validations', async () => {
      await loginPage.expectOnLoginPage();
      await loginPage.expectEmailErrorMessageVisible();
      await loginPage.expectPasswordErrorMessageVisible();
    });
  });
});
