export const userQueryKeys = {
  all: ['users'] as const,
  walletData: () => [...userQueryKeys.all, 'wallet-data'] as const,
};
export type UserQueryKeys = typeof userQueryKeys;
