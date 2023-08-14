import { YourReviewProvider } from '@jobstash/profile/state';

import YourReviewActions from './your-review-actions';
import YourReviewCons from './your-review-cons';
import YourReviewHeader from './your-review-header';
import YourReviewHeadline from './your-review-headline';
import YourReviewPros from './your-review-pros';

const YourReview = () => (
  <YourReviewProvider>
    <YourReviewHeader />
    <div className="flex flex-col items-center justify-center px-[10%] gap-8 [&>*]:w-full">
      <YourReviewHeadline />
      <YourReviewPros />
      <YourReviewCons />
      <YourReviewActions />
    </div>
  </YourReviewProvider>
);

export default YourReview;
