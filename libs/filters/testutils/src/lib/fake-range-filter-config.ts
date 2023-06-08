import { faker } from '@faker-js/faker';

import { FILTER_KIND, type RangeFilterConfig } from '@jobstash/filters/core';
import { capitalize } from '@jobstash/shared/utils';

import { fakeSharedFilterConfigProperties } from './fake-shared-filter-config-properties';

export const fakeRangeFilter = (
  options: Partial<RangeFilterConfig>,
): RangeFilterConfig => {
  const sharedFilterConfigProperties = fakeSharedFilterConfigProperties();
  const paramKeySuffix = faker.word.noun();
  const minValue = faker.number.int({ min: 0 });
  const maxValue = faker.number.int({ min: Number(minValue * 1.2) });

  return {
    ...sharedFilterConfigProperties,
    kind: FILTER_KIND.RANGE,
    value: {
      lowest: {
        paramKey: `min${capitalize(paramKeySuffix)}`,
        value: minValue,
      },
      highest: {
        paramKey: `max${capitalize(paramKeySuffix)}`,
        value: maxValue,
      },
    },
    ...options,
  };
};
