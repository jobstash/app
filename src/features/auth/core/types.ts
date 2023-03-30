import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from './constants';

export type CheckWalletRole =
  (typeof CHECK_WALLET_ROLES)[keyof typeof CHECK_WALLET_ROLES];

export type CheckWalletFlow =
  (typeof CHECK_WALLET_FLOWS)[keyof typeof CHECK_WALLET_FLOWS];

export interface CheckWalletData {
  role: CheckWalletRole;
  flow: CheckWalletFlow;
}
