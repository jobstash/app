import { LinkedAccounts } from '@jobstash/shared/core';

export const getLinkedAccountsString = (
  linkedAccounts: LinkedAccounts,
): string =>
  [
    linkedAccounts.github ?? '',
    linkedAccounts.email ?? '',
    linkedAccounts.google ?? '',
    linkedAccounts.telegram ?? '',
    linkedAccounts.farcaster ?? '',
    linkedAccounts.discord ?? '',
    linkedAccounts.twitter ?? '',
    linkedAccounts.apple ?? '',
    ...linkedAccounts.wallets,
  ]
    .filter(Boolean)
    .join(' ');
