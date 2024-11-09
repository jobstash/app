import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CheckWalletResponse } from '@jobstash/auth/core';
import { LOCAL_STORAGE_KEYS } from '@jobstash/shared/core';
import { sentryMessage } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getCheckWallet } from '@jobstash/auth/data';

import { useHasEmbeddedWallet } from './use-has-embedded-wallet';

const DEFAULT_CHECK_WALLET_RESPONSE: CheckWalletResponse = {
  cryptoNative: false,
  token: '',
  permissions: [],
};

export const useAuthProvider = () => {
  const [checkWalletResponse, setCheckWalletResponse] =
    useState<CheckWalletResponse>(DEFAULT_CHECK_WALLET_RESPONSE);
  const { cryptoNative, permissions } = checkWalletResponse;
  const hasPermission = permissions.length > 0;

  const {
    authenticated: isLoggedIn,
    user,
    getAccessToken,
    ready,
    createWallet,
  } = usePrivy();

  const hasEmbeddedWallet = useHasEmbeddedWallet();

  const { mutate: setupLocal, isPending: isLoadingSetup } = useMutation({
    async mutationFn() {
      const accessToken = await getAccessToken();
      const response = await getCheckWallet(accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_JWT, response.token);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CHECK_WALLET_RESPONSE,
        JSON.stringify(response),
      );
      setCheckWalletResponse(response);
    },
  });

  useEffect(() => {
    const localCheckWalletResponse = localStorage.getItem(
      LOCAL_STORAGE_KEYS.CHECK_WALLET_RESPONSE,
    );

    if (!localCheckWalletResponse) {
      setupLocal();
      return;
    }

    if (localCheckWalletResponse && !hasPermission) {
      setCheckWalletResponse(JSON.parse(localCheckWalletResponse));
    }
  }, [hasPermission, setupLocal]);

  const [isCreatingWallet, setIsCreatingWallet] = useState(false);

  const createEmbeddedWallet = useCallback(async () => {
    setIsCreatingWallet(true);
    try {
      await createWallet();
      setupLocal();
    } catch (error) {
      sentryMessage('createEmbedWallet', (error as Error).message);
      window?.location.reload();
    }

    setIsCreatingWallet(false);
  }, [createWallet, setupLocal]);

  // Create embedded wallet if user is logged in and doesn't have one
  useEffect(() => {
    if (!hasEmbeddedWallet && !isCreatingWallet && isLoggedIn && ready) {
      createEmbeddedWallet();
    }
  }, [
    createEmbeddedWallet,
    hasEmbeddedWallet,
    isCreatingWallet,
    isLoggedIn,
    ready,
  ]);

  const isLoading = isLoadingSetup || !ready || isCreatingWallet;

  // Setup local after privy login
  const { login } = useLogin({
    onComplete(_user) {
      setupLocal();
    },
  });

  const isAuthenticated = isLoggedIn && hasPermission && hasEmbeddedWallet;

  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const { logout: privyLogout } = useLogout({
    async onSuccess() {
      setCheckWalletResponse(DEFAULT_CHECK_WALLET_RESPONSE);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_JWT);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CHECK_WALLET_RESPONSE);
      queryClient.cancelQueries();
      queryClient.clear();
      await queryClient.invalidateQueries({
        queryKey: [mwVersion],
      });
    },
  });

  const router = useRouter();
  const { mutateAsync: logout, isPending: isLoadingLogout } = useMutation({
    async mutationFn() {
      setCheckWalletResponse(DEFAULT_CHECK_WALLET_RESPONSE);
      await privyLogout();
      router.push('/jobs');
    },
  });

  return {
    user,
    permissions,
    isCryptoNative: cryptoNative,
    isLoading,
    isLoadingLogout,
    isLoggedIn,
    isAuthenticated,
    showLoginModal: login,
    logout,
  };
};
