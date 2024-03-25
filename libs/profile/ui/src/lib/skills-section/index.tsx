import { ProfileSkillsProvider } from '@jobstash/profile/state';

import SkillsEdit from './skills-edit';
import SkillsHeader from './skills-header';
import SkillsList from './skills-list';
import SkillsToggle from './skills-toggle';

const ProfileSkillsSection = () => (
  <div className="flex flex-col border border-white/10 rounded-3xl bg-dark p-6 pb-4 gap-4">
    <ProfileSkillsProvider>
      <SkillsHeader />
      <SkillsList />
      <SkillsEdit />
      <SkillsToggle />
    </ProfileSkillsProvider>
  </div>
);

export default ProfileSkillsSection;
