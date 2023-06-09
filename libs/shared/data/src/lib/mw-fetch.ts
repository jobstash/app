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
  sentryLabel: string;
  responseSchema?: Type<R>;
  method?: 'GET' | 'POST';
  payload?: P;
  payloadSchema?: Type<P>;
  credentials?: RequestCredentials;
  mode?: RequestMode;
  headers?: Record<string, string>;
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
    headers,
  } = options;

  const validatedPayload = validateSchema(payload, payloadSchema, sentryLabel);
  const { url, body } = createFetchDeets(reqUrl, method, validatedPayload);

  const res = await fetch(url, {
    method,
    body,
    credentials,
    mode,
    headers,
  });

  if (!res.ok) {
    sentryMessage(
      `${sentryLabel}: ${SENTRY_MW_NON_200_RESPONSE}`,
      JSON.stringify({ status: res.status, statusText: res.statusText }),
    );
    throw new Error(ERR_INTERNAL);
  }

  const isJsonResponse = (res.headers.get('content-type') ?? '').includes(
    'application/json',
  );

  let data: R | null = null;
  try {
    if (isJsonResponse) {
      data = await res.json();
    }
  } catch {
    sentryMessage(sentryLabel, SENTRY_MW_INVALID_JSON_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  if (responseSchema && isJsonResponse) {
    return validateSchema(data, responseSchema, sentryLabel);
  }

  return null as R;
};
