import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useReducer } from 'react';

import { useAtom } from 'jotai';

import { getGradientBorderStyle } from '~/shared/utils/get-gradient-border-style';

import { useFiltersContext } from '~/filters/providers/filters-provider/context';

export const useFilterToggler = () => {
  const {
    initializedFilters,
    isPendingFilters,
    atom,
    startFiltersTransition,
    routeSection,
  } = useFiltersContext();

  const [atomValue, setAtom] = useAtom(atom);

  // Dedupe "query" - not included in toggled content
  // Dedupe range keys - 'min'/'max' filter-params (only count as 1)
  const filterCount = useMemo(() => {
    const keys = new Set();

    if (atomValue.size > 0)
      atomValue.forEach((_, k) => {
        if (k !== 'query') keys.add(k.replace(/min|max/g, ''));
      });

    return keys.size;
  }, [atomValue]);

  const [isOpen, toggleOpen] = useReducer((prev) => !prev, false);
  useEffect(() => {
    if (isOpen && isPendingFilters) {
      toggleOpen();
    }
  }, [isOpen, isPendingFilters]);

  const toggleStyle =
    (isOpen || filterCount > 0) && !isPendingFilters
      ? ACTIVE_BUTTON_STYLE
      : undefined;

  const buttonText = `${TOGGLE_TEXT}${filterCount > 0 ? ` (${filterCount})` : ''}`;

  const { push } = useRouter();

  const applyFilters = () => {
    startFiltersTransition(() => {
      // setInitializedFilters(false);
      push(`/${routeSection}?${atomValue.toString()}`);
    });
  };

  const clearFilters = () => {
    startFiltersTransition(() => {
      setAtom(new URLSearchParams());
      // setInitializedQuery(false);
      // setInitializedFilters(false);
      push(`/${routeSection}`);
    });
  };

  const isDisabledApply = filterCount === 0;
  const isDisabledClear = atomValue.size === 0;

  return {
    initializedFilters,
    isPendingFilters,
    toggleOpen,
    toggleStyle,
    buttonText,
    isOpen,
    applyFilters,
    clearFilters,
    isDisabledApply,
    isDisabledClear,
  };
};

const TOGGLE_TEXT = 'Filters & Sorting';
const ACTIVE_BUTTON_STYLE = getGradientBorderStyle();
