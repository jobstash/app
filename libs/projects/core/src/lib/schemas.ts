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
    logo: myzod.string().nullable(),
    tvl: myzod.number().nullable(),
    monthlyRevenue: myzod.number().nullable(),
    monthlyVolume: myzod.number().nullable(),
    monthlyFees: myzod.number().nullable(),
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
