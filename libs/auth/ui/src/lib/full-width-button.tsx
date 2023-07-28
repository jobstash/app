import { memo, type MouseEventHandler, type ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

interface Props {
  text: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler;
}

const FullWidthButton = ({ text, icon, onClick }: Props) => (
  <button
    type="button"
    className={cn(
      'flex items-center justify-center rounded-lg bg-darker-gray py-3 transition duration-150 gap-1 ease-in-out hover:bg-dark-gray active:bg-dark-gray',
    )}
    onClick={onClick}
  >
    {icon}
    <Text size="sm">{text}</Text>
  </button>
);

export default memo(FullWidthButton);
