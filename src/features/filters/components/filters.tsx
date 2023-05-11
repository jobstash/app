import { useRouter } from 'next/router';
import {
  ChangeEventHandler,
  FormEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { TextInput } from '@mantine/core';
import type { Entries } from 'type-fest';

import {
  Button,
  CloseIcon,
  FilterIcon,
  SearchInputIcon,
  Text,
} from '~/shared/components';
import { getOriginString } from '~/shared/utils';

import {
  FILTER_KIND,
  INIT_FILTER_STATE,
  OPTION_SEPARATOR,
} from '../core/constants';
import type { FilterConfig } from '../core/types';
import { useFilterConfigQuery } from '../hooks';
import { filterReducer } from '../reducers/filter-reducer';

import MultiSelectFilter from './multi-select-filter';
import RangeFilter from './range-filter';
import SingleSelectFilter from './single-select-filter';

interface Props {
  jobCount?: number;
}

const Filters = ({ jobCount }: Props) => {
  const { query: routerQuery, push, isReady } = useRouter();

  const [state, dispatch] = useReducer(filterReducer, INIT_FILTER_STATE);

  const { data, isLoading: isLoadingData } = useFilterConfigQuery();
  useEffect(() => {
    if (data) {
      dispatch({ type: 'UPDATE_DATA', payload: { data, routerQuery } });
    }
  }, [data, routerQuery]);

  const isLoading = isLoadingData || !isReady;

  const toggleFilters = useCallback(
    () => dispatch({ type: 'TOGGLE_FILTERS', payload: null }),
    [],
  );

  const filterConfigEntries = useMemo(
    () =>
      Object.entries(state.filterConfig ?? {}).slice(
        0,
        -2,
      ) as Entries<FilterConfig>,
    [state.filterConfig],
  );

  const sortFilterEntries = useMemo(
    () =>
      Object.entries(state.filterConfig ?? {}).slice(
        -2,
      ) as Entries<FilterConfig>,
    [state.filterConfig],
  );

  const onChangeSearchInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      dispatch({
        type: 'SET_SEARCH_FILTER_VALUE',
        payload: { searchQuery: e.target.value },
      });
    },
    [],
  );

  const applyFilters = useCallback(() => {
    const url = new URL(`${getOriginString()}/jobs`);
    for (const [key, value] of Object.entries(state.filterValues)) {
      if (value) {
        url.searchParams.set(key, value.replaceAll(OPTION_SEPARATOR, ','));
      }
    }

    dispatch({ type: 'TOGGLE_FILTERS', payload: { value: false } });
    setTimeout(() => push(url, undefined, { shallow: true }), 100);
  }, [push, state.filterValues]);

  const clearFilters = useCallback(() => {
    const url = new URL(`${getOriginString()}/jobs`);
    const searchQuery = state.filterValues.query;
    if (searchQuery) {
      url.searchParams.set('query', searchQuery);
    }

    dispatch({ type: 'TOGGLE_FILTERS', payload: { value: false } });
    setTimeout(() => push(url, undefined, { shallow: true }), 100);
  }, [push, state.filterValues.query]);

  const onSubmitSearch: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      applyFilters();
    },
    [applyFilters],
  );

  const clearSearch = useCallback(() => {
    dispatch({
      type: 'SET_SEARCH_FILTER_VALUE',
      payload: { searchQuery: '' },
    });
  }, []);

  const filterCount = useMemo(
    () =>
      new Set(
        Object.entries(state.filterValues)
          .filter(([k, _]) => k !== 'query')
          .filter(([_, v]) => v !== null)
          .map(([k, _]) => {
            if (k.includes('min') || k.includes('max')) return k.slice(3);

            return k;
          }),
      ).size,
    [state.filterValues],
  );

  return (
    <div className="flex flex-col pt-4 lg:pt-8">
      <div className="">
        <div className="flex flex-col gap-y-3">
          <form onSubmit={onSubmitSearch}>
            <TextInput
              icon={<SearchInputIcon />}
              placeholder={(routerQuery.query as string) ?? 'Search Jobs'}
              size="lg"
              rightSectionWidth={140}
              rightSection={
                <div className="hidden items-center gap-x-2 lg:flex">
                  <Button isIcon isDisabled={isLoading} onClick={clearSearch}>
                    <CloseIcon />
                  </Button>
                  <Button type="submit" isDisabled={isLoading}>
                    Search
                  </Button>
                </div>
              }
              value={state.filterValues.query ?? ''}
              disabled={isLoading}
              radius="md"
              styles={{
                input: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  fontSize: 16,
                  border: 'transparent',
                },
              }}
              classNames={{
                input: 'py-7 bg-white/10',
              }}
              onChange={onChangeSearchInput}
            />
          </form>

          <div className="flex flex-wrap items-center justify-between gap-x-6">
            <div>
              <Button
                variant={filterCount > 0 ? 'primary' : 'outline'}
                left={<FilterIcon />}
                isActive={state.showFilters}
                isDisabled={isLoading}
                onClick={toggleFilters}
              >
                {`Filters & Sorting${
                  filterCount > 0 ? ' (' + filterCount + ')' : ''
                }`}
              </Button>
            </div>

            {/* <div className="lg: -mx-2 flex flex-wrap pb-4 lg:-mx-3 lg:-mb-4">
              {state.showFilters &&
                sortFilterEntries.map(([key, config]) => (
                  <div
                    key={key}
                    className="w-1/2 px-2 pb-2 lg:w-1/5 lg:px-3 lg:pb-4"
                  >
                    {config.kind === FILTER_KIND.SINGLE_SELECT && (
                      <SingleSelectFilter
                        value={state.filterValues[config.paramKey]}
                        label={config.label}
                        options={config.options}
                        paramKey={config.paramKey}
                        dispatch={dispatch}
                      />
                    )}
                  </div>
                ))}
            </div> */}

            <div className="hidden grow items-center gap-x-6 lg:flex">
              {state.showFilters &&
                sortFilterEntries.map(([key, config]) => (
                  <div key={key} className="w-[150px]">
                    {config.kind === FILTER_KIND.SINGLE_SELECT && (
                      <SingleSelectFilter
                        value={state.filterValues[config.paramKey]}
                        options={config.options}
                        paramKey={config.paramKey}
                        dispatch={dispatch}
                        placeholder={config.label}
                      />
                    )}
                  </div>
                ))}
            </div>

            <div>
              {jobCount && (
                <Text
                  className="my-3 inline-block whitespace-nowrap"
                  color="dimmed"
                >{`Jobs Found: ${jobCount}`}</Text>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          'overflow-hidden transition-all duration-300	lg:relative lg:mt-4  lg:bg-transparent lg:p-0 fixed inset-0 z-50 bg-filters lg:duration-100 ' +
          (state.showFilters
            ? 'h-screen lg:h-auto lg:max-h-[9999px]'
            : 'h-0 lg:h-auto lg:max-h-0')
        }
      >
        <div className="p-4 pt-6 lg:p-0">
          <div className=" lg:hidden">
            <div className="flex justify-between">
              <Button
                variant={filterCount > 0 ? 'primary' : 'outline'}
                left={<FilterIcon />}
                isActive={state.showFilters}
                isDisabled={isLoading}
                onClick={toggleFilters}
              >
                {`Filters & Sorting${
                  filterCount > 0 ? ' (' + filterCount + ')' : ''
                }`}
              </Button>
              <Button size="sm" variant="transparent" onClick={toggleFilters}>
                <CloseIcon />
              </Button>
            </div>
            <div className="my-4 flex justify-between border-y border-dark-gray py-4">
              {state.showFilters &&
                sortFilterEntries.map(([key, config]) => (
                  <div key={key} className="w-[150px]">
                    {config.kind === FILTER_KIND.SINGLE_SELECT && (
                      <SingleSelectFilter
                        value={state.filterValues[config.paramKey]}
                        options={config.options}
                        paramKey={config.paramKey}
                        dispatch={dispatch}
                        placeholder={config.label}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="-mx-2 flex flex-wrap pb-4 lg:-mx-3 lg:-mb-4">
            {filterConfigEntries.length > 0 &&
              filterConfigEntries.map(([key, config]) => (
                <div
                  key={key}
                  className="w-1/3 px-2 pb-2 lg:w-1/5 lg:px-3 lg:pb-4"
                >
                  {config.kind === FILTER_KIND.RANGE && (
                    <RangeFilter
                      label={config.label}
                      minValue={
                        state.filterValues[config.value.lowest.paramKey]
                      }
                      maxValue={
                        state.filterValues[config.value.highest.paramKey]
                      }
                      minParamKey={config.value.lowest.paramKey}
                      maxParamKey={config.value.highest.paramKey}
                      minConfigValue={config.value.lowest.value}
                      maxConfigValue={config.value.highest.value}
                      dispatch={dispatch}
                    />
                  )}

                  {config.kind === FILTER_KIND.SINGLE_SELECT && (
                    <SingleSelectFilter
                      value={state.filterValues[config.paramKey]}
                      label={config.label}
                      options={config.options}
                      paramKey={config.paramKey}
                      dispatch={dispatch}
                    />
                  )}

                  {(config.kind === FILTER_KIND.MULTI_SELECT ||
                    config.kind === FILTER_KIND.MULTI_SELECT_WITH_SEARCH) && (
                    <MultiSelectFilter
                      value={state.filterValues[config.paramKey]}
                      label={config.label}
                      options={config.options}
                      paramKey={config.paramKey}
                      dispatch={dispatch}
                    />
                  )}
                </div>
              ))}
          </div>

          <div className="flex flex-wrap gap-6 lg:py-2">
            <Button variant="primary" onClick={applyFilters}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Filters);
