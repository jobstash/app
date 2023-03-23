import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from './constants';

export interface CheckWalletResponse {
  role: (typeof CHECK_WALLET_ROLES)[keyof typeof CHECK_WALLET_ROLES];
  flow: (typeof CHECK_WALLET_FLOWS)[keyof typeof CHECK_WALLET_FLOWS];
}
