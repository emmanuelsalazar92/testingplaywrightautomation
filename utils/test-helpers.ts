import { Page } from '@playwright/test';

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
}

/**
 * Devuelve un Locator de Playwright a partir de un string o un objeto { type, value }
 * type puede ser: 'testid', 'text'.
 * Si es string, se asume CSS selector (compatibilidad).
 */
export function getLocator(page: any, locator: any) {
  switch (locator.type) {
  case 'testid':
    return page.locator(`[data-testid="${locator.value}"]`);
  case 'text':
    return page.getByText(locator.value);
  default:
    throw new Error(`Unknown locator type: ${locator.type}`);
  }
}
