import { YourContributionProvider } from '@jobstash/profile/state';

import YourContributionsActions from './your-contribution-actions';
import YourContributionHeader from './your-contribution-header';
import YourContributionInput from './your-contribution-input';
import YourContributionSubHeader from './your-contribution-sub-header';

const YourContribution = () => (
  <YourContributionProvider>
    <YourContributionHeader />
    <div className="flex flex-col gap-2 justify-center">
      <YourContributionSubHeader />
      <YourContributionInput />
      <YourContributionsActions />
    </div>
  </YourContributionProvider>
);

export default YourContribution;
