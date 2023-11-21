import { type ReactNode } from 'react';

import { type StepType } from '@reactour/tour';

import ProfileOnboardCard from '../profile-onboard-card';
import ProfileTourWrapper from '../profile-tour-wrapper';

import TechsUsedTourNextButton from './techs-used-tour-next-button';
import TechsUsedTourStarter from './techs-used-tour-starter';

interface Props {
  children: ReactNode;
}

const TechsUsedTourProvider = ({ children }: Props) => (
  <ProfileTourWrapper
    steps={TECHS_USED_STEPS}
    prevButton={() => null}
    nextButton={() => (
      <div className="w-full flex justify-end">
        <TechsUsedTourNextButton />
      </div>
    )}
  >
    <TechsUsedTourStarter />
    {children}
  </ProfileTourWrapper>
);

export default TechsUsedTourProvider;

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

    // Position: (positionProps: any) => [
    //   positionProps.windowWidth - (61 * positionProps.windowWidth) / 100,
    //   (40 * positionProps.windowHeight) / 100,
    // ],
    position: 'center',

    padding: { mask: [150, 40, 60, 40] },
  },
];
