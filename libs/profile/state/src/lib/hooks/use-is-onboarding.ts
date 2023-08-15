import { type CheckWalletFlow } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';

export const useIsOnboarding = (
  isOnboardSSR: boolean,
  requiredFlow: CheckWalletFlow,
) => {
  const { flow } = useAuthContext();
  const isOnBoardFlow = flow === requiredFlow;

  return isOnboardSSR || isOnBoardFlow;
};
