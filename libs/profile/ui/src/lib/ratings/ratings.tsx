import { RatingsProvider } from '@jobstash/profile/state';

import RatingsActions from './ratings-actions';
import RatingsHeader from './ratings-header';
import RatingsList from './ratings-list';

const Ratings = () => (
  <RatingsProvider>
    <RatingsHeader />
    <RatingsList />
    <RatingsActions />
  </RatingsProvider>
);

export default Ratings;
