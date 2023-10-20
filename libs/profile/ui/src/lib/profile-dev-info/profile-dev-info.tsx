import { ProfileDevInfoProvider } from '@jobstash/profile/state';

import ProfileDevInfoSave from './profile-dev-info-save';
import { ShowcaseSection } from './showcase-section';
import { SkillsSection } from './skills-section';

const ProfileDevInfo = () => (
  <ProfileDevInfoProvider>
    <SkillsSection />
    <ShowcaseSection />
    <ProfileDevInfoSave />
  </ProfileDevInfoProvider>
);

export default ProfileDevInfo;
