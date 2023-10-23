import { LoadingOverlay } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';

import { TagsProvider } from '@jobstash/admin/state';
import {
  ProfileSkillsProvider,
  useProfileDevInfoContext,
} from '@jobstash/profile/state';

import { Loader } from '@jobstash/shared/ui';

import SkillsEdit from './skills-edit';
import SkillsHeader from './skills-header';
import SkillsList from './skills-list';
import SkillsToggle from './skills-toggle';

const SkillsSection = () => {
  const { isLoading } = useProfileDevInfoContext();

  return (
    <motion.div
      layout
      initial={{
        borderRadius: 24,
      }}
      className="flex flex-col border border-white/10 rounded-3xl bg-dark p-6 pb-4 gap-4 relative"
    >
      <LoadingOverlay
        visible={isLoading.skillsMutation}
        className="rounded-3xl"
        loader={<Loader size="12" />}
      />

      <TagsProvider>
        <ProfileSkillsProvider>
          <SkillsHeader />

          <SkillsList />

          <AnimatePresence mode="popLayout">
            <SkillsEdit />
          </AnimatePresence>

          <SkillsToggle />
        </ProfileSkillsProvider>
      </TagsProvider>
    </motion.div>
  );
};

export default SkillsSection;
