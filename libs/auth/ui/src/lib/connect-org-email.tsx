import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import {
  isPendingPickRoleAtom,
  useConnectOrgEmail,
  useTargetRoleCloseWindow,
} from '@jobstash/auth/state';

import ConnectEmailSection from './connect-email-section';

const ConnectOrgEmail = () => {
  const { isSuccess, isLoading, isError, onSubmit } = useConnectOrgEmail();
  const setIsPendingPickRole = useSetAtom(isPendingPickRoleAtom);

  // Once email is sent, set pending pick-role
  useEffect(() => {
    if (isSuccess) {
      setIsPendingPickRole(true);
    }
  }, [isSuccess, setIsPendingPickRole]);

  // Close this stale window if updated role
  useTargetRoleCloseWindow(CHECK_WALLET_ROLES.ORG, isSuccess);

  return (
    <ConnectEmailSection
      isSuccess={isSuccess}
      isLoading={isLoading}
      isError={isError}
      onSubmit={onSubmit}
    />
  );
};

export default ConnectOrgEmail;
