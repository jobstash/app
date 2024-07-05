import { Chip, Tooltip } from '@nextui-org/react';

import { Tag } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

import { EmptyCellPlaceholder } from '../empty-cell-placeholder';

interface Props {
  tags: Tag[];
  skills?: {
    id: string;
    name: string;
    canTeach: boolean;
  }[];
  isMatched?: boolean;
}

export const SkillsCell = ({ tags, skills, isMatched }: Props) => {
  if (!skills) return null;

  const skillSet = new Set<string>();
  for (const skill of skills) {
    skillSet.add(skill.name);
  }

  const matchingSkills = [];
  for (const { name } of tags) {
    if (skillSet.has(name)) {
      matchingSkills.push(name);
    }
  }

  const displayedSkills = isMatched
    ? matchingSkills
    : skills.map(({ name }) => name);

  if (isMatched && matchingSkills.length === 0) {
    return (
      <Tooltip
        content="Applicant skills did not match job description"
        delay={0}
      >
        <div>
          <EmptyCellPlaceholder isCentered={false} text="No Skills Matched" />
        </div>
      </Tooltip>
    );
  }

  return (
    <div className="flex flex-col gap-1 h-fit self-start">
      <div className="flex gap-2 w-full flex-wrap max-w-xs py-2">
        {displayedSkills.map((name) => (
          <Chip key={name} color="default" radius="sm">
            {capitalize(name)}
          </Chip>
        ))}
      </div>
    </div>
  );
};
