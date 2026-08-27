export const RETAIL_URLS = {
  base: 'https://demo.opensourcepos.org',
  items: '/items',
  sales: '/sales',
} as const;

export const RETAIL_MESSAGES = {
  welcome: 'Welcome to OSPOS!',
  dashboard: 'Welcome to OSPOS, click a module below to get started.',
  invalidCredentials: 'Invalid username and/or password.',
  emptyItems: 'No Items to display.',
} as const;

export const RETAIL_MODULES = [
  'Customers',
  'Items',
  'Suppliers',
  'Reports',
  'Receivings',
  'Sales',
] as const;
