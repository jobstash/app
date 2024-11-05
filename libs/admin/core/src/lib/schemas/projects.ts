import myzod, { Infer } from 'myzod';

import { jobsiteSchema } from '@jobstash/shared/core';

export const projectItemSchema = myzod
  .object({
    id: myzod.string(),
    name: myzod.string(),
    normalizedName: myzod.string(),
    logoUrl: myzod.string().nullable(),
    tvl: myzod.number().nullable().optional(),
    isMainnet: myzod.boolean().nullable().optional(),
    tokenSymbol: myzod.string().nullable().optional(),
    monthlyFees: myzod.number().nullable().optional(),
    monthlyVolume: myzod.number().nullable().optional(),
    monthlyRevenue: myzod.number().nullable().optional(),
    monthlyActiveUsers: myzod.number().nullable().optional(),
    description: myzod.string().nullable().optional(),
    category: myzod.string().nullable(),
    website: myzod.string().nullable(),
    docs: myzod.string().nullable(),
    twitter: myzod.string().nullable(),
    discord: myzod.string().nullable(),
    github: myzod.string().nullable(),
    telegram: myzod.string().nullable(),
    tokenAddress: myzod.string().nullable(),
    defiLlamaId: myzod.string().nullable(),
    defiLlamaSlug: myzod.string().nullable(),
    defiLlamaParent: myzod.string().nullable(),
    aliases: myzod.array(myzod.string()),
    createdTimestamp: myzod.number().nullable(),
    orgIds: myzod.array(myzod.string()),
    updatedTimestamp: myzod.number().nullable(),
    jobsites: myzod.array(jobsiteSchema),
    detectedJobsites: myzod.array(jobsiteSchema),
  })
  .allowUnknownKeys(true);

export type ProjectItem = Infer<typeof projectItemSchema>;

export const updateProjectPayloadSchema = myzod.object({
  name: myzod.string(),
  description: myzod.string().nullable(),
  category: myzod.string().nullable(),
  logo: myzod.string().nullable(),
  isMainnet: myzod.boolean().nullable(),
  tvl: myzod.number().nullable(),
  monthlyFees: myzod.number().nullable(),
  monthlyVolume: myzod.number().nullable(),
  monthlyRevenue: myzod.number().nullable(),
  monthlyActiveUsers: myzod.number().nullable(),
  website: myzod.string().nullable(),
  docs: myzod.string().nullable(),
  twitter: myzod.string().nullable(),
  discord: myzod.string().nullable(),
  github: myzod.string().nullable(),
  telegram: myzod.string().nullable(),
  tokenAddress: myzod.string().nullable(),
  tokenSymbol: myzod.string().nullable(),
  defiLlamaId: myzod.string().nullable(),
  defiLlamaSlug: myzod.string().nullable(),
  defiLlamaParent: myzod.string().nullable(),
  jobsites: myzod.array(jobsiteSchema),
  detectedJobsites: myzod.array(jobsiteSchema),
});

export type UpdateProjectPayload = Infer<typeof updateProjectPayloadSchema>;

const nullable = <T>(value: T) => value || null;

export const dataToProjectPayload = (
  data: ProjectItem,
): UpdateProjectPayload => ({
  name: data.name,
  description: nullable(data.description),
  category: data.category,
  logo: nullable(data.logoUrl),
  isMainnet: nullable(data.isMainnet),
  tvl: nullable(data.tvl),
  monthlyFees: nullable(data.monthlyFees),
  monthlyVolume: nullable(data.monthlyVolume),
  monthlyRevenue: nullable(data.monthlyRevenue),
  monthlyActiveUsers: nullable(data.monthlyActiveUsers),
  website: nullable(data.website),
  docs: nullable(data.docs),
  twitter: nullable(data.twitter),
  discord: nullable(data.discord),
  github: nullable(data.github),
  telegram: nullable(data.telegram),
  tokenAddress: null,
  tokenSymbol: nullable(data.tokenSymbol),
  defiLlamaId: nullable(data.defiLlamaId),
  defiLlamaSlug: nullable(data.defiLlamaSlug),
  defiLlamaParent: nullable(data.defiLlamaParent),
  jobsites: data.jobsites,
  detectedJobsites: data.detectedJobsites,
});

export const sanitizeProjectFormState = (
  formState: UpdateProjectPayload,
): UpdateProjectPayload => ({
  ...formState,
  isMainnet: nullable(formState.isMainnet),
});
