import { type Infer } from 'myzod';
import { type ParsedUrlQuery } from 'node:querystring';

import { FILTER_SECTION } from './constants';
import {
  filterConfigSchema,
  filterConfigSharedPropertiesSchema,
  multiSelectFilterConfigSchema,
  rangeFilterConfigSchema,
  selectOptionsSchema,
  singleSelectFilterConfigSchema,
} from './schemas';

export type FilterConfigSharedProperties = Infer<
  typeof filterConfigSharedPropertiesSchema
>;

export type RangeFilterConfig = Infer<typeof rangeFilterConfigSchema>;

export type SingleSelectFilterConfig = Infer<
  typeof singleSelectFilterConfigSchema
>;

export type MultiSelectFilterConfig = Infer<
  typeof multiSelectFilterConfigSchema
>;

export type SelectOptions = Infer<typeof selectOptionsSchema>;

export type FilterConfig = Infer<typeof filterConfigSchema>;

export type FilterValues = Record<string, string | null>;
export type FilterValue = FilterValues[string];

export interface FilterState {
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

export type FilterSection = typeof FILTER_SECTION[keyof typeof FILTER_SECTION];
