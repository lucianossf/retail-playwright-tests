# Retail Playwright Tests

[![Retail Playwright Tests](https://github.com/lucianossf/retail-playwright-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/lucianossf/retail-playwright-tests/actions/workflows/playwright.yml)

Automação E2E independente em Playwright e TypeScript para o [Open Source Point of Sale](https://opensourcepos.org/), sistema web de varejo/POS com estoque, clientes, fornecedores, vendas, recebimentos e relatórios.

> O OSPOS cobre a operação de varejo e ponto de venda, mas não é um ERP generalista completo. A suíte utiliza a demo pública oficial e evita alterações persistentes no ambiente compartilhado.

## Resultado validado

- Execução local em Chromium: **4 testes aprovados**.
- Validação TypeScript: **sem erros**.
- Data da última validação: **27/08/2026**.
- Estratégia: testes independentes, `workers: 1` e sem escrita na demo.

## Tecnologias e versões

| Ferramenta | Versão utilizada |
| --- | --- |
| Node.js | 24.15.0 |
| npm | 11.12.1 |
| Playwright Test | 1.62.1 |
| TypeScript | 7.0.2 |
| dotenv | 17.4.2 |
| @types/node | 26.4.0 |
| Chrome for Testing | 151.0.7922.34 |
| GitHub Actions | `ubuntu-latest` + Node.js 24 |
| actions/checkout | v7 |
| actions/setup-node | v7 |
| actions/upload-artifact | v7 |

As versões npm estão fixadas no `package-lock.json`. O campo `engines` exige Node.js 24.

## Estrutura

```text
retail-playwright-tests/
├── .github/workflows/playwright.yml
├── fixtures/testFixtures.ts
├── pages/
│   ├── DashboardPage.ts
│   ├── ItemsPage.ts
│   ├── LoginPage.ts
│   └── SalesPage.ts
├── tests/
│   ├── auth/login.spec.ts
│   ├── inventory/items.spec.ts
│   └── sales/register.spec.ts
├── utils/
│   ├── constants.ts
│   └── testData.ts
├── .env.example
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

Os Page Objects concentram locators e ações de cada tela. Os testes descrevem jornadas de negócio e as fixtures preparam a autenticação sem compartilhar estado entre casos.

## Instalação

```bash
git clone https://github.com/lucianossf/retail-playwright-tests.git
cd retail-playwright-tests
npm ci
npx playwright install chromium
```

Crie o arquivo local de ambiente no PowerShell:

```powershell
Copy-Item .env.example .env
```

No Linux ou macOS:

```bash
cp .env.example .env
```

## Variáveis de ambiente

| Variável | Finalidade | Valor público da demo |
| --- | --- | --- |
| `RETAIL_BASE_URL` | URL do sistema | `https://demo.opensourcepos.org` |
| `RETAIL_USERNAME` | Usuário da demo | `admin` |
| `RETAIL_PASSWORD` | Senha da demo | `pointofsale` |

As credenciais acima são publicadas pelo próprio OSPOS. Credenciais de ambientes privados devem ficar em `.env` ou GitHub Secrets e nunca ser versionadas.

## Execução

```bash
npm test                 # suíte completa
npm run test:chromium    # Chromium
npm run test:headed      # navegador visível
npm run test:ui          # Playwright UI
npm run test:debug       # modo debug
npm run typecheck        # validação TypeScript
npm run test:report      # relatório HTML
```

Em falhas, a configuração retém trace, screenshot e vídeo para diagnóstico.

## Cenários automatizados

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| TC-001 | Login com administrador válido | Dashboard e logout disponíveis |
| TC-002 | Login com credenciais inválidas | Acesso rejeitado e sessão não criada |
| TC-003 | Consulta ao inventário | Colunas exibidas e busca sem resultado tratada |
| TC-004 | Abertura do caixa de vendas | Controles essenciais disponíveis |

## Integração contínua

O workflow `.github/workflows/playwright.yml` executa em pull requests para `main` e manualmente por `workflow_dispatch`. A pipeline instala dependências com `npm ci`, instala Chromium, valida o TypeScript, executa os testes e publica o relatório HTML como artefato por sete dias.

## Riscos e próximos cenários

A demo é pública e compartilhada. Paralelismo e operações de escrita podem gerar falso negativo, contaminar dados de terceiros ou tornar a limpeza imprevisível. Em uma instância isolada, a evolução recomendada inclui venda completa, descontos, impostos, estoque mínimo, devolução, múltiplos pagamentos, fechamento de caixa e validação transacional entre venda, estoque e relatório.

## Licença

Distribuído sob a licença MIT. Consulte `LICENSE`.
