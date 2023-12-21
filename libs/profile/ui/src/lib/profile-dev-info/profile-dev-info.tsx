import { LayoutGroup } from 'framer-motion';

import { ProfileDevInfoProvider } from '@jobstash/profile/state';

import ProfileDevInfoSave from './profile-dev-info-save';
import { ShowcaseSection } from './showcase-section';
import { SkillsSection } from './skills-section';

const ProfileDevInfo = () => (
  <ProfileDevInfoProvider>
    <LayoutGroup>
      <ShowcaseSection />
      <SkillsSection />
      <ProfileDevInfoSave />
    </LayoutGroup>
  </ProfileDevInfoProvider>
);

export default ProfileDevInfo;
