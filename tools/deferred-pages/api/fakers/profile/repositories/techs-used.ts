import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 3000));

  const { method } = req;

  if (method?.toLowerCase() === 'post') {
    return res.status(200).send({
      msg: 'OK',
    });
  }

  return res.status(200).send({
    msg: 'OK',
  });
}
