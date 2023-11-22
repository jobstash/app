import { ReactNode } from 'react';

import { RatingsContext } from '../contexts/ratings-context';
import { useRatings } from '../hooks/use-ratings';
import { useRatingsTour } from '../hooks/use-ratings-tour';

interface Props {
  children: ReactNode;
}

export const RatingsProvider = ({ children }: Props) => {
  const value = useRatings();

  useRatingsTour();

  return (
    <RatingsContext.Provider value={value}>{children}</RatingsContext.Provider>
  );
};
