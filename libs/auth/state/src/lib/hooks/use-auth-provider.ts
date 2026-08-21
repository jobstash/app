import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

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

const INITIAL_RETRY_DELAY = 1000; // 1 second
const MAX_RETRY_DELAY = 30_000; // 30 seconds
const MAX_RETRY_ATTEMPTS = 5;

export const useAuthProvider = () => {
  const router = useRouter();
  const retryTimeoutRef = useRef<NodeJS.Timeout>();

  const [checkWalletResponse, setCheckWalletResponse] =
    useState<CheckWalletResponse>(DEFAULT_CHECK_WALLET_RESPONSE);
  const { cryptoNative, permissions } = checkWalletResponse;
  const hasPermission = permissions.length > 0;

  const [apiError, setApiError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [lastRetryTime, setLastRetryTime] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const isApiUnavailable =
    retryCount >= MAX_RETRY_ATTEMPTS && Boolean(apiError);

  const {
    authenticated: isLoggedIn,
    user,
    getAccessToken,
    ready,
    createWallet,
  } = usePrivy();

  const hasEmbeddedWallet = useHasEmbeddedWallet();

  const { mwVersion } = useMwVersionContext();
  const queryClient = useQueryClient();
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const { logout: privyLogout } = useLogout({
    async onSuccess() {
      setCheckWalletResponse(DEFAULT_CHECK_WALLET_RESPONSE);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_JWT);
      // Reset error state on logout
      setApiError(null);
      setRetryCount(0);
      setIsRetrying(false);
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }

      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'profile-info'],
      });
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'affiliated-orgs'],
      });

      window.location.href = '/jobs';
    },
  });

  const logout = async () => {
    setIsLoadingLogout(true);
    await privyLogout();
  };

  const { mutate: setupLocal, isPending: isLoadingSetup } = useMutation({
    async mutationFn() {
      const accessToken = await getAccessToken();
      const response = await getCheckWallet(accessToken);

      if (Boolean(response.token) && response.permissions.length === 0) {
        await logout();
      }

      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_JWT, response.token);
      setCheckWalletResponse(response);
      return response;
    },
    onSuccess() {
      // Reset error state on success
      setApiError(null);
      setRetryCount(0);
      setLastRetryTime(0);
      setIsRetrying(false);
    },
    onError(error) {
      const errorMessage = (error as Error).message;
      setApiError(errorMessage);

      // Don't auto-retry if we've hit the max attempts
      if (retryCount >= MAX_RETRY_ATTEMPTS) {
        sentryMessage('setupLocal: Max retry attempts reached', errorMessage);
        return;
      }

      // Schedule retry with exponential backoff
      scheduleRetry();
    },
  });

  const scheduleRetry = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    const delay = Math.min(
      INITIAL_RETRY_DELAY * 2 ** retryCount,
      MAX_RETRY_DELAY,
    );

    setIsRetrying(true);
    setLastRetryTime(Date.now());

    retryTimeoutRef.current = setTimeout(() => {
      setRetryCount((prev) => prev + 1);
      setIsRetrying(false);
      setupLocal();
    }, delay);
  }, [retryCount, setupLocal]);

  const retryAuth = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    setRetryCount(0);
    setApiError(null);
    setIsRetrying(false);
    setupLocal();
  }, [setupLocal]);

  const [isCreatingWallet, setIsCreatingWallet] = useState(false);

  const createEmbeddedWallet = useCallback(async () => {
    setIsCreatingWallet(true);
    try {
      await createWallet();
      setupLocal();
    } catch (error) {
      sentryMessage('createEmbedWallet', (error as Error).message);
      // Remove window.location.reload() to prevent loop
      setApiError((error as Error).message);
    }

    setIsCreatingWallet(false);
  }, [createWallet, setupLocal]);

  // Create embedded wallet if user is logged in and doesn't have one
  // Only if not in error state
  useEffect(() => {
    if (
      !hasEmbeddedWallet &&
      !isCreatingWallet &&
      isLoggedIn &&
      ready &&
      !isApiUnavailable &&
      !isRetrying
    ) {
      createEmbeddedWallet();
    }
  }, [
    createEmbeddedWallet,
    hasEmbeddedWallet,
    isCreatingWallet,
    isLoggedIn,
    ready,
    isApiUnavailable,
    isRetrying,
  ]);

  const isLoading = isLoadingSetup || !ready || isCreatingWallet || isRetrying;

  // Setup local after privy login
  const { login } = useLogin({
    async onComplete(_user) {
      setupLocal();
      router.push('/profile');
    },
  });

  const isAuthenticated = isLoggedIn && hasPermission && hasEmbeddedWallet;

  // Setup local if logged in with wallet but no permissions
  // Only if not in error state and not recently retried
  useEffect(() => {
    const now = Date.now();
    const timeSinceLastRetry = now - lastRetryTime;
    const shouldWait = timeSinceLastRetry < INITIAL_RETRY_DELAY;

    if (
      isLoggedIn &&
      hasEmbeddedWallet &&
      !isLoading &&
      !hasPermission &&
      !isApiUnavailable &&
      !isRetrying &&
      !shouldWait
    ) {
      setupLocal();
    }
  }, [
    hasEmbeddedWallet,
    hasPermission,
    isLoading,
    isLoggedIn,
    setupLocal,
    isApiUnavailable,
    isRetrying,
    lastRetryTime,
  ]);

  // Cleanup timeout on unmount
  useEffect(
    () => () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    },
    [],
  );

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
    apiError,
    isApiUnavailable,
    retryAuth,
  };
};
