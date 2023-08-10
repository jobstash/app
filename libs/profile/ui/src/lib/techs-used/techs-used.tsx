import { TechsUsedProps } from '@jobstash/profile/core';

import { TechsUsedProvider } from '@jobstash/profile/state';

import TechsUsedAction from './techs-used-actions';
import TechsUsedHeader from './techs-used-header';
import TechsUsedInput from './techs-used-input';
import TechsUsedList from './techs-used-list';

const TechsUsed = (props: TechsUsedProps) => (
  <TechsUsedProvider {...props}>
    <TechsUsedHeader />
    <TechsUsedInput />
    <TechsUsedList />
    <TechsUsedAction />
  </TechsUsedProvider>
);

export default TechsUsed;
