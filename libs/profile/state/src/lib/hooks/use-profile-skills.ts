import { useEffect, useReducer, useRef, useState } from 'react';

import { ProfileSkill } from '@jobstash/profile/core';

import { useTagsContext } from '@jobstash/admin/state';

import { useProfileSkillsQuery } from './use-profile-skills-query';

export const useProfileSkills = () => {
  const { tags } = useTagsContext();
  const { isLoading, data } = useProfileSkillsQuery();

  const [skills, setSkills] = useState<ProfileSkill[]>([]);

  const initRef = useRef(false);
  useEffect(() => {
    if (!initRef.current && data) {
      initRef.current = true;
      setSkills(data);
    }
  }, [data]);

  const hasSkills = skills.length > 0;

  const skillsIdsSet = new Set(skills.map((skill) => skill.id));
  const options = tags
    .filter((tag) => !skillsIdsSet.has(tag.id))
    .map(({ id, name }) => ({ id, name, canTeach: false }));

  const addSkill = (skill: ProfileSkill) =>
    setSkills((prev) => [...prev, skill]);
  const removeSkill = (id: string) =>
    setSkills((prev) => prev.filter((skill) => skill.id !== id));

  const [isEditing, toggleEdit] = useReducer((prev) => !prev, false);

  return {
    isLoading,
    skills,
    addSkill,
    removeSkill,
    hasSkills,
    options,
    isEditing,
    toggleEdit,
  };
};
