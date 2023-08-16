import { type ReactNode } from 'react';

import { ProviderProps, StepType, TourProvider } from '@reactour/tour';

import ProfileTourStarter from './profile-tour-starter';

interface Props {
  steps: StepType[];
  children: ReactNode;
  isOnboarding: boolean;
  prevButton: ProviderProps['prevButton'];
  nextButton: ProviderProps['nextButton'];
}

const ProfileTourWrapper = (props: Props) => {
  const { steps, children, isOnboarding, prevButton, nextButton } = props;

  return (
    <TourProvider
      steps={steps}
      showBadge={false}
      styles={{
        popover: (base) => ({
          ...base,
          background: 'rgb(52, 52, 52)',
          border: '1px solid rgb(135, 67, 255)',
          borderWidth: '2px',
          borderRadius: '1.5rem',
        }),
        dot: (base, dotProps) => ({
          ...base,
          background: dotProps?.current ? 'rgb(135, 67, 255)' : undefined,
        }),
      }}
      components={{
        Close: () => null,
      }}
      prevButton={prevButton}
      nextButton={nextButton}
      onClickMask={() => null}
    >
      <ProfileTourStarter startTour={isOnboarding} />
      {children}
    </TourProvider>
  );
};

export default ProfileTourWrapper;
