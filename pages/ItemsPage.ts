import { expect, type Page } from '@playwright/test';
import { RETAIL_MESSAGES } from '../utils/constants';

export class ItemsPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/items$/);
    await expect(this.page.getByRole('button', { name: /New Item/ })).toBeVisible();
    await expect(this.page.getByRole('searchbox', { name: 'Search' })).toBeVisible();
  }

  async search(itemName: string): Promise<void> {
    await this.page.getByRole('searchbox', { name: 'Search' }).fill(itemName);
  }

  async expectNoResults(): Promise<void> {
    await expect(this.page.getByText(RETAIL_MESSAGES.emptyItems, { exact: true })).toBeVisible();
  }

  async expectInventoryColumns(): Promise<void> {
    for (const column of ['Item Name', 'Category', 'Retail Price', 'Quantity']) {
      await expect(this.page.getByText(column, { exact: true }).filter({ visible: true })).toBeVisible();
    }
  }
}
