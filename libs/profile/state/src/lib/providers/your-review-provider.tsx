import { type ReactNode } from 'react';

import { YourReviewContext } from '../contexts/your-review-context';
import { useYourReview } from '../hooks/use-your-review';
import { useYourReviewTour } from '../hooks/use-your-review-tour';

interface Props {
  children: ReactNode;
}

export const YourReviewProvider = ({ children }: Props) => {
  const value = useYourReview();

  useYourReviewTour();

  return (
    <YourReviewContext.Provider value={value}>
      {children}
    </YourReviewContext.Provider>
  );
};
