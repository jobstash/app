import type { NextApiRequest, NextApiResponse } from 'next';

import { faker } from '@faker-js/faker';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method?.toLowerCase() === 'get') {
    return res.status(200).json({
      avatar: faker.image.avatar(),
      username: faker.internet.userName(),
      availableForWork: faker.datatype.boolean(),
      contact: {
        options: ['Email', 'Phone', 'Github'],
        preferred: 'Email',
        value: faker.internet.email(),
      },
    });
  }

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 3000));

  return res.status(200).send({
    msg: 'OK',
  });
}
