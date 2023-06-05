import { faker } from '@faker-js/faker';

import {
  FILTER_KIND,
  type MultiSelectSearchFilterConfig,
} from '@jobstash/filters/core';

import { fakeSelectOptions } from './fake-select-options';
import { fakeSharedFilterConfigProperties } from './fake-shared-filter-config-properties';

export const fakeMultiSelectFilterConfig = (
  options: Partial<MultiSelectSearchFilterConfig>,
): MultiSelectSearchFilterConfig => {
  const sharedFilterConfigProperties = fakeSharedFilterConfigProperties();
  const paramKey = faker.word.noun();
  const selection = fakeSelectOptions().map((s) => s.label);

  return {
    ...sharedFilterConfigProperties,
    kind: FILTER_KIND.MULTI_SELECT,
    paramKey,
    options: selection,
    ...options,
  };
};
