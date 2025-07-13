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
  ERROR_MESSAGE: { type: 'testid', value: 'error-message' },
  SUCCESS_MESSAGE: { type: 'testid', value: 'success-message' },
  FORGOT_PASSWORD_LINK: { type: 'testid', value: 'forgot-password-link' },
  REMEMBER_ME_CHECKBOX: { type: 'testid', value: 'remember-me-checkbox' },
  LOGIN_FORM: { type: 'testid', value: 'login-form' },
  VALIDATION_ERROR: { type: 'testid', value: 'validation-error' },
  FIRST_ATTEMPT_LABEL: { type: 'text', value: 'Intentos: 1/' },
  TOAST_MESSAGE: { type: 'testid', value: 'toast-message' },
  BLOCKED_USER: { type: 'testid', value: 'blocked-message' },
} as const;

// Dashboard Page Locators
export const DASHBOARD_LOCATORS = {
  USER_MENU: { type: 'testid', value: 'user-menu' },
  LOGOUT_BUTTON: { type: 'testid', value: 'logout-button' },
  SIDEBAR_NAV: { type: 'testid', value: 'sidebar-navigation' },
  MAIN_CONTENT: { type: 'testid', value: 'main-content' },
  WELCOME_MESSAGE: { type: 'testid', value: 'welcome-message' },
  USER_PROFILE: { type: 'testid', value: 'user-profile' },
  DASHBOARD_STATS: { type: 'testid', value: 'dashboard-stats' },
  DASHBOARD_TITLE: { type: 'testid', value: 'dashboard-title' },
} as const;

// Common UI Elements
export const COMMON_LOCATORS = {
  LOADING_SPINNER: { type: 'testid', value: 'loading-spinner' },
  MODAL_OVERLAY: { type: 'testid', value: 'modal-overlay' },
  TOAST_NOTIFICATION: { type: 'testid', value: 'toast-notification' },
  BREADCRUMB: { type: 'testid', value: 'breadcrumb' },
  PAGINATION: { type: 'testid', value: 'pagination' },
  ALERT_MESSAGE: { type: 'testid', value: 'alert-message' },
  SUCCESS_ALERT: { type: 'testid', value: 'success-alert' },
  ERROR_ALERT: { type: 'testid', value: 'error-alert' },
  WARNING_ALERT: { type: 'testid', value: 'warning-alert' },
} as const;

// Form Elements
export const FORM_LOCATORS = {
  SUBMIT_BUTTON: { type: 'testid', value: 'submit-button' },
  CANCEL_BUTTON: { type: 'testid', value: 'cancel-button' },
  RESET_BUTTON: { type: 'testid', value: 'reset-button' },
  FORM_VALIDATION_ERROR: { type: 'testid', value: 'form-validation-error' },
  FORM_CONTAINER: { type: 'testid', value: 'form-container' },
  REQUIRED_FIELD_INDICATOR: { type: 'testid', value: 'required-field' },
  FIELD_HELP_TEXT: { type: 'testid', value: 'field-help-text' },
} as const;

// Navigation Elements
export const NAVIGATION_LOCATORS = {
  HOME_LINK: { type: 'testid', value: 'home-link' },
  SETTINGS_LINK: { type: 'testid', value: 'settings-link' },
  PROFILE_LINK: { type: 'testid', value: 'profile-link' },
  HELP_LINK: { type: 'testid', value: 'help-link' },
  NAVIGATION_MENU: { type: 'testid', value: 'navigation-menu' },
  BURGER_MENU: { type: 'testid', value: 'burger-menu' },
  MOBILE_MENU: { type: 'testid', value: 'mobile-menu' },
} as const;

// Registration Page Locators
export const REGISTRATION_LOCATORS = {
  FIRST_NAME_INPUT: { type: 'testid', value: 'first-name-input' },
  LAST_NAME_INPUT: { type: 'testid', value: 'last-name-input' },
  EMAIL_INPUT: LOGIN_LOCATORS.EMAIL_INPUT,
  PASSWORD_INPUT: LOGIN_LOCATORS.PASSWORD_INPUT,
  CONFIRM_PASSWORD_INPUT: { type: 'testid', value: 'confirm-password-input' },
  REGISTER_BUTTON: { type: 'testid', value: 'register-button' },
  TERMS_CHECKBOX: { type: 'testid', value: 'terms-checkbox' },
  PRIVACY_CHECKBOX: { type: 'testid', value: 'privacy-checkbox' },
  REGISTRATION_FORM: { type: 'testid', value: 'registration-form' },
} as const;

// Profile Page Locators
export const PROFILE_LOCATORS = {
  PROFILE_HEADER: { type: 'testid', value: 'profile-header' },
  EDIT_PROFILE_BUTTON: { type: 'testid', value: 'edit-profile-button' },
  SAVE_PROFILE_BUTTON: { type: 'testid', value: 'save-profile-button' },
  PROFILE_AVATAR: { type: 'testid', value: 'profile-avatar' },
  PROFILE_INFO: { type: 'testid', value: 'profile-info' },
  CHANGE_PASSWORD_LINK: { type: 'testid', value: 'change-password-link' },
  DELETE_ACCOUNT_BUTTON: { type: 'testid', value: 'delete-account-button' },
} as const;

// Settings Page Locators
export const SETTINGS_LOCATORS = {
  SETTINGS_HEADER: { type: 'testid', value: 'settings-header' },
  NOTIFICATION_TOGGLE: { type: 'testid', value: 'notification-toggle' },
  EMAIL_NOTIFICATIONS: { type: 'testid', value: 'email-notifications' },
  PUSH_NOTIFICATIONS: { type: 'testid', value: 'push-notifications' },
  PRIVACY_SETTINGS: { type: 'testid', value: 'privacy-settings' },
  LANGUAGE_SELECTOR: { type: 'testid', value: 'language-selector' },
  THEME_SELECTOR: { type: 'testid', value: 'theme-selector' },
  SAVE_SETTINGS_BUTTON: { type: 'testid', value: 'save-settings-button' },
} as const;

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
} as const;

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
} as const;

// Legacy selectors (for backward compatibility)
export const SELECTORS = {
  EMAIL_INPUT: LOGIN_LOCATORS.EMAIL_INPUT,
  PASSWORD_INPUT: LOGIN_LOCATORS.PASSWORD_INPUT,
  LOGIN_BUTTON: LOGIN_LOCATORS.LOGIN_BUTTON,
} as const;

export default ALL_LOCATORS; 