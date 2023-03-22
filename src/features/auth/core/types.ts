import { CHECK_WALLET_RESULT } from './constants';

export type CheckWalletData =
  (typeof CHECK_WALLET_RESULT)[keyof typeof CHECK_WALLET_RESULT];
