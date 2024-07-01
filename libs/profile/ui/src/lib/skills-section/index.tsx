import { useProfileSkillsContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

import SkillsEdit from './skills-edit';
import SkillsList from './skills-list';
import SkillsToggle from './skills-toggle';

const DEFAULT_DESCRIPTION = 'Your current skills';
const EMPTY_DESCRIPTION =
  "Add skills you'd like to work with in the future, we'll showcase them on your profile";

const ProfileSkillsSection = () => {
  const { skills } = useProfileSkillsContext();

  const hasSkills = skills.length > 0;
  const description = hasSkills ? DEFAULT_DESCRIPTION : EMPTY_DESCRIPTION;

  return (
    <div className="flex flex-col px-1 pb-4 gap-6">
      <Text color="dimmed">{description}</Text>
      <SkillsList />
      <SkillsEdit />
      <SkillsToggle />
    </div>
  );
};

export default ProfileSkillsSection;
