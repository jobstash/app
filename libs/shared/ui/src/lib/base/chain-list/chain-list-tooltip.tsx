import { type ReactNode } from 'react';

import { Tooltip } from '@mantine/core';
import { type TooltipBaseProps } from '@mantine/core/lib/Tooltip/Tooltip.types';

type Props = {
  label: string;
  children: ReactNode;
} & TooltipBaseProps;

const ChainListTooltip = ({ label, children, ...props }: Props) => (
  <Tooltip
    label={label}
    color="dark"
    classNames={{ tooltip: 'bg-gray' }}
    position="top"
    {...props}
  >
    {children}
  </Tooltip>
);

export default ChainListTooltip;
