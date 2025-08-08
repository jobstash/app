import myzod, { Infer } from 'myzod';

import {
  grantFundingSchema,
  jobsiteSchema,
  messageResponseSchema,
} from '@jobstash/shared/core';

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
    grants: myzod.array(grantFundingSchema),
    twitters: myzod.array(myzod.string()),
    docs: myzod.array(myzod.string()),
    //
    // communities: myzod.array(myzod.string()),
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
    //
    // grants: myzod.array(myzod.string()),
    //
    // communities: myzod.array(myzod.string()),
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

export const managedOrgFormStateSchema = myzod.object({
  orgId: myzod.string(),
  name: myzod.string(),
  location: myzod.string(),
  logoUrl: myzod.string(),
  description: myzod.string(),
  summary: myzod.string(),
  headcountEstimate: myzod.string(),
  website: myzod.string(),
  aliases: myzod.string(),
  twitter: myzod.string(),
  github: myzod.string(),
  discord: myzod.string(),
  docs: myzod.string(),
  telegram: myzod.string(),
  //
  // grants: myzod.string(),
  //
  // communities: myzod.string(),
  jobsites: myzod.array(jobsiteSchema),
  detectedJobsites: myzod.array(jobsiteSchema),
  projects: myzod.string(),
  //
  // altName: myzod.string(),
  // rawWebsite: myzod.string(),
});

export type ManagedOrgFormState = Infer<typeof managedOrgFormStateSchema>;

export const dataToFormState = (data: ManagedOrg): ManagedOrgFormState => ({
  orgId: data.orgId,
  name: data.name ?? '',
  location: data.location ?? '',
  logoUrl: data.logoUrl ?? '',
  description: data.description ?? '',
  summary: data.summary ?? '',
  headcountEstimate: data.headcountEstimate?.toString() ?? '',
  aliases: data.aliases.join(', '),
  website: data.websites.join(', '),
  discord: data.discords.join(', '),
  telegram: data.telegrams.join(', '),
  github: data.githubs.join(', '),
  docs: data.docs.join(', '),
  twitter: data.twitters.join(', '),
  //
  // grants: data.grants.join(', '),
  //
  // communities: data.communities.join(', '),
  jobsites: data.jobsites,
  detectedJobsites: data.detectedJobsites,
  projects: data.projects.map((p) => p.id).join(', '),
  //
  // altName: data.altName ?? '',
  // rawWebsite: data.rawWebsites.join(', '),
});

type Payload = Omit<ManagedOrg, 'projects'> & { projects: string[] };

const parseList = (value: string) =>
  value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

export const formStateToOrgPayload = (
  formState: ManagedOrgFormState,
): Payload => ({
  orgId: formState.orgId,
  name: formState.name,
  location: formState.location,
  logoUrl: formState.logoUrl || null,
  description: formState.description,
  summary: formState.summary,
  headcountEstimate: Number(formState.headcountEstimate),
  aliases: parseList(formState.aliases),
  websites: parseList(formState.website),
  discords: parseList(formState.discord),
  telegrams: parseList(formState.telegram),
  githubs: parseList(formState.github),
  docs: parseList(formState.docs),
  twitters: parseList(formState.twitter),
  //
  // grants: parseList(formState.grants),
  //
  // communities: parseList(formState.communities),
  jobsites: formState.jobsites,
  detectedJobsites: formState.detectedJobsites,
  projects: parseList(formState.projects),
});

export const managedOrgResponseSchema = myzod.intersection(
  messageResponseSchema,
  myzod.object({
    data: managedOrgSchema,
  }),
);

export type ManagedOrgResponse = Infer<typeof managedOrgResponseSchema>;
