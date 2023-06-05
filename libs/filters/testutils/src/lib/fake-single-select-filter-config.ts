import { faker } from '@faker-js/faker';

import {
  FILTER_KIND,
  type SingleSelectFilterConfig,
} from '@jobstash/filters/core';

import { fakeSelectOptions } from './fake-select-options';
import { fakeSharedFilterConfigProperties } from './fake-shared-filter-config-properties';

export const fakeSingleSelectFilterConfig = (
  options?: Partial<SingleSelectFilterConfig>,
): SingleSelectFilterConfig => {
  const sharedFilterConfigProperties = fakeSharedFilterConfigProperties();
  const paramKey = faker.word.noun();

  const singleSelectOptions = fakeSelectOptions();

  return {
    ...sharedFilterConfigProperties,
    kind: FILTER_KIND.SINGLE_SELECT,
    paramKey,
    options: singleSelectOptions,
    ...options,
  };
};
