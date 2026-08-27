import { expect, type Page } from '@playwright/test';

export class SalesPage {
  constructor(private readonly page: Page) {}

  async expectRegisterReady(): Promise<void> {
    await expect(this.page).toHaveURL(/\/sales$/);
    await expect(this.page.getByText('Register Mode', { exact: true })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Find or Scan Item or Receipt' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /New Customer/ })).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: 'Total', exact: true }).last()).toBeVisible();
  }
}
