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
      fullPage: true,
    });
  }

  /**
	 * Generate random test data
	 */
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    return `test-${timestamp}@example.com`;
  }

  /**
	 * Wait for specific URL pattern
	 */
  static async waitForUrl(
    page: Page,
    urlPattern: string | RegExp,
    timeout = 10000,
  ): Promise<void> {
    await page.waitForURL(urlPattern, { timeout });
  }

/**
 * Devuelve un Locator de Playwright a partir de un string o un objeto { type, value }
 * type puede ser: 'testid', 'text', 'xpath', 'css'.
 * Si es string, se asume CSS selector (compatibilidad).
 */
export function getLocator(page: Page, locator: string | { type: string, value: string }) {
  if (typeof locator === 'string') {
    // Compatibilidad: asume CSS selector
    return page.locator(locator);
  }
  switch (locator.type) {
    case 'testid':
      return page.locator(`[data-testid="${locator.value}"]`);
    case 'text':
      return page.getByText(locator.value);
    case 'xpath':
      return page.locator(`xpath=${locator.value}`);
    case 'css':
      return page.locator(locator.value);
    default:
      throw new Error(`Unknown locator type: ${locator.type}`);
  }
}
