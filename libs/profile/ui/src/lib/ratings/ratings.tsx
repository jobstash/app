import RatingsActions from './ratings-actions';
import RatingsHeader from './ratings-header';
import RatingsList from './ratings-list';
import TourProvider from './tour-provider';

const Ratings = () => (
  <TourProvider>
    <div id="profile-right-panel-ratings" className="flex flex-col gap-4">
      <RatingsHeader />
      <RatingsList />
      <RatingsActions />
    </div>
  </TourProvider>
);

export default Ratings;
