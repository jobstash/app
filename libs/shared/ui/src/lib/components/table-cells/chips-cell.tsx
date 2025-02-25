import { Chip } from '@heroui/chip';
import { ScrollShadow } from '@heroui/scroll-shadow';

import { capitalize } from '@jobstash/shared/utils';

interface Props {
  values: string[];
}

export const ChipsCell = ({ values }: Props) => (
  <div className="flex flex-col gap-1 h-fit self-start">
    <ScrollShadow
      size={20}
      className="h-[200px] flex gap-2 w-full flex-wrap max-w-xs py-2"
    >
      {values.map((name, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Chip key={`${name}-${i}`} color="default" radius="sm">
          {capitalize(name)}
        </Chip>
      ))}
    </ScrollShadow>
  </div>
);
