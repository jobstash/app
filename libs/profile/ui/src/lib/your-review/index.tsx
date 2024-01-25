import Actions from './actions';
import ConsTextarea from './cons-textarea';
import Header from './header';
import LocationSelect from './location-select';
import ProsTextarea from './pros-textarea';
import TimezoneSelect from './timezone-select';
import TitleInput from './title-input';
import TourProvider from './tour-provider';

export const YourReview = () => (
  <TourProvider>
    <div id="profile-right-panel-your-review" className="flex flex-col gap-4">
      <Header />
      <div className="flex flex-col items-center justify-center gap-8 [&>*]:w-full">
        <TitleInput />
        <LocationSelect />
        <TimezoneSelect />
        <ProsTextarea />
        <ConsTextarea />
        <Actions />
      </div>
    </div>
  </TourProvider>
);
