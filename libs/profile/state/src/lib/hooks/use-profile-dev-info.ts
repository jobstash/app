import { useEffect, useMemo, useRef, useState } from 'react';

import { ProfileShowcase, ProfileSkill } from '@jobstash/profile/core';

import { ProfileDevInfoContextProps } from '../contexts/profile-dev-info-context';

import { useProfileShowcaseMutation } from './use-profile-showcase-mutation';
import { useProfileShowcaseQuery } from './use-profile-showcase-query';
import { useProfileSkillsMutation } from './use-profile-skills-mutation';
import { useProfileSkillsQuery } from './use-profile-skills-query';

export const useProfileDevInfo = (): ProfileDevInfoContextProps => {
  const { isLoadingSkillsQuery, skillsQueryData } = useProfileSkillsQuery();
  const fetchedSkills = useMemo(() => skillsQueryData ?? [], [skillsQueryData]);

  const [skills, setSkills] = useState<ProfileSkill[]>([]);
  const initSkillsRef = useRef(false);
  useEffect(() => {
    if (!initSkillsRef.current && fetchedSkills.length > 0) {
      setSkills(fetchedSkills);
      initSkillsRef.current = true;
    }
  }, [fetchedSkills]);

  const addSkill = (skill: ProfileSkill) =>
    setSkills((prev) => [...prev, skill]);

  const removeSkill = (id: string) =>
    setSkills((prev) => prev.filter((s) => s.id !== id));

  const updateCanTeach = (id: string, canTeach: boolean) =>
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, canTeach } : s)),
    );

  const { isLoadingShowcaseQuery, showcaseData } = useProfileShowcaseQuery();
  const fetchedShowcases = useMemo(() => showcaseData ?? [], [showcaseData]);

  const [showcases, setShowcases] = useState<ProfileShowcase[]>([]);
  const initShowcaseRef = useRef(false);
  useEffect(() => {
    if (!initShowcaseRef.current && fetchedShowcases.length > 0) {
      setShowcases(fetchedShowcases);
      initShowcaseRef.current = true;
    }
  }, [fetchedShowcases, fetchedSkills]);

  const addShowcase = (showcase: ProfileShowcase) =>
    setShowcases((prev) => [...prev, showcase]);

  const removeShowcase = (label: string) =>
    setShowcases((prev) => prev.filter((showcase) => showcase.label !== label));

  const { isLoadingSkillsMutation, mutateAsyncSkills } =
    useProfileSkillsMutation();
  const { isLoadingShowcaseMutation, mutateAsyncShowcase } =
    useProfileShowcaseMutation();

  return {
    isLoading: {
      skillsQuery: isLoadingSkillsQuery,
      skillsMutation: isLoadingSkillsMutation,
      showcaseQuery: isLoadingShowcaseQuery,
      showcaseMutation: isLoadingShowcaseMutation,
    },
    skills,
    fetchedSkills,
    addSkill,
    removeSkill,
    updateCanTeach,
    mutateAsyncSkills,
    showcases,
    fetchedShowcases,
    addShowcase,
    removeShowcase,
    mutateAsyncShowcase,
  };
};
