import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import {
  isPendingPickRoleAtom,
  useConnectDevEmail,
  useTargetRoleCloseWindow,
} from '@jobstash/auth/state';

import ConnectEmailSection from './connect-email-section';

const ConnectDevEmail = () => {
  const { isSuccess, isLoading, isError, onSubmit } = useConnectDevEmail();
  const setIsPendingPickRole = useSetAtom(isPendingPickRoleAtom);

  // Once email is sent, set pending pick-role
  useEffect(() => {
    if (isSuccess) {
      setIsPendingPickRole(true);
    }
  }, [isSuccess, setIsPendingPickRole]);

  // Close this stale window if updated role
  useTargetRoleCloseWindow(CHECK_WALLET_ROLES.DEV, isSuccess);

  return (
    <ConnectEmailSection
      isSuccess={isSuccess}
      isLoading={isLoading}
      isError={isError}
      onSubmit={onSubmit}
    />
  );
};

export default ConnectDevEmail;
