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
  KEY_ORDER,
  KEY_ORDER_BY,
  KEY_ORGANIZATIONS,
  KEY_PROJECTS,
  KEY_PUBLICATION_DATE,
  KEY_SALARY,
  KEY_TEAM_SIZE,
  KEY_TECH,
  KEY_TOKEN,
  KEY_TVL,
} from '../constants';
import type { FilterConfig } from '../types';

import { BooleanFilterConfigSchema } from './boolean-filter-config-schema';
import { DateFilterConfigSchema } from './date-filter-config-schema';
import { MultiSelectFilterConfigSchema } from './multi-select-filter-config-schema';
import { MultiSelectSearchFilterConfigSchema } from './multi-select-search-filter-config-schema';
import { RangeFilterConfigSchema } from './range-filter-config-schema';
import { SingleSelectFilterConfigSchema } from './single-select-filter-config-schema';

export const FilterConfigSchema = Joi.object<FilterConfig>({
  [KEY_PUBLICATION_DATE]: DateFilterConfigSchema,
  [KEY_LEVEL]: SingleSelectFilterConfigSchema,
  [KEY_LOCATION]: MultiSelectFilterConfigSchema,
  [KEY_SALARY]: RangeFilterConfigSchema,
  [KEY_TEAM_SIZE]: RangeFilterConfigSchema,
  [KEY_EMPLOYEE_COUNT]: RangeFilterConfigSchema,
  [KEY_TVL]: RangeFilterConfigSchema,
  [KEY_MONTHLY_VOLUME]: RangeFilterConfigSchema,
  [KEY_MONTHLY_ACTIVE_USERS]: RangeFilterConfigSchema,
  [KEY_MONTHLY_REVENUE]: RangeFilterConfigSchema,
  [KEY_AUDITS]: RangeFilterConfigSchema,
  [KEY_HACKS]: RangeFilterConfigSchema,
  [KEY_TECH]: MultiSelectSearchFilterConfigSchema,
  [KEY_ORGANIZATIONS]: MultiSelectSearchFilterConfigSchema,
  [KEY_CHAINS]: MultiSelectSearchFilterConfigSchema,
  [KEY_PROJECTS]: MultiSelectSearchFilterConfigSchema,
  [KEY_CATEGORIES]: MultiSelectSearchFilterConfigSchema,
  [KEY_MAINNET]: BooleanFilterConfigSchema,
  [KEY_TOKEN]: BooleanFilterConfigSchema,
  [KEY_ORDER]: SingleSelectFilterConfigSchema,
  [KEY_ORDER_BY]: SingleSelectFilterConfigSchema,
});
