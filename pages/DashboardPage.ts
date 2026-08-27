import { expect, type Page } from '@playwright/test';
import { RETAIL_MESSAGES, RETAIL_MODULES } from '../utils/constants';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/home$/);
    await expect(this.page.getByRole('heading', { name: RETAIL_MESSAGES.dashboard })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Logout', exact: true })).toBeVisible();
  }

  async expectCoreModulesAvailable(): Promise<void> {
    for (const moduleName of RETAIL_MODULES) {
      await expect(this.page.getByRole('link', { name: moduleName, exact: true }).first()).toBeVisible();
    }
  }

  async openModule(moduleName: 'Items' | 'Sales'): Promise<void> {
    await this.page.getByRole('link', { name: moduleName, exact: true }).first().click();
  }
}
