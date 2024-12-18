import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { useAuthContext } from '@jobstash/auth/state';

import { userSkillsAtom } from '../atoms/user-skills-atom';

import { useProfileSkillsQuery } from './use-profile-skills-query';

export const useUserSkillsAtomSyncer = () => {
  const { isAuthenticated } = useAuthContext();
  const setUserSkills = useSetAtom(userSkillsAtom);
  const { data: userSkills } = useProfileSkillsQuery();

  useEffect(() => {
    if (!isAuthenticated) {
      return setUserSkills([]);
    }

    if (userSkills) {
      setUserSkills(userSkills);
    }
  }, [isAuthenticated, setUserSkills, userSkills]);
};
