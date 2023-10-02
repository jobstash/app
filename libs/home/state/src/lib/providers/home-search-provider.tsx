import { type ReactNode, useMemo, useState } from 'react';

import { HomeSearchContext } from '../contexts/home-search-context';

interface Props {
  children: ReactNode;
}

export const HomeSearchProvider = ({ children }: Props) => {
  const [showPopularKeywords, setShowPopularKeywords] =
    useState<boolean>(false);

  const value = useMemo(
    () => ({
      showPopularKeywords,
      setShowPopularKeywords,
    }),
    [showPopularKeywords],
  );

  return (
    <HomeSearchContext.Provider value={value}>
      {children}
    </HomeSearchContext.Provider>
  );
};
