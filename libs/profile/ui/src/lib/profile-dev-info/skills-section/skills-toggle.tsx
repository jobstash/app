import { motion } from 'framer-motion';

import {
  useProfileDevInfoContext,
  useProfileSkillsContext,
} from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const SkillsToggle = () => {
  const { isLoading } = useProfileDevInfoContext();
  const { hasSkills, isEditing, toggleEdit } = useProfileSkillsContext();

  const showBorder = hasSkills || isLoading.skillsQuery || isEditing;
  const buttonText = isEditing
    ? 'Hide Details'
    : `${hasSkills ? 'Edit Your' : 'Add'} Skills`;

  return (
    <>
      {showBorder && <hr className="border-t border-white/10" />}
      {isLoading.skillsQuery ? (
        <motion.div
          layout="position"
          className="h-9 bg-white/20 rounded-lg w-24 animate-pulse"
        />
      ) : (
        <motion.div layout="position">
          <Button variant="outline" size="sm" onClick={() => toggleEdit()}>
            {buttonText}
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default SkillsToggle;
