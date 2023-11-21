import { TechsUsedProvider } from '@jobstash/profile/state';

import TechsUsedActions from './techs-used-actions';
import TechsUsedHeader from './techs-used-header';
import TechsUsedInput from './techs-used-input';
import TechsUsedList from './techs-used-list';
import TechsUsedTourProvider from './techs-used-tour-provider';

const TechsUsed = () => (
  <TechsUsedTourProvider>
    <TechsUsedProvider>
      <TechsUsedHeader />
      <TechsUsedInput />
      <TechsUsedList />
      <TechsUsedActions />
    </TechsUsedProvider>
  </TechsUsedTourProvider>
);

export default TechsUsed;
