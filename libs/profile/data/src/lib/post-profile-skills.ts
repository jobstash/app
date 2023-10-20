import {
  type ProfileSkillsPayload,
  profileSkillsPayloadSchema,
} from '@jobstash/profile/core';
import {
  type MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postProfileSkills = async (payload: ProfileSkillsPayload) => {
  const url = `${MW_URL}/profile/skills`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `postProfileSkills`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: profileSkillsPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    ProfileSkillsPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};
