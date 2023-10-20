import { useEffect, useRef, useState } from 'react';

import { ProfileShowcase, ProfileSkill } from '@jobstash/profile/core';

import { ProfileDevInfoContextProps } from '../contexts/profile-dev-info-context';

import { useProfileShowcaseQuery } from './use-profile-showcase-query';
import { useProfileSkillsMutation } from './use-profile-skills-mutation';
import { useProfileSkillsQuery } from './use-profile-skills-query';

export const useProfileDevInfo = (): ProfileDevInfoContextProps => {
  const { isLoadingSkillsQuery, skillsQueryData } = useProfileSkillsQuery();
  const [skills, setSkills] = useState<ProfileSkill[]>([]);
  const initRefSkills = useRef(false);
  useEffect(() => {
    if (!initRefSkills.current && skillsQueryData) {
      initRefSkills.current = true;
      setSkills(skillsQueryData);
    }
  }, [skillsQueryData]);

  const addSkill = (skill: ProfileSkill) =>
    setSkills((prev) => [...prev, skill]);
  const removeSkill = (id: string) =>
    setSkills((prev) => prev.filter((skill) => skill.id !== id));

  const { isLoadingShowcaseQuery, showcaseData } = useProfileShowcaseQuery();
  const [showcases, setShowcases] = useState<ProfileShowcase[]>([]);
  const initRefShowcase = useRef(false);
  useEffect(() => {
    if (!initRefShowcase.current && showcaseData) {
      initRefShowcase.current = true;
      setShowcases(showcaseData);
    }
  }, [showcaseData]);

  const addShowcase = (showcase: ProfileShowcase) =>
    setShowcases((prev) => [...prev, showcase]);
  const removeShowcase = (label: string) =>
    setShowcases((prev) => prev.filter((showcase) => showcase.label !== label));

  const { isLoadingSkillsMutation, mutateSkills } = useProfileSkillsMutation();

  return {
    isLoading: {
      skillsQuery: isLoadingSkillsQuery,
      skillsMutation: isLoadingSkillsMutation,
      showcaseQuery: isLoadingShowcaseQuery,
      showcaseMutation: false, // TODO
    },
    skills,
    addSkill,
    removeSkill,
    mutateSkills,
    showcases,
    addShowcase,
    removeShowcase,
  };
};
