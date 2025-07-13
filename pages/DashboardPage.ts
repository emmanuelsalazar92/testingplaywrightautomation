import { Page, Locator, expect } from '@playwright/test';
import { DASHBOARD_LOCATORS } from '../locators/index';
import { BASE_URLS } from '../data/test-data';
import { TestHelpers } from '@/utils/test-helpers';

/**
 * Page Object Model for Dashboard Page
 * 
 * This class uses centralized locators and test data for better maintainability.
 * All selectors come from locators/index.js and test data from data/test-data.js
 */
export class DashboardPage {
  readonly page: Page;
  readonly appHeading: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;
  readonly sidebarNav: Locator;
  readonly mainContent: Locator;
  readonly welcomeMessage: Locator;
  readonly userProfile: Locator;
  readonly dashboardStats: Locator;
  readonly dashboardTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appHeading = page.getByRole('heading', { name: DASHBOARD_LOCATORS.APP_HEADING_TEXT });
    this.userMenu = page.locator(DASHBOARD_LOCATORS.USER_MENU);
    this.logoutButton = page.locator(DASHBOARD_LOCATORS.LOGOUT_BUTTON);
    this.sidebarNav = page.locator(DASHBOARD_LOCATORS.SIDEBAR_NAV);
    this.mainContent = page.locator(DASHBOARD_LOCATORS.MAIN_CONTENT);
    this.welcomeMessage = page.locator(DASHBOARD_LOCATORS.WELCOME_MESSAGE);
    this.userProfile = page.locator(DASHBOARD_LOCATORS.USER_PROFILE);
    this.dashboardStats = page.locator(DASHBOARD_LOCATORS.DASHBOARD_STATS);
    this.dashboardTitle = page.locator(DASHBOARD_LOCATORS.DASHBOARD_TITLE);
  }

  /**
   * Get Title of the Dashboard Page
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Check if we're on the Dashboard page
   */
  async expectOnDashboardPage(): Promise<void> {
    await TestHelpers.waitForPageLoad(this.page);
    await expect(this.page).toHaveURL(new RegExp(`${BASE_URLS.MAIN_APP}/dashboard`));
  }
    
  /**
   * Check if Dashboard title is visible
   */
  async expectDashboardTitleVisible(): Promise<void> {
    await expect(this.dashboardTitle).toBeVisible();
  }
    
  /**
   * Check if Title is visible
   */
  async expectTitleVisible(): Promise<void> {
    const title = await this.getTitle();
    await expect(title).toBe('UI Automation Practice App');
  }
} 