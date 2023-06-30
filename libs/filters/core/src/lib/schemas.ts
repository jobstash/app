import myzod from 'myzod';

import { FILTER_KIND } from './constants';

export const filterConfigSharedPropertiesSchema = myzod.object({
  position: myzod.number(),
  label: myzod.string().min(1),
  show: myzod.boolean(),
  googleAnalyticsEventName: myzod.string().min(1).nullable(),
  googleAnalyticsEventId: myzod.string().min(1).nullable(),
});

const rangeFilterConfigValueSchema = myzod.object({
  value: myzod.number().min(0),
  paramKey: myzod.string().min(1),
});

export const rangeFilterConfigSchema = myzod
  .intersection(
    filterConfigSharedPropertiesSchema,
    myzod.object({
      kind: myzod.literal(FILTER_KIND.RANGE),
      value: myzod.object({
        lowest: rangeFilterConfigValueSchema,
        highest: rangeFilterConfigValueSchema,
      }),
      prefix: myzod.string().min(1).nullable(),
    }),
  )
  .allowUnknownKeys(true);

export const selectOptionsSchema = myzod.array(
  myzod.object({
    label: myzod.string().min(1),
    value: myzod.union([myzod.string().min(1), myzod.boolean()]),
  }),
);

export const singleSelectFilterConfigSchema = myzod.intersection(
  filterConfigSharedPropertiesSchema,
  myzod.object({
    kind: myzod.literal(FILTER_KIND.SINGLE_SELECT),
    paramKey: myzod.string().min(1),
    options: selectOptionsSchema,
  }),
);

export const multiSelectFilterConfigSchema = myzod.intersection(
  filterConfigSharedPropertiesSchema,
  myzod.object({
    kind: myzod.union([
      myzod.literal(FILTER_KIND.MULTI_SELECT),
      myzod.literal(FILTER_KIND.MULTI_SELECT_WITH_SEARCH),
    ]),
    paramKey: myzod.string().min(1),
    options: myzod.array(myzod.string()),
  }),
);

export const filterConfigSchema = myzod.record(
  myzod.union([
    rangeFilterConfigSchema,
    singleSelectFilterConfigSchema,
    multiSelectFilterConfigSchema,
  ]),
);
