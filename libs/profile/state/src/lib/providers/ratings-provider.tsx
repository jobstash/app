import { ReactNode } from 'react';

import { RatingsContext } from '../contexts/ratings-context';
import { useRatings } from '../hooks/use-ratings';

interface Props {
  children: ReactNode;
}

export const RatingsProvider = ({ children }: Props) => {
  const value = useRatings();

  return (
    <RatingsContext.Provider value={value}>{children}</RatingsContext.Provider>
  );
};
