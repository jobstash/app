import {
  type MessageResponse,
  messageResponseSchema,
  MW_URL,
  UserSkillsPayload,
  userSkillsPayloadSchema,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postProfileSkills = async (payload: UserSkillsPayload) => {
  const url = `${MW_URL}/profile/skills`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `postProfileSkills`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: userSkillsPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    UserSkillsPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};
