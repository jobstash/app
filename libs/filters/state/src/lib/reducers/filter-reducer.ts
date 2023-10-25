import {
  type FilterAction,
  type FilterState,
  seniorityMapping,
} from '@jobstash/filters/core';
import { initFilterConfigData } from '@jobstash/filters/utils';
import { encodeBase64, normalizeString } from '@jobstash/shared/utils';

export const filterReducer = (
  state: FilterState,
  { type, payload }: FilterAction,
): FilterState => {
  switch (type) {
    case 'UPDATE_DATA': {
      const { data, routerQuery } = payload;
      const { filterConfig, filterValues } = initFilterConfigData(
        data,
        routerQuery,
      );
      return {
        ...state,
        filterConfig,
        filterValues,
      };
    }

    case 'SET_SELECT_FILTER_VALUE': {
      const { paramKey, selectedLabel, options } = payload;
      // Find value associated to the label
      const value =
        options.find((o) => o.label === selectedLabel)?.value.toString() ??
        null;
      const normalizedValue = value ? normalizeString(value) : value;

      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          [paramKey]: normalizedValue,
        },
      };
    }

    case 'SET_MULTISELECT_FILTER_VALUE': {
      const { paramKey, selectedLabels } = payload;

      const value =
        selectedLabels.length > 0
          ? paramKey === 'seniority'
            ? selectedLabels
                .map((label) =>
                  encodeBase64(
                    seniorityMapping[label as keyof typeof seniorityMapping],
                  ),
                )
                .join(',')
            : selectedLabels.map((label) => encodeBase64(label)).join(',')
          : null;
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          [paramKey]: value,
        },
      };
    }

    case 'SET_RANGE_FILTER_VALUE': {
      const { min, minParamKey, max, maxParamKey } = payload;

      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          [minParamKey]: min,
          [maxParamKey]: max,
        },
      };
    }

    case 'SET_SEARCH_FILTER_VALUE': {
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          query: encodeBase64(payload.searchQuery),
        },
      };
    }

    default: {
      throw new Error(`Filter reducer type "${type}" is invalid`);
    }
  }
};
