import TourProvider from './tour-provider';
import YourReviewActions from './your-review-actions';
import YourReviewCons from './your-review-cons';
import YourReviewHeader from './your-review-header';
import YourReviewHeadline from './your-review-headline';
import YourReviewPros from './your-review-pros';

const YourReview = () => (
  <TourProvider>
    <div id="profile-right-panel-your-review" className="flex flex-col gap-4">
      <YourReviewHeader />
      <div className="flex flex-col items-center justify-center gap-8 [&>*]:w-full">
        <YourReviewHeadline />
        <YourReviewPros />
        <YourReviewCons />
        <YourReviewActions />
      </div>
    </div>
  </TourProvider>
);

export default YourReview;
