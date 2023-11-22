import { forwardRef } from 'react';

import { motion } from 'framer-motion';

import {
  useProfileDevInfoContext,
  useProfileSkillsContext,
} from '@jobstash/profile/state';

import ProfileRepoTag from '../../profile-repo-tag';

import SkillsInput from './skills-input';

const SkillsEdit = forwardRef<HTMLDivElement>((_props, ref) => {
  const { skills, removeSkill, updateCanTeach } = useProfileDevInfoContext();
  const { isEditing } = useProfileSkillsContext();

  if (!isEditing) return null;

  return (
    <motion.div ref={ref} layout className="flex flex-col gap-4">
      <motion.div layout>
        <hr className="border-t border-white/10" />
      </motion.div>

      <motion.div
        layout
        className="flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div layout className="max-w-lg">
          <SkillsInput />
        </motion.div>
        {skills.length > 0 && (
          <motion.div layout className="flex flex-wrap gap-4 items-center">
            {skills.map(({ id, name, canTeach }) => (
              <motion.div key={id} layout>
                <ProfileRepoTag
                  id={id}
                  name={name}
                  canTeach={canTeach}
                  onTagRemove={(id) => removeSkill(id)}
                  onClickCanTeach={updateCanTeach}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
});
SkillsEdit.displayName = 'SkillsEdit';

export default SkillsEdit;
