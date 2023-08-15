/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

import { type StepType, TourProvider } from '@reactour/tour';

import { useProfileRepoPageContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

import ProfileTourStarter from '../profile-tour-starter';

import BackButton from './back-button';
import NextButton from './next-button';

interface Props {
  children: ReactNode;
}

const ProfileRepoTourWrapper = ({ children }: Props) => {
  const { isOnboarding } = useProfileRepoPageContext();

  return (
    <TourProvider
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
    selector: '#onboard-repo-1',
    content: (
      <div className="flex flex-col gap-3">
        <Heading size="lg">Your Repositories</Heading>
        <Text color="dimmed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>
    ),
    position: (positionProps: any) => [210, positionProps.windowHeight - 230],
  },
  {
    selector: '#profile-right-panel-techs-used',
    content: (
      <div className="flex flex-col gap-3">
        <Heading size="lg">Technologies Used</Heading>
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
    selector: '#profile-right-panel-your-contribution',
    content: (
      <div className="flex flex-col gap-3">
        <Heading size="lg">Your Contribution</Heading>
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
];

export default ProfileRepoTourWrapper;
