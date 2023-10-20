import {
  ProfileSkillResponse,
  profileSkillResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileSkills = async () => {
  const url = `${MW_URL}/profile/skills`;

  const options = {
    responseSchema: profileSkillResponseSchema,
    sentryLabel: `getProfileSkills`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<ProfileSkillResponse>(url, options);

  return response.data;
};
