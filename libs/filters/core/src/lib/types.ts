import { type ParsedUrlQuery } from 'node:querystring';

import { FILTER_KIND } from './constants';

export interface FilterConfigSharedProperties {
  position: number;
  label: string;
  show: boolean;
  googleAnalyticsEventName?: string;
  googleAnalyticsEventId?: string;
}

export interface RangeFilterConfig extends FilterConfigSharedProperties {
  kind: typeof FILTER_KIND.RANGE;
  value: {
    lowest: {
      paramKey: string;
      value: number;
    };
    highest: {
      paramKey: string;
      value: number;
    };
  };
}

export interface SingleSelectFilterConfig extends FilterConfigSharedProperties {
  kind: typeof FILTER_KIND.SINGLE_SELECT;
  paramKey: string;
  options: { label: string; value: string }[];
}

export interface MultiSelectSearchFilterConfig
  extends FilterConfigSharedProperties {
  kind:
    | typeof FILTER_KIND.MULTI_SELECT
    | typeof FILTER_KIND.MULTI_SELECT_WITH_SEARCH;
  paramKey: string;
  options: string[];
}

export interface FilterConfig {
  publicationDate: SingleSelectFilterConfig;
  salary: RangeFilterConfig;
  seniority: MultiSelectSearchFilterConfig;
  locations: MultiSelectSearchFilterConfig;
  teamSize: RangeFilterConfig;
  headCount: RangeFilterConfig;
  tech: MultiSelectSearchFilterConfig;
  organizations: MultiSelectSearchFilterConfig;
  chains: MultiSelectSearchFilterConfig;
  projects: MultiSelectSearchFilterConfig;
  categories: MultiSelectSearchFilterConfig;
  tvl: RangeFilterConfig;
  monthlyVolume: RangeFilterConfig;
  monthlyFees: RangeFilterConfig;
  monthlyRevenue: RangeFilterConfig;
  audits: RangeFilterConfig;
  hacks: SingleSelectFilterConfig;
  fundingRounds: MultiSelectSearchFilterConfig;
  mainNet: SingleSelectFilterConfig;
  token: SingleSelectFilterConfig;
  order: SingleSelectFilterConfig;
  orderBy: SingleSelectFilterConfig;
}

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
    options: { label: string; value: string }[];
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
