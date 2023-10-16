/* eslint-disable complexity */
import type { NextApiRequest, NextApiResponse } from 'next';

import { faker } from '@faker-js/faker';

const currencies = ['USD', 'EUR', 'GBP'];
const tokens = ['BTC', 'ETH', 'USDT', 'BNB', 'XRP', 'USDC'];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query;

  const pageNum = Number(page);

  return res.status(200).send({
    page: pageNum > 2 ? -1 : pageNum + 1,
    count: 3,
    total: 9,
    data: [
      {
        org: {
          id: faker.string.uuid(),
          orgId: faker.number.int().toString(),
          website: faker.internet.url(),
          name: faker.commerce.productName(),
          location: `${faker.location.state({
            abbreviated: true,
          })}, ${faker.location.country()}`,
          description: faker.lorem.paragraph({ min: 2, max: 5 }),
          summary: faker.lorem.paragraph({ min: 1, max: 2 }),
          alias: faker.datatype.boolean() ? faker.commerce.productName() : null,
          jobsiteLink: faker.datatype.boolean() ? faker.internet.url() : null,
          createdTimestamp: faker.datatype.boolean()
            ? faker.date.recent().getTime()
            : null,
          updatedTimestamp: faker.datatype.boolean()
            ? faker.date.recent().getTime()
            : null,
          github: faker.datatype.boolean() ? faker.internet.url() : null,
          twitter: faker.datatype.boolean() ? faker.internet.url() : null,
          discord: faker.datatype.boolean() ? faker.internet.url() : null,
          docs: faker.datatype.boolean() ? faker.internet.url() : null,
          telegram: faker.datatype.boolean() ? faker.internet.url() : null,
          headcountEstimate: faker.number.int({ min: 1, max: 100 }),
          logoUrl: faker.image.urlLoremFlickr({ category: 'business' }),
        },
        membershipStatus: 'Previous Commiter',
        startDate: faker.date.recent().getTime(),
        endDate: faker.date.recent().getTime(),
        commitCount: faker.number.int({ min: 1, max: 300 }),
        salary: {
          currency: {
            value: faker.helpers.arrayElement(currencies),
            options: currencies,
          },
          amount: faker.number.int({ min: 40_000, max: 200_000 }),
          token: {
            value: faker.helpers.arrayElement(tokens),
            options: tokens,
            noAllocation: faker.datatype.boolean(),
          },
        },
        rating: {
          management: faker.number.int({ min: 1, max: 5 }),
          careerGrowth: faker.number.int({ min: 1, max: 5 }),
          benefits: faker.number.int({ min: 1, max: 5 }),
          workLifeBalance: faker.number.int({ min: 1, max: 5 }),
          cultureValues: faker.number.int({ min: 1, max: 5 }),
          diversityInclusion: faker.number.int({ min: 1, max: 5 }),
          interviewProcess: faker.number.int({ min: 1, max: 5 }),
        },
        review: {
          headline: faker.company.catchPhrase(),
          pros: faker.lorem.paragraph({ min: 2, max: 5 }),
          cons: faker.lorem.paragraph({ min: 2, max: 5 }),
        },
      },
      {
        org: {
          id: faker.string.uuid(),
          orgId: faker.number.int().toString(),
          website: faker.internet.url(),
          name: faker.commerce.productName(),
          location: `${faker.location.state({
            abbreviated: true,
          })}, ${faker.location.country()}`,
          description: faker.lorem.paragraph({ min: 2, max: 5 }),
          summary: faker.lorem.paragraph({ min: 1, max: 2 }),
          alias: faker.datatype.boolean() ? faker.commerce.productName() : null,
          jobsiteLink: faker.datatype.boolean() ? faker.internet.url() : null,
          createdTimestamp: faker.datatype.boolean()
            ? faker.date.recent().getTime()
            : null,
          updatedTimestamp: faker.datatype.boolean()
            ? faker.date.recent().getTime()
            : null,
          github: faker.datatype.boolean() ? faker.internet.url() : null,
          twitter: faker.datatype.boolean() ? faker.internet.url() : null,
          discord: faker.datatype.boolean() ? faker.internet.url() : null,
          docs: faker.datatype.boolean() ? faker.internet.url() : null,
          telegram: faker.datatype.boolean() ? faker.internet.url() : null,
          headcountEstimate: faker.number.int({ min: 1, max: 100 }),
          logoUrl: faker.image.urlLoremFlickr({ category: 'business' }),
        },
        membershipStatus: 'Previous Commiter',
        startDate: faker.date.recent().getTime(),
        endDate: faker.date.recent().getTime(),
        commitCount: faker.number.int({ min: 1, max: 300 }),
        salary: {
          currency: {
            value: faker.helpers.arrayElement(currencies),
            options: currencies,
          },
          amount: faker.number.int({ min: 40_000, max: 200_000 }),
          token: {
            value: faker.helpers.arrayElement(tokens),
            options: tokens,
            noAllocation: faker.datatype.boolean(),
          },
        },
        rating: {
          management: faker.number.int({ min: 1, max: 5 }),
          careerGrowth: faker.number.int({ min: 1, max: 5 }),
          benefits: faker.number.int({ min: 1, max: 5 }),
          workLifeBalance: faker.number.int({ min: 1, max: 5 }),
          cultureValues: faker.number.int({ min: 1, max: 5 }),
          diversityInclusion: faker.number.int({ min: 1, max: 5 }),
          interviewProcess: faker.number.int({ min: 1, max: 5 }),
        },
        review: {
          headline: faker.company.catchPhrase(),
          pros: faker.lorem.paragraph({ min: 2, max: 5 }),
          cons: faker.lorem.paragraph({ min: 2, max: 5 }),
        },
      },
      {
        org: {
          id: faker.string.uuid(),
          orgId: faker.number.int().toString(),
          website: faker.internet.url(),
          name: faker.commerce.productName(),
          location: `${faker.location.state({
            abbreviated: true,
          })}, ${faker.location.country()}`,
          description: faker.lorem.paragraph({ min: 2, max: 5 }),
          summary: faker.lorem.paragraph({ min: 1, max: 2 }),
          alias: faker.datatype.boolean() ? faker.commerce.productName() : null,
          jobsiteLink: faker.datatype.boolean() ? faker.internet.url() : null,
          createdTimestamp: faker.datatype.boolean()
            ? faker.date.recent().getTime()
            : null,
          updatedTimestamp: faker.datatype.boolean()
            ? faker.date.recent().getTime()
            : null,
          github: faker.datatype.boolean() ? faker.internet.url() : null,
          twitter: faker.datatype.boolean() ? faker.internet.url() : null,
          discord: faker.datatype.boolean() ? faker.internet.url() : null,
          docs: faker.datatype.boolean() ? faker.internet.url() : null,
          telegram: faker.datatype.boolean() ? faker.internet.url() : null,
          headcountEstimate: faker.number.int({ min: 1, max: 100 }),
          logoUrl: faker.image.urlLoremFlickr({ category: 'business' }),
        },
        membershipStatus: 'Previous Commiter',
        startDate: faker.date.recent().getTime(),
        endDate: faker.date.recent().getTime(),
        commitCount: faker.number.int({ min: 1, max: 300 }),
        salary: {
          currency: {
            value: faker.helpers.arrayElement(currencies),
            options: currencies,
          },
          amount: faker.number.int({ min: 40_000, max: 200_000 }),
          token: {
            value: faker.helpers.arrayElement(tokens),
            options: tokens,
            noAllocation: faker.datatype.boolean(),
          },
        },
        rating: {
          management: faker.number.int({ min: 1, max: 5 }),
          careerGrowth: faker.number.int({ min: 1, max: 5 }),
          benefits: faker.number.int({ min: 1, max: 5 }),
          workLifeBalance: faker.number.int({ min: 1, max: 5 }),
          cultureValues: faker.number.int({ min: 1, max: 5 }),
          diversityInclusion: faker.number.int({ min: 1, max: 5 }),
          interviewProcess: faker.number.int({ min: 1, max: 5 }),
        },
        review: {
          headline: faker.company.catchPhrase(),
          pros: faker.lorem.paragraph({ min: 2, max: 5 }),
          cons: faker.lorem.paragraph({ min: 2, max: 5 }),
        },
      },
    ],
  });
}
