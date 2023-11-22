import type { NextApiRequest, NextApiResponse } from 'next';

import { faker } from '@faker-js/faker';

import { ProfileOrgReview } from '@jobstash/profile/core';

const currencies = ['USD', 'EUR'];
const tokens = ['BTC', 'ETH', 'USDT', 'BNB', 'XRP', 'USDC'];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query;

  const pageNum = Number(page);

  const data: ProfileOrgReview[] = [
    {
      org: {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        orgId: faker.number.int().toString(),
        summary: faker.lorem.paragraph({ min: 1, max: 2 }),
        location: `${faker.location.state({
          abbreviated: true,
        })}, ${faker.location.country()}`,
        description: faker.lorem.paragraph({ min: 2, max: 5 }),
        logoUrl: faker.image.urlLoremFlickr({ category: 'business' }),
        headcountEstimate: faker.number.int({ min: 1, max: 100 }),
        createdTimestamp: faker.datatype.boolean()
          ? faker.date.recent().getTime()
          : null,
        updatedTimestamp: faker.datatype.boolean()
          ? faker.date.recent().getTime()
          : null,
        discord: faker.datatype.boolean() ? faker.internet.url() : null,
        website: faker.internet.url(),
        telegram: faker.datatype.boolean() ? faker.internet.url() : null,
        github: faker.datatype.boolean() ? faker.internet.url() : null,
        alias: faker.datatype.boolean() ? faker.commerce.productName() : null,
        docs: faker.datatype.boolean() ? faker.internet.url() : null,
        twitter: faker.datatype.boolean() ? faker.internet.url() : null,
      },
      membershipStatus: 'Previous Commiter',
      startDate: faker.date.recent().getTime(),
      endDate: faker.date.recent().getTime(),
      reviewedTimestamp: faker.date.recent().getTime(),
      commitCount: faker.number.int({ min: 1, max: 300 }),
      salary: {
        //
        // selectedCurrency: null,
        // amount: null,
        selectedCurrency: faker.helpers.arrayElement(currencies),
        amount: faker.number.int({ min: 40_000, max: 200_000 }),
        offersTokenAllocation: faker.datatype.boolean(),
      },
      rating: {
        //
        // management: faker.number.int({ min: 1, max: 5 }),
        // careerGrowth: faker.number.int({ min: 1, max: 5 }),
        // benefits: faker.number.int({ min: 1, max: 5 }),
        // workLifeBalance: faker.number.int({ min: 1, max: 5 }),
        // cultureValues: faker.number.int({ min: 1, max: 5 }),
        // diversityInclusion: faker.number.int({ min: 1, max: 5 }),
        // interviewProcess: faker.number.int({ min: 1, max: 5 }),
        management: null,
        careerGrowth: null,
        benefits: null,
        workLifeBalance: null,
        cultureValues: null,
        diversityInclusion: null,
        interviewProcess: null,
      },
      review: {
        //
        // headline: null,
        // pros: null,
        // cons: null,
        headline: faker.company.catchPhrase(),
        pros: faker.lorem.paragraph({ min: 2, max: 5 }),
        cons: faker.lorem.paragraph({ min: 2, max: 5 }),
      },
    },
  ];

  return res.status(200).send({
    page: pageNum > 2 ? -1 : pageNum + 1,
    count: 1,
    total: 1,
    data,
  });
}
