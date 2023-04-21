// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: 'applyFilterValues' | 'applySearchFilter';
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    applyFilterValues: 'APPLY_FILTER_VALUES';
    applySearchFilter: 'APPLY_SEARCH_FILTER';
    clearFilterValues: 'CLEAR_FILTER_VALUES';
    setFilterValueEvent: 'SET_FILTER_VALUE';
    setRangeFilterValue: 'SET_RANGE_FILTER_VALUE';
    setSearchFilterValue: 'SET_SEARCH_FILTER_VALUE';
    updateData: 'FETCH_OK';
    updateError: 'FETCH_ERROR';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    hasFilterValues: 'APPLY_FILTER_VALUES' | 'CLEAR_FILTER_VALUES';
    hasSearchQuery: 'APPLY_SEARCH_FILTER';
  };
  eventsCausingServices: {};
  matchesStates:
    | 'error'
    | 'loading'
    | 'ready'
    | 'ready.editing'
    | 'ready.idle'
    | { ready?: 'editing' | 'idle' };
  tags: never;
}
