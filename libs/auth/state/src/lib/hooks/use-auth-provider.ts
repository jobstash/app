import { useEffect, useState } from 'react';

import { getAccessToken, useLogin, usePrivy } from '@privy-io/react-auth';
import { useMutation } from '@tanstack/react-query';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROLES,
  CheckWalletFlow,
  CheckWalletResponse,
  CheckWalletRole,
} from '@jobstash/auth/core';
import { LOCAL_STORAGE_KEYS } from '@jobstash/shared/core';

import { getCheckWallet } from '@jobstash/auth/data';

const DEFAULT_CHECK_WALLET_RESPONSE: CheckWalletResponse = {
  role: CHECK_WALLET_ROLES.ANON,
  flow: CHECK_WALLET_FLOWS.DEFAULT,
  cryptoNative: false,
  token: '',
};

export const useAuthProvider = () => {
  const [checkWalletResponse, setCheckWalletResponse] =
    useState<CheckWalletResponse>(DEFAULT_CHECK_WALLET_RESPONSE);
  const { role, flow, cryptoNative } = checkWalletResponse;

  const { authenticated: isLoggedIn, user, logout: privyLogout } = usePrivy();

  const { mutate: setupLocal, isPending: isLoading } = useMutation({
    async mutationFn() {
      const accessToken = await getAccessToken();
      const response = await getCheckWallet(accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_JWT, response.token);
      setCheckWalletResponse(response);
    },
  });

  // Setup local after privy login
  const { login } = useLogin({
    onComplete(_user) {
      // TODO: check user and do JOB-666
      setupLocal();
    },
  });

  // Setup local on page blur
  useEffect(() => {
    if (isLoggedIn && role === CHECK_WALLET_ROLES.ANON) {
      setupLocal();
    }
  }, [isLoggedIn, role, setupLocal]);

  const isAuthenticated = isLoggedIn && role !== CHECK_WALLET_ROLES.ANON;

  const { mutateAsync: logout, isPending: isLoadingLogout } = useMutation({
    async mutationFn() {
      await privyLogout();
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_JWT);
      setCheckWalletResponse(DEFAULT_CHECK_WALLET_RESPONSE);
    },
  });

  return {
    user,
    role,
    flow,
    isCryptoNative: cryptoNative,
    isLoading,
    isLoadingLogout,
    isLoggedIn,
    isAuthenticated,
    showLoginModal: login,
    logout,
  };
};
