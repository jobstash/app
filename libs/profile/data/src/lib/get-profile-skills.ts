import {
  MW_URL,
  UserSkillResponse,
  userSkillResponseSchema,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileSkills = async () => {
  const url = `${MW_URL}/profile/skills`;

  const options = {
    responseSchema: userSkillResponseSchema,
    sentryLabel: `getProfileSkills`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<UserSkillResponse>(url, options);

  return response.data;
};
