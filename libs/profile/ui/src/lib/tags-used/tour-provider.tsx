import { ReactNode } from 'react';

import { StepType } from '@reactour/tour';

import ProfileOnboardCard from '../profile-onboard-card';
import ProfileTourWrapper from '../profile-tour-wrapper';

import TourNextButton from './tour-next-button';

interface Props {
  children: ReactNode;
}

const TourProvider = ({ children }: Props) => (
  <ProfileTourWrapper
    steps={TECHS_USED_STEPS}
    prevButton={() => null}
    nextButton={() => <TourNextButton />}
  >
    {children}
  </ProfileTourWrapper>
);

export default TourProvider;

const TECHS_USED_STEPS: StepType[] = [
  {
    selector: '#profile-right-panel-techs-used',
    content: (
      <ProfileOnboardCard
        title="Tags Used"
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
