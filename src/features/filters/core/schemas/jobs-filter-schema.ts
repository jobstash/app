import Joi from 'joi';

import {
  KEY_AUDITS,
  KEY_CATEGORIES,
  KEY_CHAINS,
  KEY_EMPLOYEE_COUNT,
  KEY_HACKS,
  KEY_LEVEL,
  KEY_LOCATION,
  KEY_MAINNET,
  KEY_MONTHLY_ACTIVE_USERS,
  KEY_MONTHLY_REVENUE,
  KEY_MONTHLY_VOLUME,
  KEY_ORGANIZATIONS,
  KEY_PROJECTS,
  KEY_PUBLICATION_DATE,
  KEY_SALARY,
  KEY_TEAM_SIZE,
  KEY_TECH,
  KEY_TOKEN,
  KEY_TVL,
} from '../constants';
import type { JobsFilterConfig } from '../types';

import { BooleanFilterSchema } from './boolean-filter-schema';
import { DateFilterSchema } from './date-filter-schema';
import { MultiSelectFilterSchema } from './multi-select-filter-schema';
import { MultiSelectSearchFilterSchema } from './multi-select-search-filter-schema';
import { RangeFilterSchema } from './range-filter-schema';
import { SingleSelectFilterSchema } from './single-select-filter-schema';

export const JobsFilterConfigSchema = Joi.object<JobsFilterConfig>({
  [KEY_PUBLICATION_DATE]: DateFilterSchema,
  [KEY_LEVEL]: SingleSelectFilterSchema,
  [KEY_LOCATION]: MultiSelectFilterSchema,
  [KEY_SALARY]: RangeFilterSchema,
  [KEY_TEAM_SIZE]: RangeFilterSchema,
  [KEY_EMPLOYEE_COUNT]: RangeFilterSchema,
  [KEY_TVL]: RangeFilterSchema,
  [KEY_MONTHLY_VOLUME]: RangeFilterSchema,
  [KEY_MONTHLY_ACTIVE_USERS]: RangeFilterSchema,
  [KEY_MONTHLY_REVENUE]: RangeFilterSchema,
  [KEY_AUDITS]: RangeFilterSchema,
  [KEY_HACKS]: RangeFilterSchema,
  [KEY_TECH]: MultiSelectSearchFilterSchema,
  [KEY_ORGANIZATIONS]: MultiSelectSearchFilterSchema,
  [KEY_CHAINS]: MultiSelectSearchFilterSchema,
  [KEY_PROJECTS]: MultiSelectSearchFilterSchema,
  [KEY_CATEGORIES]: MultiSelectSearchFilterSchema,
  [KEY_MAINNET]: BooleanFilterSchema,
  [KEY_TOKEN]: BooleanFilterSchema,
});
