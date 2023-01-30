import clsx from 'clsx';

import type { Skill } from '~/core/interfaces';

import { TechWrapper } from '../unstyled-ui/tech-wrapper';

interface Props {
  skills: Skill[];
  isParentActive: boolean;
}

export const JobListingSkills = ({ skills, isParentActive }: Props) => (
  <>
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

    <hr className="h-px border-0 bg-white/30" />
  </>
);
