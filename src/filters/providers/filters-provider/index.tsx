'use client';

import { PrimitiveAtom } from 'jotai';

import { RouteSection } from '~/shared/core/constants';

import { FiltersContext } from './context';
import { useFilters } from './use-filters';

interface Props {
  children: React.ReactNode;
  atom: PrimitiveAtom<URLSearchParams>;
  rawSearchParams: Record<string, string>;
  routeSection: RouteSection;
}

export const FiltersProvider = ({
  children,
  atom,
  rawSearchParams,
  routeSection,
}: Props) => {
  const value = useFilters({ atom, rawSearchParams, routeSection });

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
