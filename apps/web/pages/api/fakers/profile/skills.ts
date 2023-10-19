import type { NextApiRequest, NextApiResponse } from 'next';

import { faker } from '@faker-js/faker';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 2000));

  return res.status(200).send({
    success: true,
    message: 'Profile skills retrieved successfully',
    data: Array.from({ length: faker.number.int({ min: 4, max: 8 }) }).map(
      () => ({
        id: faker.string.uuid(),
        name: faker.word.noun(),
        canTeach: faker.datatype.boolean(),
      }),
    ),
  });
}
