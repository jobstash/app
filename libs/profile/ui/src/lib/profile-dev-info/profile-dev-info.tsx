import { LayoutGroup, motion } from 'framer-motion';

import { ProfileDevInfoProvider } from '@jobstash/profile/state';

import ProfileDevInfoSave from './profile-dev-info-save';
import { ShowcaseSection } from './showcase-section';
import { SkillsSection } from './skills-section';

const ProfileDevInfo = () => (
  <ProfileDevInfoProvider>
    <LayoutGroup>
      <SkillsSection />

      <motion.div layout>
        <ShowcaseSection />
      </motion.div>

      <motion.div layout>
        <ProfileDevInfoSave />
      </motion.div>
    </LayoutGroup>
  </ProfileDevInfoProvider>
);

export default ProfileDevInfo;
