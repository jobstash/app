import { useEffect, useState, useTransition } from 'react';

import { PrimitiveAtom, useSetAtom } from 'jotai';

import { RouteSection } from '~/shared/core/constants';

import { useFilterConfig } from '~/filters/hooks/use-filter-config';

interface Props {
  atom: PrimitiveAtom<URLSearchParams>;
  rawSearchParams: Record<string, string>;
  routeSection: RouteSection;
}

export const useFilters = (props: Props) => {
  const { rawSearchParams, routeSection, atom } = props;

  const {
    isPending: isPendingData,
    filterSearchParams,
    data,
  } = useFilterConfig(rawSearchParams, routeSection);

  const [isPendingTransition, startFiltersTransition] = useTransition();

  const [initializedFilters, setInitializedFilters] = useState(false);
  const [initalizedQuery, setInitializedQuery] = useState(false);

  // Init filters
  const setAtomValue = useSetAtom(atom);
  useEffect(() => {
    if (!initializedFilters) {
      const newParams = new URLSearchParams(filterSearchParams);
      setAtomValue(newParams);
      setInitializedFilters(true);
    }
  }, [
    filterSearchParams,
    initializedFilters,
    setAtomValue,
    setInitializedFilters,
    rawSearchParams,
  ]);

  return {
    atom,
    routeSection,
    filterConfigs: data ?? [],
    filterSearchParams,
    isPendingFilters: isPendingData || isPendingTransition,
    startFiltersTransition,
    initalizedQuery,
    initializedFilters,
    setInitializedQuery,
  };
};
