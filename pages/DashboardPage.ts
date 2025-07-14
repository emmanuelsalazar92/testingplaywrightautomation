import { Page, Locator, expect } from '@playwright/test';
import { DASHBOARD_LOCATORS } from '../locators/index';
import { BASE_URLS } from '../data/test-data';
import { TestHelpers, getLocator } from '@/utils/test-helpers';

/**
 * Page Object Model for Dashboard Page
 * 
 * This class uses centralized locators and test data for better maintainability.
 * All selectors come from locators/index.js and test data from data/test-data.js
 */
export class DashboardPage {
  readonly page: Page;
  readonly userMenu: Locator;
  readonly dashboardTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userMenu = getLocator(page, DASHBOARD_LOCATORS.USER_MENU);
    this.dashboardTitle = getLocator(page, DASHBOARD_LOCATORS.DASHBOARD_TITLE);
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