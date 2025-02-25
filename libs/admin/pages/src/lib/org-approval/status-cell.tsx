import { Chip } from '@heroui/chip';

import { capitalize } from '@jobstash/shared/utils';

type Status = 'approved' | 'pending' | 'rejected';

interface Props {
  status: Status;
}

const statusColorMap = {
  approved: 'success',
  pending: 'warning',
  rejected: 'danger',
} as const;

export const StatusCell = ({ status }: Props) => (
  <Chip radius="sm" variant="faded" color={statusColorMap[status]}>
    {capitalize(status)}
  </Chip>
);
