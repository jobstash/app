import { TagsUsedProvider } from '@jobstash/profile/state';

import Action from './action';
import Header from './header';
import Input from './input';
import TagList from './tag-list';
import TourProvider from './tour-provider';

const TagsUsed = () => (
  <TourProvider>
    <div id="profile-right-panel-techs-used" className="flex flex-col gap-4">
      <TagsUsedProvider>
        <Header />
        <Input />
        <TagList />
        <Action />
      </TagsUsedProvider>
    </div>
  </TourProvider>
);

export default TagsUsed;
