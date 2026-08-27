import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';
import { LoginPage } from '../../pages/LoginPage';
import { retailUsers } from '../../utils/testData';

test('TC-001 | deve autenticar administrador com credenciais válidas', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await test.step('Abrir o portal de varejo', async () => {
    await loginPage.open();
  });

  await test.step('Autenticar com o usuário público da demo', async () => {
    await loginPage.login(retailUsers.valid.username, retailUsers.valid.password);
  });

  await test.step('Validar acesso ao painel principal', async () => {
    await dashboardPage.expectLoaded();
  });
});

test('TC-002 | deve rejeitar credenciais inválidas sem criar sessão', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(retailUsers.invalid.username, retailUsers.invalid.password);
  await loginPage.expectInvalidCredentials();
  await expect(page.getByRole('link', { name: 'Logout', exact: true })).not.toBeVisible();
});
