import { useEffect, useState } from 'react';

import { PrimitiveAtom, useAtom } from 'jotai';

export const useInitFilterParams = (
  searchParams: URLSearchParams,
  atom: PrimitiveAtom<URLSearchParams>,
) => {
  const [initialized, setInitialized] = useState(false);
  const [filterParams, setFilterParams] = useAtom(atom);

  useEffect(() => {
    if (!initialized) {
      const newParams = new URLSearchParams(searchParams);
      setFilterParams(newParams);
      setInitialized(true);
    }
  }, [initialized, setFilterParams, searchParams]);

  return { initialized, filterParams, setFilterParams };
};
