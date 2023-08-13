import { type Dispatch, type SetStateAction } from 'react';

import { type StepType } from '@reactour/tour';

import { PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';

import { useProfileReviewsPageContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  steps?: StepType[];
}

const NextButton = (props: Props) => {
  const { currentStep, setCurrentStep, steps } = props;

  const isLastStep = steps ? currentStep === steps.length - 1 : true;

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const { setActiveTab } = useProfileReviewsPageContext();

  const onClick = () => {
    if (isLastStep) {
      return;
    }

    if (currentStep === 1) {
      setActiveTab(PROFILE_RIGHT_PANEL_TAB.RATING);
    }

    if (currentStep === 2) {
      setActiveTab(PROFILE_RIGHT_PANEL_TAB.YOUR_REVIEW);
    }

    nextStep();
  };

  return (
    <Button
      variant="translucent"
      isDisabled={isLastStep}
      className="py-1.5 bg-gray"
      onClick={onClick}
    >
      Next
    </Button>
  );
};

export default NextButton;
