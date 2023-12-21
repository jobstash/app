import { SkillsUsedProvider } from '@jobstash/profile/state';

import Action from './action';
import Header from './header';
import Input from './input';
import TagList from './tag-list';
import TourProvider from './tour-provider';

const SkillsUsed = () => (
  <TourProvider>
    <div id="profile-right-panel-techs-used" className="flex flex-col gap-4">
      <SkillsUsedProvider>
        <Header />
        <Input />
        <TagList />
        <Action />
      </SkillsUsedProvider>
    </div>
  </TourProvider>
);

export default SkillsUsed;
