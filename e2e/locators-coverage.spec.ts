import { test, expect } from '@playwright/test';
import { LOGIN_LOCATORS } from '../locators/index.js';

test('test locators for coverage', async () => {
  // Test that locators are properly exported and defined
  expect(LOGIN_LOCATORS).toBeDefined();
  expect(typeof LOGIN_LOCATORS).toBe('object');

  // Test that all expected locator properties exist
  expect(LOGIN_LOCATORS.EMAIL_INPUT).toBeDefined();
  expect(LOGIN_LOCATORS.PASSWORD_INPUT).toBeDefined();
  expect(LOGIN_LOCATORS.LOGIN_BUTTON).toBeDefined();
  expect(LOGIN_LOCATORS.ERROR_MESSAGE).toBeDefined();
  expect(LOGIN_LOCATORS.SUCCESS_MESSAGE).toBeDefined();
  expect(LOGIN_LOCATORS.FORGOT_PASSWORD_LINK).toBeDefined();
  expect(LOGIN_LOCATORS.REMEMBER_ME_CHECKBOX).toBeDefined();
  expect(LOGIN_LOCATORS.LOGIN_FORM).toBeDefined();
  expect(LOGIN_LOCATORS.VALIDATION_ERROR).toBeDefined();

  // Test that locators are strings
  expect(typeof LOGIN_LOCATORS.EMAIL_INPUT).toBe('string');
  expect(typeof LOGIN_LOCATORS.PASSWORD_INPUT).toBe('string');
  expect(typeof LOGIN_LOCATORS.LOGIN_BUTTON).toBe('string');
  expect(typeof LOGIN_LOCATORS.ERROR_MESSAGE).toBe('string');
  expect(typeof LOGIN_LOCATORS.SUCCESS_MESSAGE).toBe('string');
  expect(typeof LOGIN_LOCATORS.FORGOT_PASSWORD_LINK).toBe('string');
  expect(typeof LOGIN_LOCATORS.REMEMBER_ME_CHECKBOX).toBe('string');
  expect(typeof LOGIN_LOCATORS.LOGIN_FORM).toBe('string');
  expect(typeof LOGIN_LOCATORS.VALIDATION_ERROR).toBe('string');

  // Test that locators contain data-testid attributes
  expect(LOGIN_LOCATORS.EMAIL_INPUT).toContain('data-testid=');
  expect(LOGIN_LOCATORS.PASSWORD_INPUT).toContain('data-testid=');
  expect(LOGIN_LOCATORS.LOGIN_BUTTON).toContain('data-testid=');
  expect(LOGIN_LOCATORS.ERROR_MESSAGE).toContain('data-testid=');
  expect(LOGIN_LOCATORS.SUCCESS_MESSAGE).toContain('data-testid=');
  expect(LOGIN_LOCATORS.FORGOT_PASSWORD_LINK).toContain('data-testid=');
  expect(LOGIN_LOCATORS.REMEMBER_ME_CHECKBOX).toContain('data-testid=');
  expect(LOGIN_LOCATORS.LOGIN_FORM).toContain('data-testid=');
  expect(LOGIN_LOCATORS.VALIDATION_ERROR).toContain('data-testid=');
});
