import { YourContributionProvider } from '@jobstash/profile/state';

import Action from './action';
import Header from './header';
import Input from './input';
import SubHeader from './sub-header';
import TourProvider from './tour-provider';

const YourContribution = () => (
  <TourProvider>
    <YourContributionProvider>
      <div
        id="profile-right-panel-your-contribution"
        className="flex flex-col gap-4"
      >
        <Header />
        <div className="flex flex-col gap-2 justify-center">
          <SubHeader />
          <Input />
          <Action />
        </div>
      </div>
    </YourContributionProvider>
  </TourProvider>
);

export default YourContribution;
