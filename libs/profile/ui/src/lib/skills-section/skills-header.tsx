import { useProfileSkillsContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const DEFAULT_DESCRIPTION =
  'You have selected these skills to be visible in your profile';
const EMPTY_DESCRIPTION = 'Start adding skills to be displayed in your profile';

const SkillsHeader = () => {
  const { skills } = useProfileSkillsContext();

  const hasSkills = skills.length > 0;
  const description = hasSkills ? DEFAULT_DESCRIPTION : EMPTY_DESCRIPTION;

  return (
    <>
      <div>
        <Heading size="md">Your Skills</Heading>
      </div>
      <div>
        <Text color="dimmed">{description}</Text>
      </div>
    </>
  );
};

export default SkillsHeader;
