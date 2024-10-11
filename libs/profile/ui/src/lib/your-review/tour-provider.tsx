import { ReactNode } from 'react';

import { type StepType, useTour } from '@reactour/tour';

import { LS_KEYS, TOUR_SELECTOR_ID } from '@jobstash/profile/core';

import { Button } from '@jobstash/shared/ui';

import ProfileOnboardCard from '../profile-onboard-card';
import ProfileTourWrapper from '../profile-tour-wrapper';

interface Props {
  children: ReactNode;
}

const TourProvider = ({ children }: Props) => (
  <ProfileTourWrapper
    steps={steps}
    prevButton={() => null}
    nextButton={() => <TourNextButton />}
  >
    {children}
  </ProfileTourWrapper>
);

export default TourProvider;

const steps: StepType[] = [
  {
    selector: `#${TOUR_SELECTOR_ID}`,
    content: (
      <ProfileOnboardCard
        title="Your Review"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    ),

    //
    // position: (positionProps: any) => [
    //   positionProps.windowWidth - (61 * positionProps.windowWidth) / 100,
    //   (25 * positionProps.windowHeight) / 100,
    // ],
    // padding: { mask: [311, 108, 480, 108] },

    position: 'center',
  },
];

const TourNextButton = () => {
  const { setIsOpen } = useTour();

  const onClick = async () => {
    //
    // await mutateAsync(CHECK_WALLET_FLOWS.SIGNUP_COMPLETE);
    setIsOpen(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LS_KEYS.TOURS.YOUR_REVIEW, '1');
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
