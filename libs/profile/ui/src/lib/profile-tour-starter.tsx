import { memo, useEffect } from 'react';

import { useTour } from '@reactour/tour';

interface Props {
  startTour: boolean;
}

const ProfileTourStarter = ({ startTour }: Props) => {
  const { setIsOpen } = useTour();

  useEffect(() => {
    if (startTour) {
      setIsOpen(true);
    }
  }, [setIsOpen, startTour]);

  return null;
};

export default memo(ProfileTourStarter);
