import { type ReactNode } from 'react';

import { ProviderProps, StepType, TourProvider } from '@reactour/tour';

interface Props {
  steps: StepType[];
  children: ReactNode;
  prevButton: ProviderProps['prevButton'];
  nextButton: ProviderProps['nextButton'];
}

const ProfileTourWrapper = (props: Props) => {
  const { steps, children, prevButton, nextButton } = props;

  return (
    <TourProvider
      steps={steps}
      showBadge={false}
      styles={{
        popover: (base) => ({
          ...base,
          background: 'rgb(52, 52, 52)',
          // Border: '1px solid rgb(135, 67, 255)',
          // borderWidth: '2px',
          borderRadius: '1.5rem',
          marginLeft: -50,
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
      showDots={false}
      onClickMask={() => null}
    >
      {/* <ProfileTourStarter startTour={isOnboarding} /> */}
      {children}
    </TourProvider>
  );
};

export default ProfileTourWrapper;
