import { type ReactNode } from 'react';

import { YourReviewContext } from '../contexts/your-review-context';
import { useYourReview } from '../hooks/use-your-review';

interface Props {
  children: ReactNode;
}

export const YourReviewProvider = ({ children }: Props) => {
  const value = useYourReview();

  return (
    <YourReviewContext.Provider value={value}>
      {children}
    </YourReviewContext.Provider>
  );
};
