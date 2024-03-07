import { SkillWrapper } from '~/shared/components/skill-wrapper';

import { JobDetails } from '~/jobs/core/schemas';

interface Props {
  skills: JobDetails['tags'];
}

export const JobSkills = ({ skills }: Props) => {
  if (!skills.length) return null;

  return (
    <div className="flex max-h-[132px] flex-wrap gap-2 overflow-hidden">
      {skills.map(({ id, name }) => (
        <SkillWrapper key={id} id={id}>
          {name}
        </SkillWrapper>
      ))}
    </div>
  );
};
