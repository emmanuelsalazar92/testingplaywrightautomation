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
} as const;

// Default test data (for backward compatibility)
export const TEST_DATA = {
  ...LOGIN_TEST_DATA,
  BASE_URL: BASE_URLS.MAIN_APP,
} as const;

export default TEST_DATA; 