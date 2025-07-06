# Playwright Automation Project

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.53+-blue.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![ESLint](https://img.shields.io/badge/ESLint-8.57+-yellow.svg)](https://eslint.org/)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)

A comprehensive Playwright automation testing project with best practices, TypeScript support, and modern testing patterns.

## 🚀 Features

- **TypeScript Support**: Full TypeScript integration with strict type checking
- **Page Object Model**: Organized test structure using POM pattern
- **Multiple Browsers**: Test across Chromium, Firefox, WebKit, and mobile browsers
- **Comprehensive Reporting**: HTML, JSON, and JUnit reports
- **CI/CD Ready**: Optimized for continuous integration
- **ESLint Integration**: Code quality and consistency
- **Utility Functions**: Reusable test helpers and utilities
- **Code Coverage**: Integrated coverage reporting with c8
- **Validation Scripts**: Automated checks for locators, naming conventions, and console logs

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playwright_automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run test:install-deps
   ```

## 🧪 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Generate test code
npm run test:codegen

# Run tests with trace recording
npm run test:trace

# Show test report
npm run test:report

# Run tests with coverage
npm run test:coverage
```

### Advanced Commands

```bash
# Run specific browser tests
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:mobile

# Run tests in parallel
npm run test:parallel

# Run tests with sharding (for CI)
npm run test:shard

# Run specific test file
npx playwright test tests/e2e/login.spec.ts

# Run specific test by name
npx playwright test -g "should successfully login"
```

## 📁 Project Structure

```
playwright_automation/
├── tests/                    # Test files
│   ├── e2e/                 # End-to-end tests
│   │   └── login.spec.ts    # Login functionality tests
│   ├── integration/         # Integration tests
│   └── unit/               # Unit tests
├── pages/                   # Page Object Models
│   └── LoginPage.ts         # Login page POM
├── utils/                   # Utility functions
│   └── test-helpers.ts      # Common test helpers
├── locators/                # Centralized locators
│   └── index.js            # All test selectors
├── data/                    # Test data
│   └── test-data.ts        # Test data and fixtures
├── scripts/                 # Validation scripts
│   ├── validate-locators.js
│   ├── validate-naming-conventions.js
│   └── validate-console-clean.js
├── docs/                    # Documentation
│   ├── architecture-overview.md
│   ├── test-architecture.md
│   └── workflows-overview.md
├── .github/workflows/       # CI/CD workflows
│   └── ci.yml              # Main CI workflow
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── .eslintrc.json          # ESLint configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## 🏗️ Architecture

### Page Object Model (POM)
The project uses the Page Object Model pattern to separate test logic from page interactions:

```typescript
import { LoginPage } from '../pages/LoginPage';

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginWithValidCredentials();
});
```

### Centralized Locators
All selectors are centralized in `locators/index.js` for better maintenance:

```typescript
import { LOGIN_LOCATORS } from '../locators';

await page.locator(LOGIN_LOCATORS.EMAIL_INPUT).fill('user@example.com');
```

### Test Helpers
Common utility functions for test operations:

```typescript
import { TestHelpers } from '../utils/test-helpers';

await TestHelpers.waitForPageLoad(page);
await TestHelpers.takeScreenshot(page, 'login-success');
```

## 🔧 Configuration

### Playwright Config
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari, Edge
- **Reporting**: HTML, JSON, and JUnit reports
- **Screenshots**: On failure only
- **Videos**: Retained on failure
- **Traces**: On first retry
- **Test ID Attribute**: Configured for `data-testid`

### TypeScript Config
- **Target**: ES2022
- **Module**: ESNext
- **Strict**: Enabled with additional strict options
- **Path Mapping**: Configured for better imports

### ESLint Config
- **TypeScript**: Full support
- **Playwright**: Specific rules for async operations
- **Best Practices**: Enforced coding standards

## 📊 Test Reports & Coverage

After running tests, view reports:

```bash
# Open HTML report
npm run test:report

# Run with coverage
npm run test:coverage
```

Reports include:
- Test results and status
- Screenshots on failure
- Video recordings
- Trace files for debugging
- Code coverage metrics

## 🔍 Validation Scripts

The project includes automated validation scripts:

```bash
# Validate all
npm run validate:all

# Individual validations
npm run validate:locators      # Check for duplicate locators
npm run validate:naming        # Check naming conventions
npm run validate:console       # Check for console statements
```

## 🚀 CI/CD Integration

### GitHub Actions
The project includes a unified GitHub Actions workflow (`.github/workflows/ci.yml`) that:

1. Runs linting and validation
2. Executes tests across multiple browsers
3. Generates coverage reports
4. Uploads test artifacts

### Local CI Setup
```bash
# Run CI commands locally
npm run ci:lint
npm run ci:validate
npm run ci:test
npm run ci:coverage
```

## 🐛 Debugging

### VS Code Debugging
1. Install the Playwright VS Code extension
2. Set breakpoints in your test files
3. Use the "Debug Test" command

### Playwright Inspector
```bash
# Run tests with inspector
npm run test:debug
```

### Trace Viewer
```bash
# Record traces
npm run test:trace
```

## 🧹 Maintenance

### Cleaning
```bash
# Clean test artifacts
npm run clean

# Clean everything (including node_modules)
npm run clean:all
```

## 📚 Documentation

- [Architecture Overview](docs/architecture-overview.md)
- [Test Architecture](docs/test-architecture.md)
- [Workflows Overview](docs/workflows-overview.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run validation scripts: `npm run validate:all`
5. Run tests: `npm test`
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
1. Check the [Playwright documentation](https://playwright.dev/)
2. Review test reports and traces
3. Use the debugging tools provided
4. Check the project's issue tracker # testingplaywrightautomation
