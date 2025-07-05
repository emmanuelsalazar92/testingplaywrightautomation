import { Page, expect } from '@playwright/test';

/**
 * Utility class for common test operations
 * 
 * This file contains only utility functions for test operations.
 * Locators are centralized in locators/index.js
 * Test data is centralized in data/test-data.js
 */
export class TestHelpers {
  /**
   * Wait for page to be fully loaded
   */
  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot with timestamp
   */
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `test-results/screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }

  /**
   * Fill form fields with validation
   */
  static async fillFormField(page: Page, selector: string, value: string): Promise<void> {
    const field = page.locator(selector);
    await field.waitFor({ state: 'visible' });
    await field.fill(value);
  }

  /**
   * Click element with retry logic
   */
  static async clickWithRetry(page: Page, selector: string, maxRetries = 3): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const element = page.locator(selector);
        await element.waitFor({ state: 'visible' });
        await element.click();
        return;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Verify element is visible with timeout
   */
  static async expectVisible(page: Page, selector: string, timeout = 10000): Promise<void> {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    await expect(element).toBeVisible();
  }

  /**
   * Generate random test data
   */
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    return `test-${timestamp}@example.com`;
  }

  static generateRandomString(length = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Wait for network requests to complete
   */
  static async waitForNetworkIdle(page: Page, timeout = 30000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for specific URL pattern
   */
  static async waitForUrl(page: Page, urlPattern: string | RegExp, timeout = 10000): Promise<void> {
    await page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Scroll element into view
   */
  static async scrollIntoView(page: Page, selector: string): Promise<void> {
    const element = page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Clear and fill input field
   */
  static async clearAndFill(page: Page, selector: string, value: string): Promise<void> {
    const field = page.locator(selector);
    await field.waitFor({ state: 'visible' });
    await field.clear();
    await field.fill(value);
  }
}

/**
 * Test data constants
 */
export const TEST_DATA = {
  VALID_EMAIL: 'admin@test.com',
  VALID_PASSWORD: 'password123',
  INVALID_EMAIL: 'invalid@test.com',
  INVALID_PASSWORD: 'wrongpassword',
  BASE_URL: 'https://v0-react-frontend-application-gold.vercel.app',
} as const;

/**
 * Selectors constants
 */
export const SELECTORS = {
  EMAIL_INPUT: '[data-testid="email-input"]',
  PASSWORD_INPUT: '[data-testid="password-input"]',
  LOGIN_BUTTON: '[data-testid="login-button"]',
  APP_HEADING: 'h1:has-text("UI Test App")',
} as const; 