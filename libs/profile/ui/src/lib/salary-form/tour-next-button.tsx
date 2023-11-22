import { useTour } from '@reactour/tour';

import { LS_KEYS } from '@jobstash/profile/core';

import { Button } from '@jobstash/shared/ui';

const TourNextButton = () => {
  const { setIsOpen } = useTour();

  const onClick = () => {
    setIsOpen(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LS_KEYS.TOURS.SALARY, '1');
    }
  };

  return (
    <div className="w-full flex justify-end">
      <Button variant="primary" className="py-1.5" onClick={onClick}>
        Got It
      </Button>
    </div>
  );
};

export default TourNextButton;
