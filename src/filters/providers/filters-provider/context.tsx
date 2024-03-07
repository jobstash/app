'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useContext,
} from 'react';

import { PrimitiveAtom } from 'jotai';

import { RouteSection } from '~/shared/core/constants';

import { FilterConfig } from '~/filters/core/schemas';

export interface FiltersContextProps {
  atom: PrimitiveAtom<URLSearchParams>;
  routeSection: RouteSection;
  filterConfigs: FilterConfig[];
  filterSearchParams: URLSearchParams;
  isPendingFilters: boolean;
  startFiltersTransition: TransitionStartFunction;
  initalizedQuery: boolean;
  initializedFilters: boolean;
  setInitializedQuery: Dispatch<SetStateAction<boolean>>;
}

export const FiltersContext = createContext<FiltersContextProps | null>(null);

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error('useFiltersContext must be used within a FiltersContext');
  }

  return context;
};
