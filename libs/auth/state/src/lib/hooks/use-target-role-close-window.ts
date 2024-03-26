import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { CheckWalletRole } from '@jobstash/auth/core';
import { getLSMwVersion } from '@jobstash/shared/utils';

import { pickRoleSectionAtom } from '../atoms/pick-role-section-atom';

import { useAuthContext } from './use-auth-context';

export const useTargetRoleCloseWindow = (
  targetRole: CheckWalletRole,
  isEnabled: boolean,
) => {
  const { role } = useAuthContext();
  const queryClient = useQueryClient();
  const setSection = useSetAtom(pickRoleSectionAtom);

  const mwVersion = getLSMwVersion();

  // Poll data every 1s
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isEnabled) {
      interval = setInterval(() => {
        if (role === targetRole) {
          setSection('email-done');
        } else {
          queryClient.invalidateQueries({
            queryKey: [mwVersion, 'check-wallet'],
          });
        }
      }, 1500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isEnabled, mwVersion, queryClient, role, setSection, targetRole]);
};
