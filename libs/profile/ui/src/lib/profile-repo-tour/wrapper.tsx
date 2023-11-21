/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

import { type StepType } from '@reactour/tour';

import ProfileOnboardCard from '../profile-onboard-card';
import ProfileTourWrapper from '../profile-tour-wrapper';

import BackButton from './back-button';
import NextButton from './next-button';

interface Props {
  children: ReactNode;
}

const ProfileRepoTourWrapper = ({ children }: Props) => (
  <ProfileTourWrapper
    steps={steps}
    prevButton={(props) => <BackButton {...props} />}
    nextButton={(props) => <NextButton {...props} />}
  >
    {children}
  </ProfileTourWrapper>
);

const steps: StepType[] = [
  {
    selector: '#onboard-repo-1',
    content: (
      <ProfileOnboardCard
        title="Your Repositories"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    ),
    position: (positionProps: any) => [210, positionProps.windowHeight - 230],
  },
  {
    selector: '#profile-right-panel-techs-used',
    content: (
      <ProfileOnboardCard
        title="Tags Used"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    ),

    position: (positionProps: any) => [
      positionProps.windowWidth - (61 * positionProps.windowWidth) / 100,
      (40 * positionProps.windowHeight) / 100,
    ],

    padding: { mask: [150, 40, 60, 40] },
  },
  {
    selector: '#profile-right-panel-your-contribution',
    content: (
      <ProfileOnboardCard
        title="Your Contribution"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    ),
    position: (positionProps: any) => [
      positionProps.windowWidth - (61 * positionProps.windowWidth) / 100,
      (49 * positionProps.windowHeight) / 100,
    ],

    padding: { mask: [150, 40, 60, 40] },
  },
];

export default ProfileRepoTourWrapper;
