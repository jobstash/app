import { faker } from '@faker-js/faker';

import {
  FILTER_KIND,
  type MultiSelectFilterConfig,
} from '@jobstash/filters/core';

import { fakeSelectOptions } from './fake-select-options';
import { fakeSharedFilterConfigProperties } from './fake-shared-filter-config-properties';

export const fakeMultiSelectFilterConfig = (
  options: Partial<MultiSelectFilterConfig>,
): MultiSelectFilterConfig => {
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
