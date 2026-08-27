import { test } from '../../fixtures/testFixtures';
import { SalesPage } from '../../pages/SalesPage';

test('TC-004 | deve disponibilizar o caixa para iniciar uma venda', async ({ page, dashboardPage }) => {
  const salesPage = new SalesPage(page);

  await test.step('Abrir o módulo Sales', async () => {
    await dashboardPage.openModule('Sales');
  });

  await test.step('Validar os controles essenciais do caixa', async () => {
    await salesPage.expectRegisterReady();
  });
});
