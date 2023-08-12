import { memo, useEffect } from 'react';

import { useTour } from '@reactour/tour';

import { CheckWalletFlow } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';

interface Props {
  startTour: boolean;
  assignedFlow: CheckWalletFlow;
}

const ProfileTourStarter = ({ startTour, assignedFlow }: Props) => {
  const { setIsOpen } = useTour();

  const { flow } = useAuthContext();
  const startTourByFlow = flow === assignedFlow;

  useEffect(() => {
    if (startTour || startTourByFlow) {
      setIsOpen(true);
    }
  }, [setIsOpen, startTour, startTourByFlow]);

  return null;
};

export default memo(ProfileTourStarter);
