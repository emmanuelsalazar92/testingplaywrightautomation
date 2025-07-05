# Playwright Automation Project

A comprehensive Playwright automation testing project with best practices, TypeScript support, and modern testing patterns.

## 🚀 Features

- **TypeScript Support**: Full TypeScript integration with strict type checking
- **Page Object Model**: Organized test structure using POM pattern
- **Multiple Browsers**: Test across Chromium, Firefox, WebKit, and mobile browsers
- **Comprehensive Reporting**: HTML, JSON, and JUnit reports
- **CI/CD Ready**: Optimized for continuous integration
- **ESLint Integration**: Code quality and consistency
- **Utility Functions**: Reusable test helpers and utilities

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
```

### Advanced Commands

```bash
# Run specific test file
npx playwright test tests/login.spec.ts

# Run specific test by name
npx playwright test -g "should successfully login"

# Run tests on specific browser
npx playwright test --project=chromium

# Run tests in parallel
npx playwright test --workers=4

# Run tests with sharding (for CI)
npx playwright test --shard=1/3
```

## 📁 Project Structure

```
playwright_automation/
├── tests/                    # Test files
│   └── login.spec.ts        # Login functionality tests
├── pages/                   # Page Object Models
│   └── LoginPage.ts         # Login page POM
├── utils/                   # Utility functions
│   └── test-helpers.ts      # Common test helpers
├── playwright.config.js     # Playwright configuration
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

### Test Helpers
Common utility functions for test operations:

```typescript
import { TestHelpers } from '../utils/test-helpers';

await TestHelpers.waitForPageLoad(page);
await TestHelpers.takeScreenshot(page, 'login-success');
```

## 🔧 Configuration

### Playwright Config
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari, Edge, Chrome
- **Reporting**: HTML, JSON, and JUnit reports
- **Screenshots**: On failure only
- **Videos**: Retained on failure
- **Traces**: On first retry

### TypeScript Config
- **Target**: ES2022
- **Module**: ESNext
- **Strict**: Enabled
- **Path Mapping**: Configured for better imports

### ESLint Config
- **TypeScript**: Full support
- **Playwright**: Specific rules for async operations
- **Best Practices**: Enforced coding standards

## 📊 Test Reports

After running tests, view reports:

```bash
# Open HTML report
npm run test:report

# Or directly
npx playwright show-report
```

Reports include:
- Test results and status
- Screenshots on failure
- Video recordings
- Trace files for debugging

## 🚀 CI/CD Integration

### GitHub Actions
The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

1. Runs tests on every push and PR
2. Installs dependencies and browsers
3. Executes tests in parallel
4. Uploads test reports as artifacts

### Local CI Setup
```bash
# Install only required browsers for CI
npx playwright install chromium --with-deps

# Run tests with CI optimizations
npx playwright test --reporter=html,junit
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

# View traces
npx playwright show-report
```

## 📝 Best Practices

### Test Organization
- Use descriptive test names
- Group related tests with `test.describe()`
- Use `test.beforeEach()` for setup
- Keep tests independent

### Selectors
- Prefer `data-testid` attributes
- Use semantic selectors (role, text)
- Avoid CSS selectors when possible
- Make selectors resilient to UI changes

### Assertions
- Use web-first assertions
- Add meaningful error messages
- Use soft assertions when appropriate
- Verify both positive and negative cases

### Performance
- Use `waitForLoadState()` for page loads
- Implement proper timeouts
- Use parallel execution when possible
- Optimize browser installations for CI

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Run linting and type checking:
   ```bash
   npm run lint
   npm run type-check
   ```

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
1. Check the [Playwright documentation](https://playwright.dev/)
2. Review test reports and traces
3. Use the debugging tools provided
4. Check the project's issue tracker # testingplaywrightautomation
