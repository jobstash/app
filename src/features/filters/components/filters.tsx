import { useRouter } from 'next/router';
import {
  ChangeEventHandler,
  FormEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { Collapse, TextInput } from '@mantine/core';
import { useMachine } from '@xstate/react';
import type { Entries } from 'type-fest';

import {
  Button,
  FilterIcon,
  RocketLaunchIcon,
  SearchInputIcon,
} from '~/shared/components';
import { getOriginString } from '~/shared/utils';

import { FILTER_KIND } from '../core/constants';
import type {
  FilterConfig,
  MultiSelectSearchFilterConfig,
  RangeFilterConfig,
  SingleSelectFilterConfig,
} from '../core/types';
import { useFilterConfigQuery } from '../hooks';
import { filterMachine } from '../machines';
import { initFilterConfigData } from '../utils';

import MultiSelectFilter from './multi-select-filter';
import RangeFilter from './range-filter';
import SingleSelectFilter from './single-select-filter';

const Filters = () => {
  const { query, push } = useRouter();
  const [state, send] = useMachine(filterMachine, {
    actions: {
      applyFilterValues: (ctx) => {
        const url = new URL(`${getOriginString()}/jobs`);
        for (const [key, value] of Object.entries(ctx.filterValues)) {
          if (value) url.searchParams.set(key, value);
        }

        push(url, undefined, { shallow: true });
      },
      applySearchFilter: (ctx) => {
        push(
          `${getOriginString()}/jobs?query=${ctx.filterValues.query}`,
          undefined,
          { shallow: true },
        );
      },
    },
  });
  const { data, error } = useFilterConfigQuery();

  useEffect(() => {
    if (data) {
      // Init filterConfig to only include show=true, then sort by position
      const { filterConfig, filterValues } = initFilterConfigData(data, query);

      send({ type: 'FETCH_OK', filterConfig, filterValues });
    }

    if (error) send({ type: 'FETCH_ERROR', msg: 'pakyu' });
  }, [data, error, query, send]);

  const filterConfigEntries = useMemo(
    () => Object.entries(state.context.filterConfig) as Entries<FilterConfig>,
    [state.context.filterConfig],
  );

  const onClickToggle = useCallback(
    () => send({ type: 'TOGGLE_FILTER_UI' }),
    [send],
  );

  const onChangeSearchInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      send({ type: 'SET_SEARCH_FILTER_VALUE', payload: e.target.value });
    },
    [send],
  );

  const onClickSearchApply = useCallback(
    () => send({ type: 'APPLY_SEARCH_FILTER' }),
    [send],
  );

  const onSubmitSearch: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      send({ type: 'APPLY_SEARCH_FILTER' });
    },
    [send],
  );

  const onClickApply = useCallback(
    () => send({ type: 'APPLY_FILTER_VALUES' }),
    [send],
  );

  const onClickClear = useCallback(
    () => send({ type: 'CLEAR_FILTER_VALUES' }),
    [send],
  );

  return (
    <div className="flex flex-col gap-y-2 py-8 pb-4 lg:pb-0">
      {state.matches('error') && (
        <div>
          <p>errorMsg = {state.context.errorMsg}</p>
          <Button onClick={() => send({ type: 'FETCH_RETRY' })}>
            Try again
          </Button>
        </div>
      )}

      <div className="py-4">
        <form onSubmit={onSubmitSearch}>
          <TextInput
            icon={<SearchInputIcon />}
            placeholder="Search Jobs"
            size="lg"
            rightSection={
              <Button isIcon onClick={onClickSearchApply}>
                <RocketLaunchIcon />
              </Button>
            }
            value={state.context.filterValues.query ?? ''}
            disabled={state.matches('loading')}
            radius="md"
            styles={{
              input: {
                background: 'rgba(255, 255, 255, 0.1)',
                fontSize: 16,
                border: 'transparent',
              },
            }}
            onChange={onChangeSearchInput}
          />
        </form>
      </div>

      <div className="relative min-h-[70px]">
        <div className="flex items-center pt-4 md:absolute">
          <Button
            variant="outline"
            left={<FilterIcon />}
            isActive={state.matches('ready.editing')}
            isDisabled={state.matches('loading')}
            onClick={onClickToggle}
          >
            Filters & Sorting
          </Button>
        </div>
      </div>

      <Collapse
        in={state.matches('ready.editing')}
        transitionDuration={100}
        transitionTimingFunction="linear"
      >
        <div className="relative py-4">
          <div className="lg: -mx-2 flex flex-wrap pb-4 lg:-mx-3 lg:-mb-4">
            {filterConfigEntries.map(([key, config]) => (
              <div
                key={key}
                className="w-1/2 px-2 pb-2 lg:w-1/5 lg:px-3 lg:pb-4"
              >
                {config.kind === FILTER_KIND.RANGE && (
                  <RangeFilter
                    label={config.label}
                    minValue={
                      state.context.filterValues[
                        (config as RangeFilterConfig).value.lowest.paramKey
                      ]
                    }
                    maxValue={
                      state.context.filterValues[
                        (config as RangeFilterConfig).value.highest.paramKey
                      ]
                    }
                    minParamKey={
                      (config as RangeFilterConfig).value.lowest.paramKey
                    }
                    maxParamKey={
                      (config as RangeFilterConfig).value.highest.paramKey
                    }
                    minConfigValue={
                      (config as RangeFilterConfig).value.lowest.value
                    }
                    maxConfigValue={
                      (config as RangeFilterConfig).value.highest.value
                    }
                    send={send}
                  />
                )}

                {config.kind === FILTER_KIND.SINGLE_SELECT && (
                  <SingleSelectFilter
                    value={
                      state.context.filterValues[
                        (config as SingleSelectFilterConfig).paramKey
                      ]
                    }
                    label={config.label}
                    options={(config as SingleSelectFilterConfig).options}
                    send={send}
                    paramKey={(config as SingleSelectFilterConfig).paramKey}
                  />
                )}

                {(config.kind === FILTER_KIND.MULTI_SELECT ||
                  config.kind === FILTER_KIND.MULTI_SELECT_WITH_SEARCH) && (
                  <MultiSelectFilter
                    value={
                      state.context.filterValues[
                        (config as MultiSelectSearchFilterConfig).paramKey
                      ]
                    }
                    label={config.label}
                    options={(config as MultiSelectSearchFilterConfig).options}
                    paramKey={
                      (config as MultiSelectSearchFilterConfig).paramKey
                    }
                    send={send}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-6 lg:py-4">
          <Button
            variant="primary"
            isDisabled={!state.can({ type: 'APPLY_FILTER_VALUES' })}
            onClick={onClickApply}
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            isDisabled={!state.can({ type: 'CLEAR_FILTER_VALUES' })}
            onClick={onClickClear}
          >
            Clear Filters
          </Button>
        </div>
      </Collapse>
    </div>
  );
};

export default memo(Filters);
