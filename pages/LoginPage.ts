import { expect, type Page } from '@playwright/test';
import { RETAIL_MESSAGES } from '../utils/constants';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/');
    await expect(this.page.getByRole('heading', { name: RETAIL_MESSAGES.welcome })).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel('Username', { exact: true }).fill(username);
    await this.page.getByLabel('Password', { exact: true }).fill(password);
    await this.page.getByRole('button', { name: 'Go', exact: true }).click();
  }

  async expectInvalidCredentials(): Promise<void> {
    await expect(this.page.getByText(RETAIL_MESSAGES.invalidCredentials, { exact: true })).toBeVisible();
    await expect(this.page).toHaveURL(/\/login$/);
  }
}
