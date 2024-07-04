import { Text } from '@jobstash/shared/ui';

import { CellProps } from './types';

export const JobCell = ({ data }: CellProps) => {
  if (!data) return null;

  const {
    job: { title, classification },
  } = data;

  return (
    <div className="flex flex-col">
      <Text size="md" fw="bold">
        {title}
      </Text>
      <Text size="sm" color="dimmed">
        {classification}
      </Text>
    </div>
  );
};
