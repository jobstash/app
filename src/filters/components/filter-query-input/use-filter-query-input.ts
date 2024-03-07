import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import { QUERY_PARAM_KEY } from '~/filters/core/constants';
import { useFiltersContext } from '~/filters/providers/filters-provider/context';

export const useFilterQueryInput = () => {
  const {
    isPendingFilters,
    filterSearchParams,
    atom,
    initalizedQuery,
    setInitializedQuery,
    startFiltersTransition,
    routeSection,
  } = useFiltersContext();

  const [value, setValue] = useState('');

  // Init Query
  useEffect(() => {
    if (!initalizedQuery) {
      const initValue = filterSearchParams.get(QUERY_PARAM_KEY) ?? '';
      setValue(initValue);
      setInitializedQuery(true);
    }
  }, [filterSearchParams, initalizedQuery, setInitializedQuery]);

  const [atomValue, setAtom] = useAtom(atom);

  const { push } = useRouter();

  const applyQuery = () => {
    const newParams = new URLSearchParams(atomValue);

    const hasValue = value.length > 0;
    hasValue
      ? newParams.set(QUERY_PARAM_KEY, value)
      : newParams.delete(QUERY_PARAM_KEY);

    setAtom(newParams);

    startFiltersTransition(() => {
      push(`/${routeSection}?${newParams.toString()}`);
    });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    applyQuery();
  };

  const isPending = !initalizedQuery || isPendingFilters;

  return { onSubmit, isPending, applyQuery, value, setValue };
};
