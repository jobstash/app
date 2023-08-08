import type { NextApiRequest, NextApiResponse } from 'next';

import { faker } from '@faker-js/faker';

import { slugify } from '@jobstash/shared/utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const technologies = faker.helpers
    .uniqueArray(faker.word.sample, faker.number.int({ min: 20, max: 100 }))
    .map((name) => ({
      id: faker.string.uuid(),
      name,
      normalizedName: slugify(name),
    }));

  return res.status(200).json({
    technologies,
  });
}
