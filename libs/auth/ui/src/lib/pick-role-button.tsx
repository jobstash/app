import { memo, type MouseEventHandler, type ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

interface Props {
  text: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  onClick?: MouseEventHandler;
}

const PickRoleButton = ({ text, icon, isDisabled, onClick }: Props) => (
  <button
    type="button"
    className={cn(
      'flex items-center justify-center rounded-lg bg-darker-gray py-3 transition duration-150 gap-1 ease-in-out hover:bg-dark-gray active:bg-dark-gray',
      { 'opacity-30 select-none pointer-events-none': isDisabled },
    )}
    disabled={isDisabled}
    onClick={onClick}
  >
    {icon}
    <Text size="sm" fw="semibold">
      {text}
    </Text>
  </button>
);

export default memo(PickRoleButton);
