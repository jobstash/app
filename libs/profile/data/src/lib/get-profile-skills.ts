import {
  MW_URL,
  UserSkillResponse,
  userSkillResponseSchema,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileSkills = async () => {
  //
  // return [
  //   {
  //     id: '1f8bf2f2-314d-486d-852c-5b1eb7ff7aa5',
  //     name: 'Digital Assets',
  //     canTeach: true,
  //   },
  //   {
  //     id: 'fde5c3ac-6d0c-41ab-a81e-d9d1169cc70c',
  //     name: 'Time management',
  //     canTeach: false,
  //   },
  //   {
  //     id: '112245ff-f925-4ab7-88af-493f23558255',
  //     name: 'fin-tech',
  //     canTeach: true,
  //   },
  // ];

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
