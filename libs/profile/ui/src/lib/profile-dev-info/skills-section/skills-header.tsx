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
      <Heading size="md">Your Skills</Heading>
      <Text color="dimmed">{description}</Text>
    </>
  );
};

export default SkillsHeader;
