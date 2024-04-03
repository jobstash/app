export const userQueryKeys = {
  all: ['users'] as const,
  walletData: () => [...userQueryKeys.all, 'wallet-data'] as const,
  orgReviews: (address: `0x${string}` | undefined) =>
    [...userQueryKeys.all, 'org-reviews', address] as const,
};
export type UserQueryKeys = typeof userQueryKeys;
