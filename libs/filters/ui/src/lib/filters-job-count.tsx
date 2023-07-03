import { memo } from 'react';

import { type FilterSection } from '@jobstash/filters/core';
import { capitalize } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

interface Props {
  filterSection: FilterSection;
  count: number | null;
}

const FiltersJobCount = ({ filterSection, count }: Props) => {
  if (!count) return null;

  return (
    <div>
      {count && (
        <Text
          className="my-3 inline-block whitespace-nowrap"
          color="dimmed"
        >{`${capitalize(filterSection)} Found: ${count}`}</Text>
      )}
    </div>
  );
};

export default memo(FiltersJobCount);
