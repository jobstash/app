import { motion } from 'framer-motion';

import { useProfileSkillsContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const DEFAULT_DESCRIPTION =
  'You have selected these skills to be visible in your profile';
const EMPTY_DESCRIPTION = 'Start adding skills to be displayed in your profile';

const SkillsHeader = () => {
  const { hasSkills } = useProfileSkillsContext();

  const description = hasSkills ? DEFAULT_DESCRIPTION : EMPTY_DESCRIPTION;

  return (
    <>
      <motion.div layout>
        <Heading size="md">Your Skills</Heading>
      </motion.div>
      <motion.div layout>
        <Text color="dimmed">{description}</Text>
      </motion.div>
    </>
  );
};

export default SkillsHeader;
