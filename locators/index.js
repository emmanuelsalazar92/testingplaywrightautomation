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
  EMAIL_INPUT: '[data-testid="email-input"]',
  PASSWORD_INPUT: '[data-testid="password-input"]',
  LOGIN_BUTTON: '[data-testid="login-button"]',
  ERROR_MESSAGE: '[data-testid="error-message"]',
  SUCCESS_MESSAGE: '[data-testid="success-message"]',
  FORGOT_PASSWORD_LINK: '[data-testid="forgot-password-link"]',
  REMEMBER_ME_CHECKBOX: '[data-testid="remember-me-checkbox"]',
  LOGIN_FORM: '[data-testid="login-form"]',
  VALIDATION_ERROR: '[data-testid="validation-error"]',
};

// Dashboard Page Locators
export const DASHBOARD_LOCATORS = {
  APP_HEADING: 'h1:has-text("UI Test App")',
  USER_MENU: '[data-testid="user-menu"]',
  LOGOUT_BUTTON: '[data-testid="logout-button"]',
  SIDEBAR_NAV: '[data-testid="sidebar-navigation"]',
  MAIN_CONTENT: '[data-testid="main-content"]',
  WELCOME_MESSAGE: '[data-testid="welcome-message"]',
  USER_PROFILE: '[data-testid="user-profile"]',
  DASHBOARD_STATS: '[data-testid="dashboard-stats"]',
  DASHBOARD_TITLE: '[data-testid="dashboard-title"]',
};

// Common UI Elements
export const COMMON_LOCATORS = {
  LOADING_SPINNER: '[data-testid="loading-spinner"]',
  MODAL_OVERLAY: '[data-testid="modal-overlay"]',
  TOAST_NOTIFICATION: '[data-testid="toast-notification"]',
  BREADCRUMB: '[data-testid="breadcrumb"]',
  PAGINATION: '[data-testid="pagination"]',
  ALERT_MESSAGE: '[data-testid="alert-message"]',
  SUCCESS_ALERT: '[data-testid="success-alert"]',
  ERROR_ALERT: '[data-testid="error-alert"]',
  WARNING_ALERT: '[data-testid="warning-alert"]',
};

// Form Elements
export const FORM_LOCATORS = {
  SUBMIT_BUTTON: '[data-testid="submit-button"]',
  CANCEL_BUTTON: '[data-testid="cancel-button"]',
  RESET_BUTTON: '[data-testid="reset-button"]',
  FORM_VALIDATION_ERROR: '[data-testid="form-validation-error"]',
  FORM_CONTAINER: '[data-testid="form-container"]',
  REQUIRED_FIELD_INDICATOR: '[data-testid="required-field"]',
  FIELD_HELP_TEXT: '[data-testid="field-help-text"]',
};

// Navigation Elements
export const NAVIGATION_LOCATORS = {
  HOME_LINK: '[data-testid="home-link"]',
  SETTINGS_LINK: '[data-testid="settings-link"]',
  PROFILE_LINK: '[data-testid="profile-link"]',
  HELP_LINK: '[data-testid="help-link"]',
  NAVIGATION_MENU: '[data-testid="navigation-menu"]',
  BURGER_MENU: '[data-testid="burger-menu"]',
  MOBILE_MENU: '[data-testid="mobile-menu"]',
};

// Registration Page Locators
export const REGISTRATION_LOCATORS = {
  FIRST_NAME_INPUT: '[data-testid="first-name-input"]',
  LAST_NAME_INPUT: '[data-testid="last-name-input"]',
  EMAIL_INPUT: LOGIN_LOCATORS.EMAIL_INPUT,
  PASSWORD_INPUT: LOGIN_LOCATORS.PASSWORD_INPUT,
  CONFIRM_PASSWORD_INPUT: '[data-testid="confirm-password-input"]',
  REGISTER_BUTTON: '[data-testid="register-button"]',
  TERMS_CHECKBOX: '[data-testid="terms-checkbox"]',
  PRIVACY_CHECKBOX: '[data-testid="privacy-checkbox"]',
  REGISTRATION_FORM: '[data-testid="registration-form"]',
};

// Profile Page Locators
export const PROFILE_LOCATORS = {
  PROFILE_HEADER: '[data-testid="profile-header"]',
  EDIT_PROFILE_BUTTON: '[data-testid="edit-profile-button"]',
  SAVE_PROFILE_BUTTON: '[data-testid="save-profile-button"]',
  PROFILE_AVATAR: '[data-testid="profile-avatar"]',
  PROFILE_INFO: '[data-testid="profile-info"]',
  CHANGE_PASSWORD_LINK: '[data-testid="change-password-link"]',
  DELETE_ACCOUNT_BUTTON: '[data-testid="delete-account-button"]',
};

// Settings Page Locators
export const SETTINGS_LOCATORS = {
  SETTINGS_HEADER: '[data-testid="settings-header"]',
  NOTIFICATION_TOGGLE: '[data-testid="notification-toggle"]',
  EMAIL_NOTIFICATIONS: '[data-testid="email-notifications"]',
  PUSH_NOTIFICATIONS: '[data-testid="push-notifications"]',
  PRIVACY_SETTINGS: '[data-testid="privacy-settings"]',
  LANGUAGE_SELECTOR: '[data-testid="language-selector"]',
  THEME_SELECTOR: '[data-testid="theme-selector"]',
  SAVE_SETTINGS_BUTTON: '[data-testid="save-settings-button"]',
};

// All locators combined for validation
export const ALL_LOCATORS = {
  ...LOGIN_LOCATORS,
  ...DASHBOARD_LOCATORS,
  ...COMMON_LOCATORS,
  ...FORM_LOCATORS,
  ...NAVIGATION_LOCATORS,
  ...REGISTRATION_LOCATORS,
  ...PROFILE_LOCATORS,
  ...SETTINGS_LOCATORS,
};

// Locator categories for organization
export const LOCATOR_CATEGORIES = {
  LOGIN: LOGIN_LOCATORS,
  DASHBOARD: DASHBOARD_LOCATORS,
  COMMON: COMMON_LOCATORS,
  FORM: FORM_LOCATORS,
  NAVIGATION: NAVIGATION_LOCATORS,
  REGISTRATION: REGISTRATION_LOCATORS,
  PROFILE: PROFILE_LOCATORS,
  SETTINGS: SETTINGS_LOCATORS,
};

// Legacy selectors (for backward compatibility)
export const SELECTORS = {
  EMAIL_INPUT: LOGIN_LOCATORS.EMAIL_INPUT,
  PASSWORD_INPUT: LOGIN_LOCATORS.PASSWORD_INPUT,
  LOGIN_BUTTON: LOGIN_LOCATORS.LOGIN_BUTTON,
  APP_HEADING: DASHBOARD_LOCATORS.APP_HEADING,
};

export default ALL_LOCATORS; 