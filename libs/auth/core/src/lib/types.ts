import { User as PrivyUser } from '@privy-io/react-auth';
import { type Infer } from 'myzod';

import {
  checkWalletDataSchema,
  checkWalletResponseSchema,
  githubLoginPayloadSchema,
  siweCreateMessageResponseSchema,
  siweNonceResponseSchema,
  siweSessionResponseSchema,
  siweVerifyPayloadSchema,
  siweVerifyResponseSchema,
} from './schemas';
import { checkWalletRolesSchema } from './schemas';
import { checkWalletFlowsSchema } from './schemas';

export type CheckWalletData = Infer<typeof checkWalletDataSchema>;
export type CheckWalletResponse = Infer<typeof checkWalletResponseSchema>;

export type SiweNonceResponse = Infer<typeof siweNonceResponseSchema>;
export type SiweSessionResponse = Infer<typeof siweSessionResponseSchema>;
export type SiweCreateMessageResponse = Infer<
  typeof siweCreateMessageResponseSchema
>;
export type SiweVerifyPayload = Infer<typeof siweVerifyPayloadSchema>;
export type SiweVerifyResponse = Infer<typeof siweVerifyResponseSchema>;

export type CheckWalletRole = Infer<typeof checkWalletRolesSchema>;
export type CheckWalletFlow = Infer<typeof checkWalletFlowsSchema>;

export type AuthCtx = {
  user: PrivyUser | null;
  role: CheckWalletRole;
  flow: CheckWalletFlow;
  isCryptoNative: boolean;
  isLoading: boolean;
  isLoadingLogout: boolean;
  isAuthenticated: boolean;
  showLoginModal: () => void;
  logout: () => Promise<void>;
};

export type GithubLoginPayload = Infer<typeof githubLoginPayloadSchema>;
