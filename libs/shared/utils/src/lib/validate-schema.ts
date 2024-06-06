import myzod, { type Type } from 'myzod';

import {
  ERR_INTERNAL,
  SENTRY_SCHEMA_VALIDATION_ERROR,
  SESSION_STORAGE_KEYS,
} from '@jobstash/shared/core';

import { getSessionStorageValue } from './get-storage-value';
import { sentryMessage } from './sentry-message';

export const validateSchema = <T>(
  data: unknown,
  schema: Type<T>,
  sentryLabel?: string,
) => {
  const result = schema.try(data);
  if (result instanceof myzod.ValidationError) {
    sentryMessage(
      `${
        sentryLabel ? `"${sentryLabel}" ` : ''
      }${SENTRY_SCHEMA_VALIDATION_ERROR}: ${result.message}`,
      JSON.stringify(data),
    );

    // Check if it's initial reload. Throw error on error after reload;
    const reloadValue = getSessionStorageValue(
      SESSION_STORAGE_KEYS.SCHEMA_VALIDATION_RELOAD,
    );

    if (!reloadValue && typeof window !== 'undefined') {
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.SCHEMA_VALIDATION_RELOAD,
        'true',
      );
      window.location.reload();
    }

    throw new Error(ERR_INTERNAL);
  }

  return result;
};
