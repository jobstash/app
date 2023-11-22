/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ReactNode } from 'react';

import { StepType } from '@reactour/tour';

import ProfileOnboardCard from '../profile-onboard-card';
import ProfileTourWrapper from '../profile-tour-wrapper';

import BackButton from './back-button';
import NextButton from './next-button';

interface Props {
  children: ReactNode;
}

const ProfileReviewsTourWrapper = ({ children }: Props) => (
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
    selector: '#onboard-review-1',
    content: (
      <ProfileOnboardCard
        title="Organization Reviews"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    ),
    position: (positionProps: any) => [210, positionProps.windowHeight - 230],
  },
  {
    selector: '#profile-right-panel-salary',
    content: (
      <ProfileOnboardCard
        title="Salary"
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
    selector: '#profile-right-panel-ratings',
    content: (
      <ProfileOnboardCard
        title="Ratings"
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
  {
    selector: '#profile-right-panel-your-review',
    content: (
      <ProfileOnboardCard
        title="Your Review"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    ),
    position: (positionProps: any) => [
      positionProps.windowWidth - (61 * positionProps.windowWidth) / 100,
      (25 * positionProps.windowHeight) / 100,
    ],

    padding: { mask: [311, 108, 480, 108] },
  },
];

export default ProfileReviewsTourWrapper;
