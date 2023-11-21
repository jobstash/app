import { useLocalStorage } from '@mantine/hooks';
import { useTour } from '@reactour/tour';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { LS_KEYS } from '@jobstash/profile/core';

import { useUpdateFlow } from '@jobstash/auth/state';

import { Button } from '@jobstash/shared/ui';

const TechsUsedTourNextButton = () => {
  const { isLoading, mutateAsync } = useUpdateFlow();
  const { setIsOpen } = useTour();

  const [_, setLocalStorageValue] = useLocalStorage<boolean>({
    key: LS_KEYS.TOURS.TECHS_USED,
  });

  const onClick = async () => {
    await mutateAsync(CHECK_WALLET_FLOWS.ONBOARD_REVIEWS);
    setIsOpen(false);
    setLocalStorageValue(true);
  };

  return (
    <Button
      variant="primary"
      className="py-1.5"
      isDisabled={isLoading}
      onClick={onClick}
    >
      Got It
    </Button>
  );
};

export default TechsUsedTourNextButton;
