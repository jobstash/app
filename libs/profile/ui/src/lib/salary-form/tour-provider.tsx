import { ReactNode } from 'react';

import { StepType } from '@reactour/tour';

import { TOUR_SELECTOR_ID } from '@jobstash/profile/core';

import ProfileOnboardCard from '../profile-onboard-card';
import ProfileTourWrapper from '../profile-tour-wrapper';

import TourNextButton from './tour-next-button';

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
        title="Salary"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    ),

    //
    // position: (positionProps: any) => [
    //   positionProps.windowWidth - (61 * positionProps.windowWidth) / 100,
    //   (40 * positionProps.windowHeight) / 100,
    // ],
    // padding: { mask: [150, 40, 60, 40] },

    position: 'center',
  },
];
