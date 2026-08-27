import { test, expect } from '../../fixtures/testFixtures';
import { ItemsPage } from '../../pages/ItemsPage';
import { retailSearchData } from '../../utils/testData';

test('TC-003 | deve consultar o inventário sem alterar dados compartilhados', async ({ page, dashboardPage }) => {
  const itemsPage = new ItemsPage(page);

  await test.step('Abrir o módulo Items', async () => {
    await dashboardPage.openModule('Items');
    await itemsPage.expectLoaded();
  });

  await test.step('Validar as colunas essenciais do inventário', async () => {
    await itemsPage.expectInventoryColumns();
  });

  await test.step('Pesquisar um item inexistente', async () => {
    await itemsPage.search(retailSearchData.missingItem);
    await itemsPage.expectNoResults();
  });

  await expect(page.getByRole('button', { name: /Delete/ })).toBeDisabled();
});
