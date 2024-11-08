import { useMemo } from 'react';

import { Tag } from '@jobstash/shared/core';

import { ChipsCell } from './chips-cell';
import { EmptyCellPlaceholder } from './empty-cell-placeholder';

interface Props {
  tags?: Tag[];
  skills?: {
    id: string;
    name: string;
    canTeach: boolean;
  }[];
  isMatched?: boolean;
}

export const SkillsCell = ({ tags, skills, isMatched }: Props) => {
  const displayedSkills = useMemo(() => {
    if (!skills) return [];
    if (!isMatched) return skills.map(({ name }) => name);

    const skillSet = new Set<string>();
    for (const skill of skills) {
      skillSet.add(skill.name);
    }

    const matchingSkills = [];
    for (const { name } of tags ?? []) {
      if (skillSet.has(name)) {
        matchingSkills.push(name);
      }
    }

    return matchingSkills;
  }, [isMatched, skills, tags]);

  if (displayedSkills.length === 0) {
    return <EmptyCellPlaceholder isCentered={false} />;
  }

  return <ChipsCell values={displayedSkills} />;
};
