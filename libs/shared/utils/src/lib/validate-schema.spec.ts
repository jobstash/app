import myzod from 'myzod';

import {
  ERR_INTERNAL,
  SENTRY_SCHEMA_VALIDATION_ERROR,
} from '@jobstash/shared/core';

import * as sentryMessageModule from './sentry-message';
import { validateSchema } from './validate-schema';

jest.mock('./sentry-message', () => ({
  __esModule: true,
  ...jest.requireActual('./sentry-message'),
}));

describe('validateSchema', () => {
  const testSchema = myzod.object({
    id: myzod.number(),
  });

  test('parse ok', () => {
    const testData = { id: 1 };

    const result = validateSchema(testData, testSchema);

    expect(testData).toStrictEqual(result);
  });

  test('parse error', () => {
    const testData = { id: false };

    const sentrySpy = jest.spyOn(sentryMessageModule, 'sentryMessage');

    expect(() => validateSchema(testData, testSchema)).toThrowError(
      ERR_INTERNAL,
    );

    expect(sentrySpy).toHaveBeenCalledWith(
      `${SENTRY_SCHEMA_VALIDATION_ERROR}: error parsing object at path: "id" - expected type to be number but got boolean`,
      JSON.stringify(testData),
    );
  });
});
