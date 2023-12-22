import { useProfileSkillsContext } from '@jobstash/profile/state';

import { TechWrapper } from '@jobstash/shared/ui';

import SkillsWrapper from './skills-wrapper';

const SkillsList = () => {
  const { skills } = useProfileSkillsContext();

  if (skills.length === 0) return null;

  return (
    <SkillsWrapper>
      {skills.map(({ name, id, canTeach }) => (
        <div key={id}>
          <TechWrapper isChecked canTeach={canTeach} id={id}>
            {name}
          </TechWrapper>
        </div>
      ))}
    </SkillsWrapper>
  );
};

export default SkillsList;
