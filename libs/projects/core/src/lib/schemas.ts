import myzod from 'myzod';

import {
  auditSchema,
  categorySchema,
  chainSchema,
  hackSchema,
} from '@jobstash/shared/core';

export const projectSchema = myzod.object(
  {
    id: myzod.string().min(1),
    name: myzod.string().min(1),
    description: myzod.string().min(1),
    url: myzod.string().min(1),

    // Should be not empty: require min = 1
    // logo: myzod.string().min(1),
    logo: myzod.string().nullable(),

    // Should not be zero - might as well be null if value is zero
    // tvl: myzod.number().min(1).nullable(),
    tvl: myzod.number().nullable(),

    // Should not be zero - might as well be null if value is zero
    // monthlyRevenue: myzod.number().min(1).nullable(),
    monthlyRevenue: myzod.number().nullable(),

    // Should not be zero - might as well be null if value is zero
    // monthlyVolume: myzod.number().min(1).nullable(),
    monthlyVolume: myzod.number().nullable(),

    // Should not be zero - might as well be null if value is zero
    // monthlyFees: myzod.number().min(1).nullable(),
    monthlyFees: myzod.number().nullable(),

    // Should not be zero - might as well be null if value is zero
    // monthlyActiveUsers: myzod.number().min(1).nullable(),
    monthlyActiveUsers: myzod.number().nullable(),

    teamSize: myzod.number().min(1).nullable(),
    category: myzod.string().min(1).nullable(),
    isMainnet: myzod.boolean(),
    tokenSymbol: myzod.string().min(1).nullable(),

    githubOrganization: myzod.string().min(1).nullable(),
    twitter: myzod.string().min(1).nullable(),
    discord: myzod.string().min(1).nullable(),
    telegram: myzod.string().min(1).nullable(),
    docs: myzod.string().min(1).nullable(),

    categories: myzod.array(categorySchema),
    chains: myzod.array(chainSchema),
    hacks: myzod.array(hackSchema),
    audits: myzod.array(auditSchema),
  },
  { allowUnknown: true },
);
