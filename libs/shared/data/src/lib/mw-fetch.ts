/* eslint-disable complexity */
import myzod, { type Type } from 'myzod';

import {
  COMMUNITY_HEADER_KEY,
  ERR_INTERNAL,
  ERR_NOT_FOUND,
  ERR_OFFLINE,
  LOCAL_STORAGE_KEYS,
  messageResponseSchema,
  SENTRY_MW_INVALID_JSON_RESPONSE,
  SENTRY_MW_NON_200_RESPONSE,
  type Undefined,
  undefinedSchema,
} from '@jobstash/shared/core';
import {
  createFetchDeets,
  getCommunityHeader,
  sentryMessage,
  validatePayload,
  validateSchema,
} from '@jobstash/shared/utils';

interface MwFetchOptions<R, P> {
  sentryLabel: string;
  responseSchema?: Type<R>;
  method?: 'GET' | 'POST' | 'DELETE';
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

  const validatedPayload = validatePayload(payload, payloadSchema);

  const { url, body } = createFetchDeets(reqUrl, method, validatedPayload);

  // Only add client ecosystem header if ecosystem is not set in options
  const headerOptionKeys = new Set(Object.keys(headers ?? {}));
  const hasCommunityHeader = headerOptionKeys.has(COMMUNITY_HEADER_KEY);
  const clientCommunityHeader = hasCommunityHeader ? {} : getCommunityHeader();

  // Get token from local storage
  const hasAuthHeader = headerOptionKeys.has('Authorization');
  const token =
    typeof window === 'undefined'
      ? null
      : localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_JWT);
  const authHeader =
    token && !hasAuthHeader ? { Authorization: `Bearer ${token}` } : undefined;

  const res = await fetch(url, {
    method,
    body,
    credentials,
    mode,
    headers: {
      ...headers,
      ...clientCommunityHeader,
      ...authHeader,
    },
    cache: 'no-cache',
  });

  if (!res.ok) {
    sentryMessage(
      `${sentryLabel}: ${SENTRY_MW_NON_200_RESPONSE}`,
      JSON.stringify({ status: res.status, statusText: res.statusText }),
    );

    if (res.status === 404) {
      throw new Error(ERR_NOT_FOUND);
    }

    if (res.status === 400) {
      const data = await res.json();
      throw new Error(data.message ?? ERR_INTERNAL);
    }

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

  // Try to parse success-message fields if given then throw error-message if not successful
  if (data && typeof data === 'object') {
    const result = messageResponseSchema.try(data);
    const isMessageResponse = !(result instanceof myzod.ValidationError);
    if (isMessageResponse && !result.success) {
      throw new Error(result.message);
    }
  }

  if (responseSchema && isJsonResponse) {
    return validateSchema(data, responseSchema, sentryLabel);
  }

  return null as R;
};
