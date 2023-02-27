import Joi from 'joi';

import {
  KEY_AUDITS,
  KEY_CATEGORIES,
  KEY_CHAINS,
  KEY_HACKS,
  KEY_HEAD_COUNT,
  KEY_LOCATIONS,
  KEY_MAINNET,
  KEY_MONTHLY_FEES,
  KEY_MONTHLY_REVENUE,
  KEY_MONTHLY_VOLUME,
  KEY_ORDER,
  KEY_ORDER_BY,
  KEY_ORGANIZATIONS,
  KEY_PROJECTS,
  KEY_PUBLICATION_DATE,
  KEY_SALARY,
  KEY_SENIORITY,
  KEY_TEAM_SIZE,
  KEY_TECH,
  KEY_TOKEN,
  KEY_TVL,
} from '../constants';
import type { FilterConfig } from '../interfaces';

import { MultiSelectSearchFilterConfigSchema } from './multi-select-search-filter-config-schema';
import { RangeFilterConfigSchema } from './range-filter-config-schema';
import { SingleSelectFilterConfigSchema } from './single-select-filter-config-schema';

export const FilterConfigSchema = Joi.object<FilterConfig>({
  [KEY_PUBLICATION_DATE]: SingleSelectFilterConfigSchema,
  [KEY_SENIORITY]: SingleSelectFilterConfigSchema,
  [KEY_LOCATIONS]: MultiSelectSearchFilterConfigSchema,
  [KEY_SALARY]: RangeFilterConfigSchema,
  [KEY_TEAM_SIZE]: RangeFilterConfigSchema,
  [KEY_HEAD_COUNT]: RangeFilterConfigSchema,
  [KEY_TVL]: RangeFilterConfigSchema,
  [KEY_MONTHLY_VOLUME]: RangeFilterConfigSchema,
  [KEY_MONTHLY_FEES]: RangeFilterConfigSchema,
  [KEY_MONTHLY_REVENUE]: RangeFilterConfigSchema,
  [KEY_AUDITS]: RangeFilterConfigSchema,
  [KEY_HACKS]: RangeFilterConfigSchema,
  [KEY_TECH]: MultiSelectSearchFilterConfigSchema,
  [KEY_ORGANIZATIONS]: MultiSelectSearchFilterConfigSchema,
  [KEY_CHAINS]: MultiSelectSearchFilterConfigSchema,
  [KEY_PROJECTS]: MultiSelectSearchFilterConfigSchema,
  [KEY_CATEGORIES]: MultiSelectSearchFilterConfigSchema,
  [KEY_MAINNET]: SingleSelectFilterConfigSchema,
  [KEY_TOKEN]: SingleSelectFilterConfigSchema,
  [KEY_ORDER]: SingleSelectFilterConfigSchema,
  [KEY_ORDER_BY]: SingleSelectFilterConfigSchema,
});
