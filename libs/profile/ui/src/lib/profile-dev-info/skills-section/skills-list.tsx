import { useProfileDevInfoContext } from '@jobstash/profile/state';

import { TechWrapper } from '@jobstash/shared/ui';

import SkillsSkeleton from './skills-skeleton';
import SkillsWrapper from './skills-wrapper';

const SkillsList = () => {
  const { isLoading, skills } = useProfileDevInfoContext();

  if (isLoading.skillsQuery) return <SkillsSkeleton />;
  if (skills.length === 0) return null;

  return (
    <SkillsWrapper>
      {skills.map(({ name, id }) => (
        <TechWrapper key={id} id={id}>
          {name}
        </TechWrapper>
      ))}
    </SkillsWrapper>
  );
};

export default SkillsList;
