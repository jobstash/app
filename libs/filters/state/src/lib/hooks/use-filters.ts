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

import { type FilterConfig, type FilterState } from '@jobstash/filters/core';
import { getFrontendUrl } from '@jobstash/shared/utils';

import { jobCountAtom } from '@jobstash/jobs/state';

import { showFiltersAtom } from '../atoms/show-filters-atom';
import { filterReducer } from '../reducers/filter-reducer';

import { useFilterConfig } from './use-filter-config';

export const useFilters = () => {
  const { query: routerQuery, push, isReady } = useRouter();

  const [state, dispatch] = useReducer(filterReducer, {} as FilterState);

  const { data, isLoading: isLoadingData, error } = useFilterConfig();
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

  const frontendUrl = getFrontendUrl();
  const applyFilters = useCallback(() => {
    const url = new URL(`${frontendUrl}/jobs`);
    for (const [key, value] of Object.entries(state.filterValues)) {
      if (value) {
        url.searchParams.set(key, value);
      }
    }

    setShowFilters(false);
    setTimeout(() => push(url, undefined, { shallow: true }), 100);
  }, [frontendUrl, push, setShowFilters, state.filterValues]);

  const clearFilters = useCallback(() => {
    const url = new URL(`${frontendUrl}/jobs`);
    const searchQuery = state?.filterValues?.query;
    if (searchQuery) {
      url.searchParams.set('query', searchQuery);
    }

    setShowFilters(false);
    setTimeout(() => push(url, undefined, { shallow: true }), 100);
  }, [frontendUrl, push, setShowFilters, state?.filterValues?.query]);

  const onSubmitSearch: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      applyFilters();
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
    jobCount,
    showFilters,
  };
};
