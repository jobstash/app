import { Dispatch, SetStateAction } from 'react';

import { StepType } from '@reactour/tour';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';

import { useUpdateFlow } from '@jobstash/auth/state';
import { useProfileRepoPageContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  steps?: StepType[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  setIsOpen: Dispatch<SetStateAction<Boolean>>;
}

const NextButton = (props: Props) => {
  const { currentStep, setCurrentStep, steps, setIsOpen } = props;

  const isLastStep = steps ? currentStep === steps.length - 1 : true;

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const { setActiveTab } = useProfileRepoPageContext();

  const { isLoading, mutateAsync } = useUpdateFlow();

  const buttonText = isLastStep ? 'OK Got it!' : 'Next';

  const onClick = () => {
    if (isLastStep) {
      const updateFlow = async () => {
        await mutateAsync(CHECK_WALLET_FLOWS.ONBOARD_REVIEWS);
      };

      updateFlow().then(() => setIsOpen(false));
    }

    if (currentStep === 1) {
      setActiveTab(PROFILE_RIGHT_PANEL_TAB.YOUR_CONTRIBUTION);
    }

    if (!isLastStep) {
      nextStep();
    }
  };

  return (
    <Button
      variant="primary"
      className="py-1.5"
      isDisabled={isLoading}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default NextButton;
