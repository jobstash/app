/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ReactNode } from 'react';

import { StepType, TourProvider } from '@reactour/tour';

import { useProfileReviewsPageContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

import ProfileTourStarter from '../profile-tour-starter';

import BackButton from './back-button';
import NextButton from './next-button';

interface Props {
  children: ReactNode;
}

const ProfileReviewsTourWrapper = ({ children }: Props) => {
  const { isOnboarding } = useProfileReviewsPageContext();

  return (
    <TourProvider
      scrollSmooth
      disableInteraction
      steps={steps}
      showBadge={false}
      styles={{
        popover: (base) => ({
          ...base,
          background: '#4b4b4b',
          borderRadius: 32,
        }),
      }}
      components={{
        Close: () => null,
      }}
      prevButton={(props) => <BackButton {...props} />}
      nextButton={(props) => <NextButton {...props} />}
      onClickMask={() => null}
    >
      <ProfileTourStarter startTour={isOnboarding} />
      {children}
    </TourProvider>
  );
};

const steps: StepType[] = [
  {
    selector: '#onboard-review-1',
    content: (
      <div className="flex flex-col gap-3">
        <Heading size="lg">Organization Reviews</Heading>
        <Text color="dimmed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>
    ),
    position: (positionProps: any) => [210, positionProps.windowHeight - 230],
  },
  {
    selector: '#profile-right-panel-salary',
    content: (
      <div className="flex flex-col gap-3">
        <Heading size="lg">Salary</Heading>
        <Text color="dimmed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>
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
      <div className="flex flex-col gap-3">
        <Heading size="lg">Ratings</Heading>
        <Text color="dimmed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>
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
      <div className="flex flex-col gap-3">
        <Heading size="lg">Your Review</Heading>
        <Text color="dimmed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>
    ),
    position: (positionProps: any) => [
      positionProps.windowWidth - (61 * positionProps.windowWidth) / 100,
      (25 * positionProps.windowHeight) / 100,
    ],

    padding: { mask: [311, 108, 480, 108] },
  },
];

export default ProfileReviewsTourWrapper;
