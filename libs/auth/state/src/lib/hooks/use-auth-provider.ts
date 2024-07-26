import { usePrivy } from '@privy-io/react-auth';
import { useMutation } from '@tanstack/react-query';

import { CheckWalletFlow, CheckWalletRole } from '@jobstash/auth/core';

import { useCheckWallet } from './use-check-wallet';

const useLogout = (privyLogout: () => Promise<void>) =>
  useMutation({
    async mutationFn() {
      await privyLogout();
      // TODO: Do mw logout
    },
  });

export const useAuthProvider = () => {
  const { authenticated, login, user, logout: privyLogout } = usePrivy();

  const { mutateAsync: logout, isPending: isLoadingLogout } =
    useLogout(privyLogout);

  const { data: checkWalletData, isLoading } = useCheckWallet(authenticated);

  return {
    user,
    role: checkWalletData?.role as CheckWalletRole,
    flow: checkWalletData?.flow as CheckWalletFlow,
    isCryptoNative: checkWalletData?.cryptoNative ?? false,
    isLoading,
    isLoadingLogout,
    isAuthenticated: authenticated,
    // TODO: Uncomment these after mw integration
    // &&
    // checkWalletData !== undefined &&
    // checkWalletData.role !== CHECK_WALLET_ROLES.ANON,
    showLoginModal: login,
    logout,
  };
};
