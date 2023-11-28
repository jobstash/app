import { type ReactNode } from 'react';

import { Button } from '@jobstash/shared/ui';

import TableActionsTooltip from './tool-tip';

interface Props {
  label: string;
  isDisabled: boolean;
  icon: ReactNode;
  onClick?: () => void;
}

const TableActionsButton = ({ label, isDisabled, icon, onClick }: Props) => (
  <TableActionsTooltip label={label}>
    <Button isIcon isDisabled={isDisabled} onClick={onClick}>
      {icon}
    </Button>
  </TableActionsTooltip>
);

export default TableActionsButton;
