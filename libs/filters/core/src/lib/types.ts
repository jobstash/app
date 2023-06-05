import { type Infer } from 'myzod';
import { type ParsedUrlQuery } from 'node:querystring';

import {
  filterConfigSchema,
  filterConfigSharedPropertiesSchema,
  multiSelectFilterConfigSchema,
  rangeFilterConfigSchema,
  selectOptionsSchema,
  singleSelectFilterConfigSchema,
} from './schemas';

//
// export interface FilterConfigSharedProperties {
//   position: number;
//   label: string;
//   show: boolean;
//   googleAnalyticsEventName?: string;
//   googleAnalyticsEventId?: string;
// }
export type FilterConfigSharedProperties = Infer<
  typeof filterConfigSharedPropertiesSchema
>;

//
// export interface RangeFilterConfig extends FilterConfigSharedProperties {
//   kind: typeof FILTER_KIND.RANGE;
//   value: {
//     lowest: {
//       paramKey: string;
//       value: number;
//     };
//     highest: {
//       paramKey: string;
//       value: number;
//     };
//   };
// }
export type RangeFilterConfig = Infer<typeof rangeFilterConfigSchema>;

//
// export interface SingleSelectFilterConfig extends FilterConfigSharedProperties {
//   kind: typeof FILTER_KIND.SINGLE_SELECT;
//   paramKey: string;
//   options: { label: string; value: string }[];
// }
export type SingleSelectFilterConfig = Infer<
  typeof singleSelectFilterConfigSchema
>;

//
// export interface MultiSelectFilterConfig extends FilterConfigSharedProperties {
//   kind:
//     | typeof FILTER_KIND.MULTI_SELECT
//     | typeof FILTER_KIND.MULTI_SELECT_WITH_SEARCH;
//   paramKey: string;
//   options: string[];
// }
export type MultiSelectFilterConfig = Infer<
  typeof multiSelectFilterConfigSchema
>;

export type SelectOptions = Infer<typeof selectOptionsSchema>;

//
// export interface FilterConfig {
//   publicationDate: SingleSelectFilterConfig;
//   salary: RangeFilterConfig;
//   seniority: MultiSelectFilterConfig;
//   locations: MultiSelectFilterConfig;
//   teamSize: RangeFilterConfig;
//   headCount: RangeFilterConfig;
//   tech: MultiSelectFilterConfig;
//   organizations: MultiSelectFilterConfig;
//   chains: MultiSelectFilterConfig;
//   projects: MultiSelectFilterConfig;
//   categories: MultiSelectFilterConfig;
//   tvl: RangeFilterConfig;
//   monthlyVolume: RangeFilterConfig;
//   monthlyFees: RangeFilterConfig;
//   monthlyRevenue: RangeFilterConfig;
//   audits: RangeFilterConfig;
//   hacks: SingleSelectFilterConfig;
//   fundingRounds: MultiSelectFilterConfig;
//   mainNet: SingleSelectFilterConfig;
//   token: SingleSelectFilterConfig;
//   order: SingleSelectFilterConfig;
//   orderBy: SingleSelectFilterConfig;
// }
export type FilterConfig = Infer<typeof filterConfigSchema>;

export type FilterValues = Record<string, string | null>;
export type FilterValue = FilterValues[string];

export interface FilterState {
  showFilters: boolean;
  filterConfig: FilterConfig | null;
  filterValues: FilterValues;
}
type Action<T, P> = {
  type: T;
  payload: P;
};

export type UpdateDataAction = Action<
  'UPDATE_DATA',
  { data: FilterConfig; routerQuery: ParsedUrlQuery }
>;

export type SetSelectFilterValueAction = Action<
  'SET_SELECT_FILTER_VALUE',
  {
    paramKey: string;
    selectedLabel: string;
    options: SelectOptions;
  }
>;

export type SetMultiSelectFilterValueAction = Action<
  'SET_MULTISELECT_FILTER_VALUE',
  { paramKey: string; selectedLabels: string[] }
>;

export type SetRangeFilterValueAction = Action<
  'SET_RANGE_FILTER_VALUE',
  {
    min: FilterValue;
    max: FilterValue;
    minParamKey: string;
    maxParamKey: string;
  }
>;

export type SetSearchFilterValueAction = Action<
  'SET_SEARCH_FILTER_VALUE',
  { searchQuery: string }
>;

export type ClearFilterValuesAction = Action<'CLEAR_FILTER_VALUES', null>;
export type ToggleFiltersAction = Action<
  'TOGGLE_FILTERS',
  { value: boolean } | null
>;

export type FilterAction =
  | UpdateDataAction
  | SetSelectFilterValueAction
  | SetMultiSelectFilterValueAction
  | SetRangeFilterValueAction
  | SetSearchFilterValueAction
  | ClearFilterValuesAction
  | ToggleFiltersAction;
