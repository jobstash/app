/* eslint-disable camelcase */
import { useRouter } from 'next/router';
import {
  type ChangeEventHandler,
  type FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { useAtom, useAtomValue } from 'jotai';

import {
  FILTER_NAME,
  type FilterConfig,
  type FilterState,
  FilterValues,
} from '@jobstash/filters/core';
import {
  FRONTEND_URL,
  GA_EVENT_ACTION,
  ROUTE_SECTION,
  type RouteSection,
} from '@jobstash/shared/core';
import { disablePageScroll, gaEvent } from '@jobstash/shared/utils';

import { jobCountAtom } from '@jobstash/jobs/state';
import { orgCountAtom } from '@jobstash/organizations/state';
import { projectCountAtom } from '@jobstash/projects/state';

import { showFiltersAtom } from '../atoms/show-filters-atom';
import { filterReducer } from '../reducers/filter-reducer';

import { useFilterConfig } from './use-filter-config';

export const useFilters = (routeSection: RouteSection) => {
  const { query: routerQuery, push, isReady } = useRouter();

  const [state, dispatch] = useReducer(filterReducer, {} as FilterState);

  const {
    data,
    isLoading: isLoadingData,
    error,
  } = useFilterConfig(routeSection);
  useEffect(() => {
    if (data) {
      dispatch({ type: 'UPDATE_DATA', payload: { data, routerQuery } });
    }
  }, [data, routerQuery]);

  const isLoading = isLoadingData || !isReady;

  const [showFilters, setShowFilters] = useAtom(showFiltersAtom);
  const toggleFilters = useCallback(
    () => setShowFilters((prev) => !prev),
    [setShowFilters],
  );

  useEffect(() => {
    disablePageScroll(showFilters);
  }, [showFilters]);

  const applyFilters = useCallback(
    (isSearch = false) => {
      const url = new URL(`${FRONTEND_URL}/${routeSection}`);
      for (const [key, value] of Object.entries(state.filterValues)) {
        if (value) {
          url.searchParams.set(key, value);
        }
      }

      setShowFilters(false);
      const filter_value = getFilterConfigValueString(url);

      gaEvent(GA_EVENT_ACTION.FILTER_ACTION, {
        filter_name: isSearch ? FILTER_NAME.JOB.SEARCH : FILTER_NAME.JOB.SUBMIT,
        filter_value,
      });

      setTimeout(
        () =>
          push(url.toString().replaceAll('%2C', ','), undefined, {
            shallow: true,
          }),
        100,
      );
    },
    [routeSection, setShowFilters, state.filterValues, push],
  );

  const clearFilters = useCallback(() => {
    const url = new URL(`${FRONTEND_URL}/${routeSection}`);
    const searchQuery = state?.filterValues?.query;
    if (searchQuery) {
      url.searchParams.set('query', searchQuery);
    }

    const currentFilterParams = getFilterValuesParams(state.filterValues);

    gaEvent(GA_EVENT_ACTION.FILTER_ACTION, {
      filter_name: FILTER_NAME.JOB.CLEAR,
      filter_value: currentFilterParams,
    });

    setShowFilters(false);
    setTimeout(() => push(url, undefined, { shallow: true }), 100);
  }, [routeSection, state.filterValues, setShowFilters, push]);

  const onSubmitSearch: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      applyFilters(true);
    },
    [applyFilters],
  );

  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      dispatch({
        type: 'SET_SEARCH_FILTER_VALUE',
        payload: { searchQuery: e.target.value },
      });
    },
    [],
  );

  const clearSearch = useCallback(() => {
    dispatch({
      type: 'SET_SEARCH_FILTER_VALUE',
      payload: { searchQuery: '' },
    });
  }, []);

  const filterCount = useMemo(() => {
    if (!state.filterValues) return 0;

    return new Set(
      Object.entries(state.filterValues)
        .filter(([k, _]) => k !== 'query')
        .filter(([_, v]) => v !== null)
        .map(([k, _]) => {
          if (k.includes('min') || k.includes('max')) return k.slice(3);

          return k;
        }),
    ).size;
  }, [state.filterValues]);

  const sortFilterConfigs: FilterConfig[string][] = useMemo(
    () =>
      state.filterConfig ? Object.values(state.filterConfig).slice(-2) : [],
    [state.filterConfig],
  );

  const shownFilterConfigs: FilterConfig[string][] = useMemo(
    () =>
      state.filterConfig ? Object.values(state.filterConfig).slice(0, -2) : [],
    [state.filterConfig],
  );

  const jobCount = useAtomValue(jobCountAtom);
  const orgCount = useAtomValue(orgCountAtom);
  const projectCount = useAtomValue(projectCountAtom);
  const filteredItemsCount = useMemo(() => {
    let count = null;

    switch (routeSection) {
      case ROUTE_SECTION.JOBS: {
        count = jobCount;

        break;
      }

      case ROUTE_SECTION.ORGANIZATIONS: {
        count = orgCount;

        break;
      }

      case ROUTE_SECTION.PROJECTS: {
        count = projectCount;

        break;
      }
      // No default
    }

    return count && count > 0 ? count : null;
  }, [routeSection, jobCount, orgCount, projectCount]);

  return {
    state: state as FilterState | undefined,
    dispatch,
    isLoading,
    onSubmitSearch,
    onChangeSearch,
    clearSearch,
    filterCount,
    toggleFilters,
    sortFilterConfigs,
    shownFilterConfigs,
    applyFilters,
    clearFilters,
    error,
    filteredItemsCount,
    showFilters,
  };
};

const getFilterValuesParams = (filterValues: FilterValues): string => {
  const filterParams: string[] = [];

  for (const filterValueKey in filterValues) {
    if (Object.prototype.hasOwnProperty.call(filterValues, filterValueKey)) {
      const filterValue = filterValues[filterValueKey];
      if (filterValue) {
        filterParams.push(
          `${encodeURIComponent(filterValueKey)}=${encodeURIComponent(
            filterValue,
          )}`,
        );
      }
    }
  }

  return filterParams.join('&');
};

const getFilterConfigValueString = (url: URL) => {
  const filterValuePairs = [];

  for (const [k, v] of url.searchParams.entries()) {
    filterValuePairs.push(`${k}=${v}`);
  }

  return filterValuePairs.join('&');
};
