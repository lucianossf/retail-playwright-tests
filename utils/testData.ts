export const retailUsers = {
  valid: {
    username: process.env.RETAIL_USERNAME ?? 'admin',
    password: process.env.RETAIL_PASSWORD ?? 'pointofsale',
  },
  invalid: {
    username: 'invalid-user',
    password: 'invalid-password',
  },
} as const;

export const retailSearchData = {
  missingItem: `playwright-missing-item-${Date.now()}`,
} as const;
