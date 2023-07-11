import { memo } from 'react';

import { type RouteSection } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

interface Props {
  routeSection: RouteSection;
  count: number | null;
}

const FiltersItemsCount = ({ routeSection, count }: Props) => {
  if (!count || count === 0) return null;

  return (
    <div>
      {count && (
        <Text
          className="my-3 inline-block whitespace-nowrap"
          color="dimmed"
        >{`${capitalize(routeSection.slice(1))} Found: ${count}`}</Text>
      )}
    </div>
  );
};

export default memo(FiltersItemsCount);
