import { useTour } from '@reactour/tour';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { LS_KEYS } from '@jobstash/profile/core';

import { useUpdateFlow } from '@jobstash/auth/state';

import { Button } from '@jobstash/shared/ui';

const TourNextButton = () => {
  const { isLoading, mutateAsync } = useUpdateFlow();
  const { setIsOpen } = useTour();

  const onClick = async () => {
    await mutateAsync(CHECK_WALLET_FLOWS.ONBOARD_REVIEWS);
    setIsOpen(false);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LS_KEYS.TOURS.TECHS_USED, '1');
    }
  };

  return (
    <div className="w-full flex justify-end">
      <Button
        variant="primary"
        className="py-1.5"
        isDisabled={isLoading}
        onClick={onClick}
      >
        Got It
      </Button>
    </div>
  );
};

export default TourNextButton;
