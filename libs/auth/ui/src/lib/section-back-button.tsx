import { Tooltip } from '@mantine/core';

import { Button } from '@jobstash/shared/ui';

interface Props {
  isSuccess: boolean;
  tooltipText: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

const SectionBackButton = ({
  isSuccess,
  onClick,
  isDisabled,
  tooltipText,
}: Props) => {
  if (isSuccess) {
    return (
      <div className="flex w-full justify-start">
        <Tooltip
          label={tooltipText}
          color="dark"
          bg="rgb(52,52,52)"
          offset={10}
          position="top-start"
        >
          <BackButton isDisabled />
        </Tooltip>
      </div>
    );
  }

  return <BackButton isDisabled={isDisabled} onClick={onClick} />;
};

export default SectionBackButton;

type BackButtonProps = Omit<Props, 'tooltipText' | 'isSuccess'>;

const BackButton = ({ onClick, isDisabled }: BackButtonProps) => (
  <Button
    size="sm"
    variant="outline"
    left={<CaretLeft />}
    isDisabled={isDisabled}
    onClick={onClick}
  >
    Back
  </Button>
);

const CaretLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);
