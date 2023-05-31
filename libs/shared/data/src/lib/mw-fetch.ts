import { type Type } from 'myzod';

import {
  ERR_INTERNAL,
  ERR_OFFLINE,
  SENTRY_MW_INVALID_JSON_RESPONSE,
  SENTRY_MW_NON_200_RESPONSE,
  type Undefined,
  undefinedSchema,
} from '@jobstash/shared/core';
import {
  createFetchDeets,
  sentryMessage,
  validateSchema,
} from '@jobstash/shared/utils';

interface MwFetchOptions<R, P> {
  responseSchema: Type<R>;
  sentryLabel: string;
  method?: 'GET' | 'POST';
  payload?: P;
  payloadSchema?: Type<P>;
  credentials?: RequestCredentials;
  mode?: RequestMode;
}

export const mwFetch = async <R, P = Undefined>(
  reqUrl: string,
  options: MwFetchOptions<R, P>,
): Promise<R> => {
  if (typeof window !== 'undefined' && !window.navigator.onLine) {
    throw new Error(ERR_OFFLINE);
  }

  const {
    method = 'GET',
    sentryLabel,
    responseSchema,
    payload,
    payloadSchema = undefinedSchema,
    credentials,
    mode,
  } = options;

  const validatedPayload = validateSchema(payload, payloadSchema);
  const { url, body } = createFetchDeets(reqUrl, method, validatedPayload);

  const res = await fetch(url, {
    method,
    body,
    credentials,
    mode,
  });

  if (!res.ok) {
    sentryMessage(
      `${sentryLabel}: ${SENTRY_MW_NON_200_RESPONSE}`,
      JSON.stringify({ status: res.status, statusText: res.statusText }),
    );
    throw new Error(ERR_INTERNAL);
  }

  let data: R;
  try {
    data = await res.json();
  } catch {
    sentryMessage(sentryLabel, SENTRY_MW_INVALID_JSON_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  return validateSchema(data, responseSchema);
};
