import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';

test('TestHelpers: random data generation', () => {
  const email = TestHelpers.generateRandomEmail();
  const str8 = TestHelpers.generateRandomString(8);
  const str20 = TestHelpers.generateRandomString(20);
  expect(email).toMatch(/^test-\d+@example\.com$/);
  expect(str8).toHaveLength(8);
  expect(str20).toHaveLength(20);
});

test('TestHelpers: page utilities', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await TestHelpers.waitForPageLoad(page);
  await TestHelpers.waitForNetworkIdle(page, 3000);
  await TestHelpers.waitForUrl(page, /playwright/);
  await TestHelpers.waitForUrl(page, 'https://playwright.dev/');
  await TestHelpers.scrollIntoView(page, 'body');
  await TestHelpers.expectVisible(page, 'body');
});

test('TestHelpers: screenshot and form utilities', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await TestHelpers.takeScreenshot(page, 'playwright-home');
  // Try form field utilities on the search box if visible
  const searchInput = page.getByRole('textbox', { name: 'Search' });
  if (await searchInput.isVisible()) {
    await TestHelpers.fillFormField(page, '[placeholder*="Search"]', 'test');
    await TestHelpers.clearAndFill(page, '[placeholder*="Search"]', 'new test');
  }
});

test('TestHelpers: clickWithRetry utility', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const getStartedLink = page.getByRole('link', { name: 'Get started' });
  if (await getStartedLink.isVisible()) {
    await TestHelpers.clickWithRetry(page, 'a:has-text("Get started")');
  }
});

test('test additional utility functions', async ({ page }) => {
  // Test random string generation with different lengths
  const shortString = TestHelpers.generateRandomString(5);
  const longString = TestHelpers.generateRandomString(20);
  
  expect(shortString).toHaveLength(5);
  expect(longString).toHaveLength(20);
  expect(typeof shortString).toBe('string');
  expect(typeof longString).toBe('string');
  
  // Test email generation multiple times
  const email1 = TestHelpers.generateRandomEmail();
  const email2 = TestHelpers.generateRandomEmail();
  
  expect(email1).toMatch(/^test-\d+@example\.com$/);
  expect(email2).toMatch(/^test-\d+@example\.com$/);
  expect(email1).not.toEqual(email2); // Should be different timestamps
  
  // Test page utilities
  await page.goto('https://playwright.dev/');
  
  // Test waitForPageLoad
  await TestHelpers.waitForPageLoad(page);
  
  // Test waitForUrl with string pattern
  await TestHelpers.waitForUrl(page, 'https://playwright.dev/');
  
  // Test waitForUrl with regex pattern
  await TestHelpers.waitForUrl(page, /playwright/);
  
  // Test waitForNetworkIdle with different timeout
  await TestHelpers.waitForNetworkIdle(page, 3000);
  
  // Test scrollIntoView
  await TestHelpers.scrollIntoView(page, 'html');
  await TestHelpers.scrollIntoView(page, 'body');
  
  // Test form utilities on a simple page
  await TestHelpers.fillFormField(page, 'body', 'test');
  await TestHelpers.clearAndFill(page, 'body', 'new test');
  
  // Test click with retry
  await TestHelpers.clickWithRetry(page, 'body');
  
  // Test expect visible
  await TestHelpers.expectVisible(page, 'html');
  await TestHelpers.expectVisible(page, 'body');
}); 