import myzod, { Infer } from 'myzod';

import {
  PairedTermsPayload,
  pairedTermsPayloadSchema,
} from '@jobstash/admin/core';
import { MW_URL, tagSchema } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postPairedTerms = async (payload: PairedTermsPayload) => {
  const url = `${MW_URL}/tags/pair`;

  const options = {
    method: 'POST' as const,
    responseSchema,
    sentryLabel: `postPairedTerms`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: pairedTermsPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    PairedTermsMutationResponse,
    PairedTermsPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

const responseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: myzod.array(tagSchema),
});
type PairedTermsMutationResponse = Infer<typeof responseSchema>;
