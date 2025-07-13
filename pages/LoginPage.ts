import { Page, Locator, expect } from '@playwright/test';
import { LOGIN_LOCATORS } from '../locators/index';
import { BASE_URLS, LOGIN_TEST_DATA } from '../data/test-data';
import { getLocator } from '../utils/test-helpers';

/**
 * Page Object Model for Login Page
 * 
 * This class uses centralized locators and test data for better maintainability.
 * All selectors come from locators/index.js and test data from data/test-data.js
 */
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginForm: Locator;
  readonly validationError: Locator;
  readonly firstAttemptLabel: Locator;
  readonly toastMessage: Locator;
  readonly blockedUser: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = getLocator(page, LOGIN_LOCATORS.EMAIL_INPUT);
    this.passwordInput = getLocator(page, LOGIN_LOCATORS.PASSWORD_INPUT);
    this.loginButton = getLocator(page, LOGIN_LOCATORS.LOGIN_BUTTON);
    this.errorMessage = getLocator(page, LOGIN_LOCATORS.ERROR_MESSAGE);
    this.successMessage = getLocator(page, LOGIN_LOCATORS.SUCCESS_MESSAGE);
    this.forgotPasswordLink = getLocator(page, LOGIN_LOCATORS.FORGOT_PASSWORD_LINK);
    this.rememberMeCheckbox = getLocator(page, LOGIN_LOCATORS.REMEMBER_ME_CHECKBOX);
    this.loginForm = getLocator(page, LOGIN_LOCATORS.LOGIN_FORM);
    this.validationError = getLocator(page, LOGIN_LOCATORS.VALIDATION_ERROR);
    this.firstAttemptLabel = getLocator(page, LOGIN_LOCATORS.FIRST_ATTEMPT_LABEL);
    this.toastMessage = getLocator(page, LOGIN_LOCATORS.TOAST_MESSAGE);
    this.blockedUser = getLocator(page, LOGIN_LOCATORS.BLOCKED_USER);
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await this.page.goto(`${BASE_URLS.MAIN_APP}/login`);
  }

  /**
   * Fill email field
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Disabled login button
   */
  async expectDisabledLoginButton(): Promise<void> {
    await expect(this.loginButton).toBeDisabled();
  }

  /**
   * Perform login with provided credentials
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Perform login with valid credentials
   */
  async loginWithValidCredentials(): Promise<void> {
    await this.login(LOGIN_TEST_DATA.VALID_EMAIL, LOGIN_TEST_DATA.VALID_PASSWORD);
  }

  /**
   * Perform login with invalid credentials
   */
  async loginWithInvalidCredentials(): Promise<void> {
    await this.login(LOGIN_TEST_DATA.INVALID_EMAIL, LOGIN_TEST_DATA.INVALID_PASSWORD);
  }

  /**
   * Check if error message is visible
   */
  async expectErrorMessage(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  /**
   * Check if blocked user message is visible
   */
  async expectBlockedUserMessage(): Promise<void> {
    await expect(this.blockedUser).toBeVisible();
    await expect(this.blockedUser).toHaveText('Usuario bloqueado después de 3 intentos fallidos');
  }

  /**
   * Check if specific error message is visible
   */
  async expectSpecificErrorMessage(message: string): Promise<void> {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  /**
   * Check if toast message is visible
   */
  async expectToastMessage(): Promise<void> {
    await expect(this.toastMessage).toBeVisible();
  }

  /**
   * Check if success message is visible
   */
  async expectFirstAttemptMessage(): Promise<void> {
    await expect(this.firstAttemptLabel).toBeVisible();
  }

  /**
   * Check if login form is visible
   */
  async expectLoginFormVisible(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Check if we're on the login page
   */
  async expectOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${BASE_URLS.MAIN_APP}/login`));
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Clear email field
   */
  async clearEmail(): Promise<void> {
    await this.emailInput.clear();
  }

  /**
   * Clear password field
   */
  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }

  /**
   * Clear all form fields
   */
  async clearForm(): Promise<void> {
    await this.clearEmail();
    await this.clearPassword();
  }

  /**
   * Check if email field is empty
   */
  async expectEmailEmpty(): Promise<void> {
    await expect(this.emailInput).toHaveValue('');
  }

  /**
   * Check if password field is empty
   */
  async expectPasswordEmpty(): Promise<void> {
    await expect(this.passwordInput).toHaveValue('');
  }

  /**
   * Check if remember me checkbox is checked
   */
  async expectRememberMeChecked(): Promise<void> {
    await expect(this.rememberMeCheckbox).toBeChecked();
  }

  /**
   * Check if remember me checkbox is unchecked
   */
  async expectRememberMeUnchecked(): Promise<void> {
    await expect(this.rememberMeCheckbox).not.toBeChecked();
  }

  /**
   * Toggle remember me checkbox
   */
  async toggleRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.click();
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  /**
   * Check if forgot password link is visible
   */
  async expectForgotPasswordLinkVisible(): Promise<void> {
    await expect(this.forgotPasswordLink).toBeVisible();
  }

  /**
   * Get email field value
   */
  async getEmailValue(): Promise<string> {
    return await this.emailInput.inputValue();
  }

  /**
   * Get password field value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Check if login button is enabled
   */
  async expectLoginButtonEnabled(): Promise<void> {
    await expect(this.loginButton).toBeEnabled();
  }

  /**
   * Check if login button is disabled
   */
  async expectLoginButtonDisabled(): Promise<void> {
    await expect(this.loginButton).toBeDisabled();
  }
} 