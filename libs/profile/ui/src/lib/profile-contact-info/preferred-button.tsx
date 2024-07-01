import { useState } from 'react';

import { Button, Spinner, Tooltip } from '@nextui-org/react';

import { cn } from '@jobstash/shared/utils';

const PreferredIcon = () => (
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
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
    />
  </svg>
);

const PreferredIconFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-green-500"
  >
    <path
      fillRule="evenodd"
      d="M19.5 9.75a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l4.72-4.72a.75.75 0 1 1 1.06 1.06L16.06 9h2.69a.75.75 0 0 1 .75.75Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
      clipRule="evenodd"
    />
  </svg>
);

interface Props {
  isDisabled: boolean;
  isLoading: boolean;
  isPreferred: boolean;
  onClick: () => void;
}

export const PreferredButton = (props: Props) => {
  const { isDisabled, isLoading, isPreferred, onClick } = props;
  const [hovering, setHovering] = useState(false);

  const tooltipContent = `${isPreferred ? 'Currently' : 'Mark as'} preferred`;

  const onMouseEnter = () => setHovering(true);
  const onMouseLeave = () => setHovering(false);

  return (
    <Tooltip content={tooltipContent}>
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        className={cn({ 'opacity-60': !hovering })}
        isDisabled={isPreferred || isDisabled}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {isLoading ? (
          <Spinner size="sm" color="white" />
        ) : isPreferred ? (
          <PreferredIconFilled />
        ) : (
          <PreferredIcon />
        )}
      </Button>
    </Tooltip>
  );
};
