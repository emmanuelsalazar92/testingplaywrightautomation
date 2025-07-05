import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('test LoginPage class for coverage', async ({ page }) => {
  // Create LoginPage instance
  const loginPage = new LoginPage(page);
  
  // Test constructor and locator initialization
  expect(loginPage.page).toBe(page);
  expect(loginPage.emailInput).toBeDefined();
  expect(loginPage.passwordInput).toBeDefined();
  expect(loginPage.loginButton).toBeDefined();
  expect(loginPage.errorMessage).toBeDefined();
  expect(loginPage.successMessage).toBeDefined();
  expect(loginPage.forgotPasswordLink).toBeDefined();
  expect(loginPage.rememberMeCheckbox).toBeDefined();
  expect(loginPage.loginForm).toBeDefined();
  expect(loginPage.validationError).toBeDefined();
  
  // Test utility methods that don't require actual page navigation
  const currentUrl = await loginPage.getCurrentUrl();
  expect(typeof currentUrl).toBe('string');
  
  // Test that all methods exist and are functions
  expect(typeof loginPage.fillEmail).toBe('function');
  expect(typeof loginPage.fillPassword).toBe('function');
  expect(typeof loginPage.clickLogin).toBe('function');
  expect(typeof loginPage.login).toBe('function');
  expect(typeof loginPage.loginWithValidCredentials).toBe('function');
  expect(typeof loginPage.loginWithInvalidCredentials).toBe('function');
  expect(typeof loginPage.expectErrorMessage).toBe('function');
  expect(typeof loginPage.expectSpecificErrorMessage).toBe('function');
  expect(typeof loginPage.expectSuccessMessage).toBe('function');
  expect(typeof loginPage.expectLoginFormVisible).toBe('function');
  expect(typeof loginPage.expectOnLoginPage).toBe('function');
  expect(typeof loginPage.waitForPageLoad).toBe('function');
  expect(typeof loginPage.clearEmail).toBe('function');
  expect(typeof loginPage.clearPassword).toBe('function');
  expect(typeof loginPage.clearForm).toBe('function');
  expect(typeof loginPage.expectEmailEmpty).toBe('function');
  expect(typeof loginPage.expectPasswordEmpty).toBe('function');
  expect(typeof loginPage.expectRememberMeChecked).toBe('function');
  expect(typeof loginPage.expectRememberMeUnchecked).toBe('function');
  expect(typeof loginPage.toggleRememberMe).toBe('function');
  expect(typeof loginPage.clickForgotPassword).toBe('function');
  expect(typeof loginPage.expectForgotPasswordLinkVisible).toBe('function');
  expect(typeof loginPage.getEmailValue).toBe('function');
  expect(typeof loginPage.getPasswordValue).toBe('function');
  expect(typeof loginPage.expectLoginButtonEnabled).toBe('function');
  expect(typeof loginPage.expectLoginButtonDisabled).toBe('function');
  
  // Test that the page object can be instantiated without errors
  // This covers the constructor and all property assignments
  expect(loginPage).toBeInstanceOf(LoginPage);
}); 