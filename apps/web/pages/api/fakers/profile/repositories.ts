import { NextApiRequest, NextApiResponse } from 'next';

import { faker } from '@faker-js/faker';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query;

  const pageNum = Number(page);

  return res.status(200).send({
    page: pageNum > 2 ? -1 : pageNum + 1,
    count: 3,
    total: 9,
    data: [
      {
        id: faker.string.uuid(),
        name: `${faker.internet.domainName()}/${faker.git.branch()}`,
        description: faker.lorem.paragraph({ min: 2, max: 5 }),
        timestamp: faker.date.recent().getTime(),
        projectName: faker.git.branch(),
        committers: faker.number.int({ min: 1, max: 30 }),
        org: {
          name: faker.company.name(),
          logo: faker.internet.avatar(),
          url: faker.internet.url(),
        },
        technologies: Array.from({
          length: faker.number.int({ min: 0, max: 8 }),
        })
          .fill(0)
          .map(() => ({
            id: faker.string.uuid(),
            name: faker.hacker.noun(),
            normalizedName: faker.hacker.noun(),
            canTeach: faker.datatype.boolean(),
          })),
        contribution: {
          count: faker.number.int({ min: 10, max: 500 }),
          summary: faker.lorem.paragraph({ min: 2, max: 6 }),
        },
      },
      {
        id: faker.string.uuid(),
        name: `${faker.internet.domainName()}/${faker.git.branch()}`,
        description: faker.lorem.paragraph({ min: 2, max: 5 }),
        timestamp: faker.date.recent().getTime(),
        projectName: faker.git.branch(),
        committers: faker.number.int({ min: 1, max: 30 }),
        org: {
          name: faker.company.name(),
          logo: faker.internet.avatar(),
          url: faker.internet.url(),
        },
        technologies: Array.from({
          length: faker.number.int({ min: 0, max: 8 }),
        })
          .fill(0)
          .map(() => ({
            id: faker.string.uuid(),
            name: faker.hacker.noun(),
            normalizedName: faker.hacker.noun(),
            canTeach: faker.datatype.boolean(),
          })),
        contribution: {
          count: faker.number.int({ min: 10, max: 500 }),
          summary: faker.lorem.paragraph({ min: 2, max: 6 }),
        },
      },
      {
        id: faker.string.uuid(),
        name: `${faker.internet.domainName()}/${faker.git.branch()}`,
        description: faker.lorem.paragraph({ min: 2, max: 5 }),
        timestamp: faker.date.recent().getTime(),
        projectName: faker.git.branch(),
        committers: faker.number.int({ min: 1, max: 30 }),
        org: {
          name: faker.company.name(),
          logo: faker.internet.avatar(),
          url: faker.internet.url(),
        },
        technologies: Array.from({
          length: faker.number.int({ min: 0, max: 8 }),
        })
          .fill(0)
          .map(() => ({
            id: faker.string.uuid(),
            name: faker.hacker.noun(),
            normalizedName: faker.hacker.noun(),
            canTeach: faker.datatype.boolean(),
          })),
        contribution: {
          count: faker.number.int({ min: 10, max: 500 }),
          summary: faker.lorem.paragraph({ min: 2, max: 6 }),
        },
      },
    ],
  });
}
