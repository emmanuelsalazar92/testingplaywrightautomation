/**
 * Centralized Test Data Configuration
 * 
 * This file contains all test data used across the Playwright automation project.
 * Benefits:
 * - Single source of truth for all test data
 * - Easy maintenance when test data changes
 * - Prevents duplication across test files
 * - Improves test data organization
 */

// Base URLs
export const BASE_URLS = {
  MAIN_APP: 'https://v0-react-frontend-application-gold.vercel.app',
  STAGING: 'https://staging.example.com',
  PRODUCTION: 'https://production.example.com',
} as const;

// Login Test Data
export const LOGIN_TEST_DATA = {
  VALID_EMAIL: 'admin@test.com',
  VALID_PASSWORD: 'password123',
  INVALID_EMAIL: 'invalid@test.com',
  INVALID_PASSWORD: 'wrongpassword',
  EMPTY_EMAIL: '',
  EMPTY_PASSWORD: '',
  INVALID_EMAIL_FORMAT: 'invalid-email',
  LONG_EMAIL: 'a'.repeat(100) + '@example.com',
  LONG_PASSWORD: 'a'.repeat(100),
} as const;

// User Test Data
export const USER_TEST_DATA = {
  ADMIN_USER: {
    email: 'admin@test.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin',
  },
  REGULAR_USER: {
    email: 'user@test.com',
    password: 'password123',
    name: 'Regular User',
    role: 'user',
  },
  NEW_USER: {
    email: 'newuser@test.com',
    password: 'newpassword123',
    name: 'New User',
    role: 'user',
  },
} as const;

// Form Test Data
export const FORM_TEST_DATA = {
  VALID_NAMES: {
    FIRST_NAME: 'John',
    LAST_NAME: 'Doe',
    FULL_NAME: 'John Doe',
  },
  VALID_PHONES: {
    US_PHONE: '+1-555-123-4567',
    INTERNATIONAL_PHONE: '+44-20-7946-0958',
  },
  VALID_ADDRESSES: {
    STREET: '123 Main Street',
    CITY: 'New York',
    STATE: 'NY',
    ZIP_CODE: '10001',
    COUNTRY: 'United States',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  LOGIN: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_REQUIRED: 'Email is required',
    PASSWORD_REQUIRED: 'Password is required',
    INVALID_EMAIL_FORMAT: 'Please enter a valid email address',
  },
  REGISTRATION: {
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    WEAK_PASSWORD: 'Password must be at least 8 characters',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_FORMAT: 'Invalid format',
    TOO_LONG: 'Value is too long',
    TOO_SHORT: 'Value is too short',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful',
  REGISTRATION: 'Registration successful',
  PROFILE_UPDATE: 'Profile updated successfully',
  PASSWORD_CHANGE: 'Password changed successfully',
} as const;

// Timeouts
export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
  VERY_LONG: 60000,
} as const;

// Test Data for Different Environments
export const ENVIRONMENT_DATA = {
  DEVELOPMENT: {
    baseUrl: BASE_URLS.MAIN_APP,
    users: USER_TEST_DATA,
  },
  STAGING: {
    baseUrl: BASE_URLS.STAGING,
    users: USER_TEST_DATA,
  },
  PRODUCTION: {
    baseUrl: BASE_URLS.PRODUCTION,
    users: USER_TEST_DATA,
  },
} as const;

// Default test data (for backward compatibility)
export const TEST_DATA = {
  ...LOGIN_TEST_DATA,
  BASE_URL: BASE_URLS.MAIN_APP,
} as const;

export default TEST_DATA; 