# Architecture Overview

## Centralized Architecture

Our Playwright automation project follows a centralized architecture to ensure maintainability, consistency, and scalability.

## File Structure

```
playwright_automation/
├── locators/
│   └── index.js              # Centralized locators
├── data/
│   └── test-data.ts          # Centralized test data
├── utils/
│   └── test-helpers.ts       # Utility functions only
├── pages/
│   └── LoginPage.ts          # Page Object Models
├── tests/
│   ├── login.spec.ts         # E2E tests
│   └── login-pom.spec.ts     # POM tests
└── scripts/
    ├── validate-locators.js
    ├── validate-naming-conventions.js
    └── validate-console-clean.js
```

## Centralized Components

### 1. Locators (`locators/index.js`)

**Purpose**: Single source of truth for all selectors and IDs.

**Benefits**:
- Easy maintenance when UI changes
- Prevents duplicate locators
- Improves test reliability
- Clear organization by page/component

**Structure**:
```javascript
export const LOGIN_LOCATORS = {
  EMAIL_INPUT: '[data-testid="email-input"]',
  PASSWORD_INPUT: '[data-testid="password-input"]',
  LOGIN_BUTTON: '[data-testid="login-button"]',
  // ... more locators
};

export const DASHBOARD_LOCATORS = {
  APP_HEADING: 'h1:has-text("UI Test App")',
  // ... more locators
};

// All locators combined for validation
export const ALL_LOCATORS = {
  ...LOGIN_LOCATORS,
  ...DASHBOARD_LOCATORS,
  // ... more categories
};
```

**Usage in Tests**:
```typescript
import { LOGIN_LOCATORS, DASHBOARD_LOCATORS } from '../locators/index.js';

// Use centralized locators
await page.locator(LOGIN_LOCATORS.EMAIL_INPUT).fill(email);
await expect(page.locator(DASHBOARD_LOCATORS.APP_HEADING)).toBeVisible();
```

### 2. Test Data (`data/test-data.ts`)

**Purpose**: Centralized test data for all scenarios.

**Benefits**:
- Single source of truth for test data
- Easy maintenance when data changes
- Prevents duplication across test files
- Environment-specific data support

**Structure**:
```typescript
export const BASE_URLS = {
  MAIN_APP: 'https://v0-react-frontend-application-gold.vercel.app',
  STAGING: 'https://staging.example.com',
  PRODUCTION: 'https://production.example.com',
} as const;

export const LOGIN_TEST_DATA = {
  VALID_EMAIL: 'admin@test.com',
  VALID_PASSWORD: 'password123',
  INVALID_EMAIL: 'invalid@test.com',
  INVALID_PASSWORD: 'wrongpassword',
  // ... more test data
} as const;

export const ERROR_MESSAGES = {
  LOGIN: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_REQUIRED: 'Email is required',
    // ... more error messages
  },
} as const;
```

**Usage in Tests**:
```typescript
import { BASE_URLS, LOGIN_TEST_DATA, ERROR_MESSAGES } from '../data/test-data.js';

// Use centralized test data
await page.goto(`${BASE_URLS.MAIN_APP}/login`);
await page.locator(LOGIN_LOCATORS.EMAIL_INPUT).fill(LOGIN_TEST_DATA.VALID_EMAIL);
await expect(page.getByText(ERROR_MESSAGES.LOGIN.INVALID_CREDENTIALS)).toBeVisible();
```

### 3. Utility Functions (`utils/test-helpers.ts`)

**Purpose**: Common utility functions for test operations.

**Benefits**:
- Reusable helper functions
- Consistent test operations
- Reduced code duplication
- Better maintainability

**Structure**:
```typescript
export class TestHelpers {
  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
  }

  static async takeScreenshot(page: Page, name: string): Promise<void> {
    // Screenshot logic
  }

  static generateRandomEmail(): string {
    // Random email generation
  }

  // ... more utility methods
}
```

**Usage in Tests**:
```typescript
import { TestHelpers } from '../utils/test-helpers';

// Use utility functions
await TestHelpers.waitForPageLoad(page);
await TestHelpers.takeScreenshot(page, 'login-success');
const randomEmail = TestHelpers.generateRandomEmail();
```

## Migration from Old Structure

### Before (Duplicated/Inconsistent)
```typescript
// test-helpers.ts (had locators and test data)
export const TEST_DATA = {
  VALID_EMAIL: 'admin@test.com',
  // ... duplicated data
};

export const SELECTORS = {
  EMAIL_INPUT: '[data-testid="email-input"]',
  // ... duplicated selectors
};

// login.spec.ts (hardcoded values)
const baseUrl = 'https://v0-react-frontend-application-gold.vercel.app';
const validEmail = "admin@test.com";
await page.getByTestId("email-input").fill(validEmail);
```

### After (Centralized)
```typescript
// locators/index.js (centralized locators)
export const LOGIN_LOCATORS = {
  EMAIL_INPUT: '[data-testid="email-input"]',
  // ... all locators
};

// data/test-data.ts (centralized test data)
export const BASE_URLS = {
  MAIN_APP: 'https://v0-react-frontend-application-gold.vercel.app',
};

export const LOGIN_TEST_DATA = {
  VALID_EMAIL: 'admin@test.com',
  // ... all test data
};

// login.spec.ts (using centralized imports)
import { LOGIN_LOCATORS } from '../locators/index.js';
import { BASE_URLS, LOGIN_TEST_DATA } from '../data/test-data.js';

const baseUrl = BASE_URLS.MAIN_APP;
await page.locator(LOGIN_LOCATORS.EMAIL_INPUT).fill(LOGIN_TEST_DATA.VALID_EMAIL);
```

## Benefits of Centralized Architecture

### 1. **Maintainability**
- Single place to update locators when UI changes
- Single place to update test data
- Easier to find and fix issues

### 2. **Consistency**
- All tests use the same locators and data
- Consistent naming conventions
- Reduced chance of errors

### 3. **Scalability**
- Easy to add new pages and components
- Clear organization as project grows
- Reusable components

### 4. **Quality Assurance**
- Automated validation of locators (no duplicates)
- Automated validation of naming conventions
- Automated validation of console cleanliness

### 5. **Team Collaboration**
- Clear separation of concerns
- Easy onboarding for new team members
- Consistent coding standards

## Best Practices

### 1. **Locator Management**
- Always use `data-testid` attributes when possible
- Group locators by page/component
- Use descriptive names
- Avoid hardcoded selectors in test files

### 2. **Test Data Management**
- Use constants for all test data
- Group data by feature/functionality
- Include different data types (valid, invalid, edge cases)
- Use environment-specific data when needed

### 3. **Utility Functions**
- Keep utilities focused on common operations
- Don't include business logic in utilities
- Make utilities reusable across different tests
- Document complex utility functions

### 4. **Import Organization**
- Use explicit imports for better clarity
- Group imports by type (locators, data, utilities)
- Use relative paths consistently
- Avoid circular dependencies

## Validation and Quality Assurance

Our centralized architecture is supported by automated validation:

1. **Locator Validation**: Checks for duplicates and hardcoded selectors
2. **Naming Convention Validation**: Ensures consistent naming
3. **Console Clean Validation**: Prevents unwanted console output
4. **Lint Validation**: Ensures code quality and consistency

## Conclusion

The centralized architecture provides:
- **Better maintainability** through single sources of truth
- **Improved consistency** across all tests
- **Enhanced scalability** as the project grows
- **Quality assurance** through automated validation
- **Team collaboration** through clear organization

This architecture ensures our Playwright automation project remains maintainable, reliable, and scalable as it grows. 