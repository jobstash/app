import { type ReactNode } from 'react';

import { Tooltip } from '@mantine/core';

interface Props {
  children: ReactNode;
  label: string;
}

const TableActionsTooltip = ({ children, label }: Props) => (
  <Tooltip
    position="top"
    label={label}
    color="dark"
    classNames={{ tooltip: 'bg-gray' }}
    offset={10}
  >
    {children}
  </Tooltip>
);

export default TableActionsTooltip;
