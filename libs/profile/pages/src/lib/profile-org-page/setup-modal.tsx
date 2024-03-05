import { useEffect, useReducer, useState } from 'react';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';

export const SetupModal = () => {
  const { flow } = useAuthContext();
  const isProfileSetup = flow === CHECK_WALLET_FLOWS.ORG_PROFILE;

  const [isOpen, toggleOpen] = useReducer((prev) => !prev, false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && isProfileSetup) {
      toggleOpen();
      setInitialized(true);
    }
  }, [flow, initialized, isProfileSetup]);

  if (!isProfileSetup) return null;

  return <div>SetupModal</div>;
};
