import { useState } from 'react';

import { type CheckWalletFlow } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';

export const useOnboardFlow = (
  isOnboardSSR: boolean,
  flowType: CheckWalletFlow,
) => {
  const { flow } = useAuthContext();
  const isOnboardFlow = flow === flowType;
  const isOnboard = isOnboardSSR ?? isOnboardFlow;
  const [showGotItCard, setShowGotItCard] = useState(isOnboard);
  return { isOnboardFlow, showGotItCard, setShowGotItCard };
};
