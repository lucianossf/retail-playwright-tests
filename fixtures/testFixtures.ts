import { test as base, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { retailUsers } from '../utils/testData';

type RetailFixtures = {
  dashboardPage: DashboardPage;
};

export const test = base.extend<RetailFixtures>({
  dashboardPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.open();
    await loginPage.login(retailUsers.valid.username, retailUsers.valid.password);
    await dashboardPage.expectLoaded();
    await use(dashboardPage);
  },
});

export { expect };
