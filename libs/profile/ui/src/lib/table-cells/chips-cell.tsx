import { Chip } from '@nextui-org/react';

import { capitalize } from '@jobstash/shared/utils';

interface Props {
  values: string[];
}

export const ChipsCell = ({ values }: Props) => (
  <div className="flex flex-col gap-1 h-fit self-start">
    <div className="flex gap-2 w-full flex-wrap max-w-xs py-2">
      {values.map((name, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Chip key={`${name}-${i}`} color="default" radius="sm">
          {capitalize(name)}
        </Chip>
      ))}
    </div>
  </div>
);
