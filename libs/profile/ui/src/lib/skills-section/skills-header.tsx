import { useProfileSkillsContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const DEFAULT_DESCRIPTION = 'Your current skills';
const EMPTY_DESCRIPTION =
  "Add skills you'd like to work with in the future, we'll showcase them on your profile";

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
