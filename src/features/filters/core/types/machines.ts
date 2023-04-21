import { FilterConfig, FilterValues } from './filter-config';

export interface FilterMachineContext {
  isLoading: boolean;
  errorMsg: string;
  filterConfig: FilterConfig;
  initFilterValues: FilterValues | null;
  filterValues: FilterValues;
}

export type FetchOkEvent = {
  type: 'FETCH_OK';
  filterConfig: FilterConfig;
  filterValues: Record<string, string | null>;
};
export type FetchErrorEvent = { type: 'FETCH_ERROR'; msg: string };
export type FetchRetryEvent = { type: 'FETCH_RETRY' };

export type ToggleFilterUiEvent = { type: 'TOGGLE_FILTER_UI' };

export type SetFilterValueEvent = {
  type: 'SET_FILTER_VALUE';
  payload: string | null;
  paramKey: string;
};

export type SetRangeFilterValueEvent = {
  type: 'SET_RANGE_FILTER_VALUE';
  newMinValue: string | null;
  newMaxValue: string | null;
  minParamKey: string;
  maxParamKey: string;
};

export type SetSearchFilterValueEvent = {
  type: 'SET_SEARCH_FILTER_VALUE';
  payload: string;
};

export type ApplySearchFilterEvent = {
  type: 'APPLY_SEARCH_FILTER';
};

export type ApplyFilterValuesEvent = { type: 'APPLY_FILTER_VALUES' };
export type ClearFilterValuesEvent = { type: 'CLEAR_FILTER_VALUES' };

export type FilterMachineEvents =
  | FetchOkEvent
  | FetchErrorEvent
  | FetchRetryEvent
  | ToggleFilterUiEvent
  | SetFilterValueEvent
  | SetRangeFilterValueEvent
  | SetSearchFilterValueEvent
  | ApplySearchFilterEvent
  | ApplyFilterValuesEvent
  | ClearFilterValuesEvent;
