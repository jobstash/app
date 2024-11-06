import { User as PrivyUser } from '@privy-io/react-auth';
import { type Infer } from 'myzod';

import {
  affiliatedOrgSchema,
  checkWalletPermissionSchema,
  checkWalletResponseSchema,
  githubLoginPayloadSchema,
  siweCreateMessageResponseSchema,
  siweNonceResponseSchema,
  siweSessionResponseSchema,
  siweVerifyPayloadSchema,
  siweVerifyResponseSchema,
} from './schemas';

export type CheckWalletResponse = Infer<typeof checkWalletResponseSchema>;

export type SiweNonceResponse = Infer<typeof siweNonceResponseSchema>;
export type SiweSessionResponse = Infer<typeof siweSessionResponseSchema>;
export type SiweCreateMessageResponse = Infer<
  typeof siweCreateMessageResponseSchema
>;
export type SiweVerifyPayload = Infer<typeof siweVerifyPayloadSchema>;
export type SiweVerifyResponse = Infer<typeof siweVerifyResponseSchema>;

export type CheckWalletPermission = Infer<typeof checkWalletPermissionSchema>;

export type AuthCtx = {
  user: PrivyUser | null;
  permissions: CheckWalletPermission[];
  isCryptoNative: boolean;
  isLoading: boolean;
  isLoadingLogout: boolean;
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  showLoginModal: () => void;
  logout: () => Promise<void>;
};

export type GithubLoginPayload = Infer<typeof githubLoginPayloadSchema>;

export type AffiliatedOrganization = Infer<typeof affiliatedOrgSchema>;
