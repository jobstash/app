import { useReducer } from 'react';

import { useTagsContext } from '@jobstash/admin/state';

import { useProfileDevInfoContext } from '../contexts/profile-dev-info-context';
import { ProfileSkillsContextProps } from '../contexts/profile-skills-context';

export const useProfileSkills = (): ProfileSkillsContextProps => {
  const { tags } = useTagsContext();
  const { skills } = useProfileDevInfoContext();

  const hasSkills = skills.length > 0;

  const skillsIdsSet = new Set(skills.map((skill) => skill.id));
  const options = tags
    .filter((tag) => !skillsIdsSet.has(tag.id))
    .map((tag) => ({ ...tag, canTeach: false }));

  const [isEditing, toggleEdit] = useReducer((prev) => !prev, false);

  return {
    hasSkills,
    options,
    isEditing,
    toggleEdit,
  };
};
