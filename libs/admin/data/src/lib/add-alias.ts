import { AddAliasPayload, addAliasPayloadSchema } from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const addAlias = async (payload: AddAliasPayload) => {
  //
  // const url = `${MW_URL}/add-alias`;

  // const options = {
  //   method: 'POST' as const,
  //   responseSchema: messageResponseSchema,
  //   sentryLabel: `addAlias`,
  //   credentials: 'include' as RequestCredentials,
  //   mode: 'cors' as RequestMode,
  //   payload,
  //   payloadSchema: addAliasPayloadSchema,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };

  // const { success, message } = await mwFetch<MessageResponse, AddAliasPayload>(
  //   url,
  //   options,
  // );

  // if (!success) throw new Error(message);

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 3000));

  throw new Error('Middlware endpoint [WIP]');
};
