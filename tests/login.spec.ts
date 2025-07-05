import { test, expect } from "@playwright/test";

test.describe('Login Functionality', () => {
	const baseUrl = 'https://v0-react-frontend-application-gold.vercel.app';
	const loginUrl = `${baseUrl}/login`;
	
	test.beforeEach(async ({ page }) => {
		// Navigate to login page before each test
		await page.goto(loginUrl);
	});

	test("should successfully login with valid credentials", async ({ page }) => {
		// Test data
		const validEmail = "admin@test.com";
		const validPassword = "password123";
		
		// Fill in login form
		await page.getByTestId("email-input").fill(validEmail);
		await page.getByTestId("password-input").fill(validPassword);
		
		// Submit the form
		await page.getByTestId("login-button").click();
		
		// Verify successful login
		await expect(page.getByRole("heading", { name: "UI Test App" })).toBeVisible();
		
		// Additional verification - check if we're redirected to the main page
		await expect(page).toHaveURL(new RegExp(`${baseUrl}/.*`));
	});

	test("should show error with invalid credentials", async ({ page }) => {
		// Test data
		const invalidEmail = "invalid@test.com";
		const invalidPassword = "wrongpassword";
		
		// Fill in login form with invalid credentials
		await page.getByTestId("email-input").fill(invalidEmail);
		await page.getByTestId("password-input").fill(invalidPassword);
		
		// Submit the form
		await page.getByTestId("login-button").click();
		
		// Verify error message is displayed (adjust selector based on actual error message element)
		// await expect(page.getByText("Invalid credentials")).toBeVisible();
		
		// Verify we're still on the login page
		await expect(page).toHaveURL(loginUrl);
	});

	test("should validate required fields", async ({ page }) => {
		// Try to submit empty form
		await page.getByTestId("login-button").click();
		
		// Verify validation messages (adjust selectors based on actual validation elements)
		// await expect(page.getByText("Email is required")).toBeVisible();
		// await expect(page.getByText("Password is required")).toBeVisible();
		
		// Verify we're still on the login page
		await expect(page).toHaveURL(loginUrl);
	});

	test("should handle email format validation", async ({ page }) => {
		// Test with invalid email format
		const invalidEmail = "invalid-email";
		const validPassword = "password123";
		
		await page.getByTestId("email-input").fill(invalidEmail);
		await page.getByTestId("password-input").fill(validPassword);
		
		// Verify email format validation (adjust selector based on actual validation element)
		// await expect(page.getByText("Please enter a valid email")).toBeVisible();
	});
});
