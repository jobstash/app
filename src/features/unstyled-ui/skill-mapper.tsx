import type { Skill } from '~/core/interfaces';

import { TechWrapper } from './tech-wrapper';

interface Props {
  skills: Skill[];
  isParentActive: boolean;
}

export const SkillMapper = ({ skills, isParentActive }: Props) => (
  <div className="flex space-x-4">
    {skills.map((skill) => (
      <TechWrapper
        key={skill.name}
        text={skill.name}
        isChecked={skill.isChecked}
        isParentActive={isParentActive}
      />
    ))}
  </div>
);
