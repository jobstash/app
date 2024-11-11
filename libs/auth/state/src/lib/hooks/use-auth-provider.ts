import { useCallback, useEffect, useState } from 'react';

import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { useMutation } from '@tanstack/react-query';

import { CheckWalletResponse } from '@jobstash/auth/core';
import { LOCAL_STORAGE_KEYS } from '@jobstash/shared/core';
import { sentryMessage } from '@jobstash/shared/utils';

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
      setCheckWalletResponse(response);
    },
  });

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
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const { login } = useLogin({
    async onComplete(_user) {
      setupLocal();
      setHasLoggedIn(true);
    },
  });

  // Setup local on page blur
  useEffect(() => {
    if (isLoggedIn && !hasPermission && hasLoggedIn && !isLoading) {
      setupLocal();
    }
  }, [hasLoggedIn, hasPermission, isLoading, isLoggedIn, setupLocal]);

  const isAuthenticated = isLoggedIn && hasPermission && hasEmbeddedWallet;

  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const { logout: privyLogout } = useLogout({
    async onSuccess() {
      setCheckWalletResponse(DEFAULT_CHECK_WALLET_RESPONSE);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_JWT);
      window.location.href = '/jobs';
    },
  });

  const logout = () => {
    setIsLoadingLogout(true);
    privyLogout();
  };

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
