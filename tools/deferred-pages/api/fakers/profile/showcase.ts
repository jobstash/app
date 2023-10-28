import type { NextApiRequest, NextApiResponse } from 'next';

import { faker } from '@faker-js/faker';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await new Promise((r) =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(r, faker.number.int({ min: 500, max: 4000 })),
  );

  return res.status(200).send({
    success: true,
    message: 'Profile skills retrieved successfully',
    data: [
      ...Array.from({ length: faker.number.int({ min: 1, max: 2 }) }).map(
        () => ({
          label: faker.word.noun(),
          url: faker.internet.url(),
        }),
      ),
      { label: 'CV', url: faker.internet.url() },
    ],
  });
}
