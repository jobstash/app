import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { useMutation } from '@tanstack/react-query';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROLES,
  CheckWalletResponse,
} from '@jobstash/auth/core';
import { LOCAL_STORAGE_KEYS } from '@jobstash/shared/core';
import { sentryMessage } from '@jobstash/shared/utils';

import { getCheckWallet } from '@jobstash/auth/data';

import { useAffiliatedOrgs } from './use-affiliated-orgs';

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

  const {
    authenticated: isLoggedIn,
    user,
    getAccessToken,
    ready,
    createWallet,
  } = usePrivy();

  const hasEmbeddedWallet = useMemo(() => {
    if (!user) return false;

    return user.linkedAccounts.some(
      (account) =>
        account.type === 'wallet' && account.walletClientType === 'privy',
    );
  }, [user]);

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
    } catch (error) {
      sentryMessage('createEmbedWallet', (error as Error).message);
      window?.location.reload();
    }

    setIsCreatingWallet(false);
  }, [createWallet]);

  // Create embedded wallet if user is logged in and doesn't have one
  useEffect(() => {
    if (!hasEmbeddedWallet && !isCreatingWallet && isLoggedIn) {
      createEmbeddedWallet();
    }
  }, [createEmbeddedWallet, hasEmbeddedWallet, isCreatingWallet, isLoggedIn]);

  // Setup local after privy login
  const { login } = useLogin({
    onComplete(_user) {
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

  const { data: userOrgs, isLoading: isLoadingUserOrgFetch } =
    useAffiliatedOrgs();
  const isLoadingUserOrg = isAuthenticated && isLoadingUserOrgFetch;

  const { logout: privyLogout } = useLogout({
    async onSuccess() {
      setCheckWalletResponse(DEFAULT_CHECK_WALLET_RESPONSE);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_JWT);
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
    role,
    flow,
    isCryptoNative: cryptoNative,
    isLoading: isLoadingSetup || !ready || isLoadingUserOrg || isCreatingWallet,
    isLoadingLogout,
    isLoggedIn,
    isAuthenticated,
    showLoginModal: login,
    logout,
    orgs: userOrgs ?? [],
  };
};
