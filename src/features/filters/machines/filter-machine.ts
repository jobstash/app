import { assign, createMachine } from 'xstate';

import type {
  FilterConfig,
  FilterMachineContext,
  FilterMachineEvents,
  FilterValues,
} from '../core/types';

export const filterMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgBsB7dCAqAYgDEBRAFQGEAJAfQHkBpANoAGALqJQABwqxcAF1wV84kAA9EARgBsAThIB2ABx6ArOoBMeoQGZ1Q42bMAaEAE9ENqyW0AWY3vVWQmbeBprWAL7hzmhYeISklNS0jKycXEwAShk8GcJiSCBSMvKKymoI6nq6hibmljZ2Ds5uCN5hJEJCBmYGtj52enrekdEYOATEJGAATtMU0yns3BmsGQCaecpFcgpKBeWV1UamFta29k6uiN5Cun5CQ0Lq6qGa-iMgMePxJNNg1C4SLgIGQwHQWDwAOKQgAyTC4DAAkjCWJkuABVRGbArbEp7UDlUzqEhWGxmN7aTTeKyaYLeZrubzeEiaF5vMxWbT2GlmD5fOKTP4AqY0eT4egQ6FwhHI1EZDFY0RbaQ7Ur7RBEklkilUnlMhkIMw+EgvZ6hXxCMK8qKfMYC0hCiCAyA7cV0ADKrBlKLRADUAIIw9Hwpi+pgAORY2MkKrxZUQeisehIIT0YSs9lM1PpV0NbS8Q20Rrs6mMVm82j5domDv+TpFrvonpYXAy-vDkPhSJ98oDQZDYcj0cKsd28YQlmT2k6lu6IQr1INpeJ5e0XJuRfMBm3kRt+AoEDgyn5NeVxTH6oQAFpNAar8Eq7Ea+QqDRxWfVfjVNdLi1vHozBIMx1F8CwwjCbwzGMR9vkmGY5mmD840vVcSAMbQkyLHxQhpYwDX-ZNjCEbxnh6KxgKZTQYPtX46xaGNzzVAl3AzEhjGpQYDGpYCgmIg1NE8N4K0GYjwKZYYbRPH5HUBYFQSQi9mIQKwDE8dik0MbjbDMPjc1JZNeKGCxAnsLlqOfGSGzFKAFKY78EAMII0MpbRemsTD-ANctCLXacbj6Ddd3CIA */
    initial: 'loading',
    tsTypes: {} as import('./filter-machine.typegen').Typegen0,
    predictableActionArguments: true,
    schema: {
      context: {} as FilterMachineContext,
      events: {} as FilterMachineEvents,
    },
    context: {
      isLoading: true,
      errorMsg: '',
      filterConfig: {} as FilterConfig,
      filterValues: {} as FilterValues,
      initFilterValues: null,
    },
    states: {
      loading: {
        on: {
          FETCH_OK: {
            target: 'ready.idle',
            actions: 'updateData',
          },
          FETCH_ERROR: {
            target: 'error',
            actions: 'updateError',
          },
        },
      },

      error: {
        on: {
          FETCH_RETRY: {
            target: 'loading',
          },
        },
      },

      ready: {
        initial: 'idle',
        on: {
          SET_SEARCH_FILTER_VALUE: {
            actions: 'setSearchFilterValue',
          },
          APPLY_SEARCH_FILTER: {
            cond: 'hasSearchQuery',
            actions: 'applySearchFilter',
            target: 'ready.idle',
          },
        },
        states: {
          idle: {
            on: {
              TOGGLE_FILTER_UI: {
                target: 'editing',
              },
            },
          },
          editing: {
            on: {
              TOGGLE_FILTER_UI: {
                target: 'idle',
              },
              SET_FILTER_VALUE: {
                actions: 'setFilterValueEvent',
              },
              SET_RANGE_FILTER_VALUE: {
                actions: 'setRangeFilterValue',
              },
              APPLY_FILTER_VALUES: {
                cond: 'hasFilterValues',
                actions: 'applyFilterValues',
                target: 'idle',
              },
              CLEAR_FILTER_VALUES: {
                cond: 'hasFilterValues',
                actions: 'clearFilterValues',
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      updateData: assign((ctx, event) => ({
        filterConfig: event.filterConfig,
        filterValues: event.filterValues,
        // Update if uninitialized, else remain as is
        initFilterValues: ctx.initFilterValues ?? event.filterValues,
      })),
      updateError: assign({
        errorMsg: (_, event) => event.msg,
      }),
      setFilterValueEvent: assign({
        filterValues: (ctx, { paramKey, payload }) => ({
          ...ctx.filterValues,
          [paramKey]: payload,
        }),
      }),
      setRangeFilterValue: assign({
        filterValues: (
          ctx,
          { newMinValue, minParamKey, newMaxValue, maxParamKey },
        ) => ({
          ...ctx.filterValues,
          [minParamKey]: newMinValue,
          [maxParamKey]: newMaxValue,
        }),
      }),
      setSearchFilterValue: assign({
        filterValues: (ctx, { payload }) => {
          const newFilterValues = ctx.filterValues;
          for (const key of Object.keys(newFilterValues)) {
            newFilterValues[key] = null;
          }

          newFilterValues['query'] = payload;

          return newFilterValues;
        },
      }),
      clearFilterValues: assign({
        filterValues: (ctx) => {
          const newFilterValues = ctx.filterValues;
          for (const key of Object.keys(newFilterValues)) {
            newFilterValues[key] = null;
          }

          return newFilterValues;
        },
      }),
    },
    guards: {
      hasFilterValues: (ctx) =>
        Object.values(ctx.filterValues).some((v) => v !== null),
      hasSearchQuery: (ctx) =>
        ctx.filterValues.query !== null &&
        (ctx.filterValues.query.trim() ?? '').length > 0,
    },
  },
);
