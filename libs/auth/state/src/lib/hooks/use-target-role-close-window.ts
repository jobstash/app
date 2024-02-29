import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { CheckWalletRole } from '@jobstash/auth/core';

import { useAuthContext } from './use-auth-context';

export const useTargetRoleCloseWindow = (
  targetRole: CheckWalletRole,
  isEnabled: boolean,
) => {
  const { role } = useAuthContext();
  const queryClient = useQueryClient();

  // Poll data every 2s
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isEnabled) {
      interval = setInterval(() => {
        if (role === targetRole) {
          window.close();
        } else {
          queryClient.invalidateQueries({ queryKey: ['check-wallet'] });
        }
      }, 2000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isEnabled, queryClient, role, targetRole]);
};
