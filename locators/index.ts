/**
 * Centralized Locators Configuration
 * 
 * This file contains all selectors and IDs used across the Playwright automation project.
 * Benefits:
 * - Single source of truth for all selectors
 * - Easy maintenance when UI changes
 * - Prevents duplicate locators
 * - Improves test reliability
 */

// Login Page Locators
export const LOGIN_LOCATORS = {
  EMAIL_INPUT: { type: 'testid', value: 'email-input' },
  PASSWORD_INPUT: { type: 'testid', value: 'password-input' },
  LOGIN_BUTTON: { type: 'testid', value: 'login-button' },
  FIRST_ATTEMPT_LABEL: { type: 'text', value: 'Intentos: 1/' },
  BLOCKED_USER: { type: 'testid', value: 'blocked-message' },
  EMAIL_ERROR_MESSAGE: { type: 'testid', value: 'email-error' },
  PASSWORD_ERROR_MESSAGE: { type: 'testid', value: 'password-error' },
} as const;

// Dashboard Page Locators
export const DASHBOARD_LOCATORS = {
  USER_MENU: { type: 'testid', value: 'user-menu' },
  DASHBOARD_TITLE: { type: 'testid', value: 'dashboard-title' },
} as const;

// All locators combined for validation
export const ALL_LOCATORS = {
  ...LOGIN_LOCATORS,
  ...DASHBOARD_LOCATORS,
} as const;

// Locator categories for organization
export const LOCATOR_CATEGORIES = {
  LOGIN: LOGIN_LOCATORS,
  DASHBOARD: DASHBOARD_LOCATORS,
} as const;

// Legacy selectors (for backward compatibility)
export const SELECTORS = {
  EMAIL_INPUT: LOGIN_LOCATORS.EMAIL_INPUT,
  PASSWORD_INPUT: LOGIN_LOCATORS.PASSWORD_INPUT,
  LOGIN_BUTTON: LOGIN_LOCATORS.LOGIN_BUTTON,
} as const;

export default ALL_LOCATORS; 