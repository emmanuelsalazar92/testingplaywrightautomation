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
  readonly firstAttemptLabel: Locator;
  readonly blockedUser: Locator;
  readonly emailErrorMessage: Locator;
  readonly passwordErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = getLocator(page, LOGIN_LOCATORS.EMAIL_INPUT);
    this.passwordInput = getLocator(page, LOGIN_LOCATORS.PASSWORD_INPUT);
    this.loginButton = getLocator(page, LOGIN_LOCATORS.LOGIN_BUTTON);
    this.firstAttemptLabel = getLocator(page, LOGIN_LOCATORS.FIRST_ATTEMPT_LABEL);
    this.blockedUser = getLocator(page, LOGIN_LOCATORS.BLOCKED_USER);
    this.emailErrorMessage = getLocator(page, LOGIN_LOCATORS.EMAIL_ERROR_MESSAGE);
    this.passwordErrorMessage = getLocator(page, LOGIN_LOCATORS.PASSWORD_ERROR_MESSAGE);
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
   * Expect email error message to be visible
   */
  async expectEmailErrorMessageVisible(): Promise<void> {
    await expect(this.emailErrorMessage).toBeVisible();
  }

  /**
   * Expect password error message to be visible
   */
  async expectPasswordErrorMessageVisible(): Promise<void> {
    await expect(this.passwordErrorMessage).toBeVisible();
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
   * Check if blocked user message is visible
   */
  async expectBlockedUserMessage(): Promise<void> {
    await expect(this.blockedUser).toBeVisible();
    await expect(this.blockedUser).toHaveText('Usuario bloqueado después de 3 intentos fallidos');
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
} 