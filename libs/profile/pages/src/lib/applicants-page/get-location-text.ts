import { JobApplicant } from '@jobstash/jobs/core';

export const getLocationText = (location: JobApplicant['user']['location']) => {
  const { city, country } = location;

  return !city && !country
    ? undefined
    : `${city ? `${city}` : ''}${city && country ? ', ' : ' '}${country ?? ''}`;
};
