import myzod, { Infer } from 'myzod';

import { jobsiteSchema } from '@jobstash/shared/core';

export const orgItemSchema = myzod
  .object({
    id: myzod.string(),
    name: myzod.string(),
    orgId: myzod.string(),
    summary: myzod.string(),
    location: myzod.string(),
    description: myzod.string(),
    logoUrl: myzod.string().nullable(),
    headcountEstimate: myzod.number().nullable(),
    createdTimestamp: myzod.number().nullable(),
    updatedTimestamp: myzod.number().nullable(),
    discords: myzod.array(myzod.string()),
    websites: myzod.array(myzod.string()),
    telegrams: myzod.array(myzod.string()),
    githubs: myzod.array(myzod.string()),
    aliases: myzod.array(myzod.string()),
    grants: myzod.array(myzod.string()),
    twitters: myzod.array(myzod.string()),
    docs: myzod.array(myzod.string()),
    communities: myzod.array(myzod.string()),
    jobsites: myzod.array(
      myzod.object({
        id: myzod.string(),
        url: myzod.string(),
        type: myzod.string(),
      }),
    ),
    detectedJobsites: myzod.array(
      myzod.object({
        id: myzod.string(),
        url: myzod.string(),
        type: myzod.string(),
      }),
    ),
    projects: myzod.array(
      myzod
        .object({
          id: myzod.string(),
          name: myzod.string(),
        })
        .allowUnknownKeys(true),
    ),
    // Projects
    // FundingRoudns
    // Investors
  })
  .allowUnknownKeys(true);
export type OrgItem = Infer<typeof orgItemSchema>;

export const urlStatusSchema = myzod.object({
  url: myzod.string(),
  status: myzod.literals('alive', 'dead', 'invalid', 'pending'),
  statusCode: myzod.number().optional(),
});
export type UrlStatus = Infer<typeof urlStatusSchema>;

const jobsitePayloadSchema = myzod.array(
  myzod.object({
    id: myzod.string(),
    url: myzod.string(),
    type: myzod.string(),
  }),
);

export type JobsitePayload = Infer<typeof jobsitePayloadSchema>;

export const jobsiteActivatePayloadSchema = myzod.object({
  orgId: myzod.string(),
  jobsiteIds: myzod.array(myzod.string()),
});

export type JobsiteActivatePayload = Infer<typeof jobsiteActivatePayloadSchema>;

export const managedOrgSchema = myzod
  .object({
    orgId: myzod.string(),
    name: myzod.string().nullable(),
    location: myzod.string().nullable(),
    logoUrl: myzod.string().nullable(),
    description: myzod.string().nullable(),
    summary: myzod.string().nullable(),
    headcountEstimate: myzod.number().nullable(),
    websites: myzod.array(myzod.string()),
    aliases: myzod.array(myzod.string()),
    twitters: myzod.array(myzod.string()),
    githubs: myzod.array(myzod.string()),
    discords: myzod.array(myzod.string()),
    docs: myzod.array(myzod.string()),
    telegrams: myzod.array(myzod.string()),
    grants: myzod.array(myzod.string()),
    communities: myzod.array(myzod.string()),
    jobsites: myzod.array(jobsiteSchema),
    detectedJobsites: myzod.array(jobsiteSchema),
    projects: myzod.array(
      myzod
        .object({
          id: myzod.string(),
          name: myzod.string(),
        })
        .allowUnknownKeys(true),
    ),
    //
    // altName: myzod.string().nullable(),
    // rawWebsites: myzod.array(myzod.string()),
  })
  .allowUnknownKeys(true);

export type ManagedOrg = Infer<typeof managedOrgSchema>;

export const managedOrgPayloadSchema = myzod.intersection(
  myzod.omit(managedOrgSchema, ['projects']),
  myzod.object({
    projects: myzod.array(myzod.string()),
  }),
);

export type ManagedOrgPayload = Infer<typeof managedOrgPayloadSchema>;

export const authorizeOrgAffiliationPayloadSchema = myzod.object({
  wallet: myzod.string(),
  verdict: myzod.literals('approve', 'reject'),
  orgId: myzod.string(),
});

export type AuthorizeOrgAffiliationPayload = Infer<
  typeof authorizeOrgAffiliationPayloadSchema
>;
