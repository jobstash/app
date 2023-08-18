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
      <div className="flex flex-col gap-4">{children}</div>
    </YourReviewContext.Provider>
  );
};
