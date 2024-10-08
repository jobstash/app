import { Dispatch, SetStateAction } from 'react';

import { PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';

import { useProfileRepoPageContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const BackButton = (props: Props) => {
  const { currentStep, setCurrentStep } = props;

  const isFirstStep = currentStep === 0;

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const { setActiveTab } = useProfileRepoPageContext();

  const onClick = () => {
    if (isFirstStep) {
      return;
    }

    if (currentStep === 2) {
      setActiveTab(PROFILE_RIGHT_PANEL_TAB.SKILLS_USED);
    }

    previousStep();
  };

  return (
    <Button
      variant="translucent"
      isDisabled={isFirstStep}
      className="py-1.5 bg-gray"
      onClick={onClick}
    >
      Back
    </Button>
  );
};

export default BackButton;
