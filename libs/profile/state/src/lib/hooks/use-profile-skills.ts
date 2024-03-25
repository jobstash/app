import { useEffect, useMemo, useReducer, useState } from 'react';

import { ProfileSkill } from '@jobstash/profile/core';

import { usePopularSkills } from '@jobstash/shared/state';

import { ProfileSkillsContextProps } from '../contexts/profile-skills-context';

import { useProfileSkillsMutation } from './use-profile-skills-mutation';
import { useProfileSkillsQuery } from './use-profile-skills-query';

export const useProfileSkills = (): ProfileSkillsContextProps => {
  const { data: popularSkills } = usePopularSkills();

  const tags = popularSkills ?? [];

  const {
    isLoading: isLoadingQuery,
    isFetching,
    data,
  } = useProfileSkillsQuery();

  const [createdSkills, setCreatedSkills] = useState<ProfileSkill[]>([]);
  const createdSkillsIdSet = useMemo(
    () => new Set(createdSkills.map((s) => s.id)),
    [createdSkills],
  );

  const [removedSkills, setRemovedSkills] = useState<string[]>([]);
  const removedSkillsIdSet = useMemo(
    () => new Set(removedSkills),
    [removedSkills],
  );

  const [filteredData, setFilteredData] = useState<ProfileSkill[]>([]);
  useEffect(() => {
    if (data) {
      setFilteredData(
        data
          .filter(
            (d) =>
              !createdSkillsIdSet.has(d.id) && !removedSkillsIdSet.has(d.id),
          )
          .sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          }),
      );
    }
  }, [createdSkillsIdSet, data, removedSkillsIdSet]);

  const allSkills = useMemo(
    () => [...filteredData, ...createdSkills],
    [createdSkills, filteredData],
  );

  const skillsIdsSet = new Set(allSkills.map((skill) => skill.id));
  const options = tags
    .filter((tag) => !skillsIdsSet.has(tag.id))
    .map((tag) => ({ ...tag, canTeach: false }));

  const [isEditing, toggleEdit] = useReducer((prev) => !prev, false);

  const { isLoading: isLoadingMutation, mutate } = useProfileSkillsMutation();

  const mutateSkills = (skills: ProfileSkill[]) => {
    mutate({ skills });
  };

  const addSkill = (skill: ProfileSkill) => {
    if (!createdSkillsIdSet.has(skill.id)) {
      setCreatedSkills((prev) => [...prev, skill]);
    }

    if (removedSkillsIdSet.has(skill.id)) {
      setRemovedSkills((prev) => prev.filter((id) => id !== skill.id));
    }

    mutateSkills([...allSkills, skill]);
  };

  const removeSkill = (id: string) => {
    if (!removedSkillsIdSet.has(id)) {
      setRemovedSkills((prev) => [...prev, id]);
    }

    if (createdSkillsIdSet.has(id)) {
      setCreatedSkills((prev) => prev.filter((s) => s.id !== id));
    }

    mutateSkills(allSkills.filter((s) => s.id !== id));
  };

  const updateCanTeach = (id: string, canTeach: boolean) => {
    if (createdSkillsIdSet.has(id)) {
      setCreatedSkills((prev) =>
        prev.map((s) => (s.id === id ? { ...s, canTeach } : s)),
      );
    }

    mutateSkills(allSkills.map((s) => (s.id === id ? { ...s, canTeach } : s)));
  };

  return {
    isLoading: {
      query: isLoadingQuery || isFetching,
      mutation: isLoadingMutation,
    },
    skills: allSkills,
    options,
    isEditing,
    toggleEdit,
    addSkill,
    removeSkill,
    updateCanTeach,
  };
};
