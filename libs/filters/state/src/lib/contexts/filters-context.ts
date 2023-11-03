import {
  type ChangeEventHandler,
  createContext,
  type Dispatch,
  type DispatchWithoutAction,
  type FormEventHandler,
  useContext,
} from 'react';

import {
  type FilterAction,
  type FilterConfig,
  type FilterState,
} from '@jobstash/filters/core';
import { type RouteSection } from '@jobstash/shared/core';

export interface FiltersContextProps {
  state?: FilterState;
  dispatch: Dispatch<FilterAction>;
  isLoading: boolean;
  onSubmitSearch: FormEventHandler;
  onChangeSearch: ChangeEventHandler<HTMLInputElement>;
  clearSearch: DispatchWithoutAction;
  filterCount: number;
  toggleFilters: DispatchWithoutAction;
  sortFilterConfigs: FilterConfig[string][];
  shownFilterConfigs: FilterConfig[string][];
  applyFilters: (_?: boolean) => void;
  clearFilters: DispatchWithoutAction;
  error: unknown;
  filteredItemsCount: number | null;
  showFilters: boolean;
  routeSection: RouteSection;
  showFullscreenModal: boolean;
}

export const FiltersContext = createContext<FiltersContextProps | null>(null);

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error(
      'useFiltersContext must be used within a FiltersContextProvider',
    );
  }

  return context;
};
