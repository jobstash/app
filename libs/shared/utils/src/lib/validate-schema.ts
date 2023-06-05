import myzod, { type Type } from 'myzod';

import {
  ERR_INTERNAL,
  SENTRY_SCHEMA_VALIDATION_ERROR,
} from '@jobstash/shared/core';

import { sentryMessage } from './sentry-message';

export const validateSchema = <T>(data: unknown, schema: Type<T>) => {
  const result = schema.try(data);
  if (result instanceof myzod.ValidationError) {
    sentryMessage(
      `${SENTRY_SCHEMA_VALIDATION_ERROR}: ${result.message}`,
      JSON.stringify(data),
    );

    //
    // console.log(
    //   `${SENTRY_SCHEMA_VALIDATION_ERROR}: ${result.message}`,
    //   JSON.stringify(data),
    // );

    throw new Error(ERR_INTERNAL);
  }

  return result;
};
