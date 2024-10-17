import myzod, { Infer } from 'myzod';

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

export const orgUpdatePayloadSchema = myzod.object({
  logoUrl: myzod.string().optional(),
  name: myzod.string().optional(),
  description: myzod.string().optional(),
  summary: myzod.string().optional(),
  headcountEstimate: myzod.number().optional(),
  location: myzod.string().optional(),
  aliases: myzod.array(myzod.string()).optional(),
  website: myzod.array(myzod.string()).optional(),
  twitter: myzod.array(myzod.string()).optional(),
  github: myzod.array(myzod.string()).optional(),
  discord: myzod.array(myzod.string()).optional(),
  docs: myzod.array(myzod.string()).optional(),
  telegram: myzod.array(myzod.string()).optional(),
  grants: myzod.array(myzod.string()).optional(),
  projects: myzod.array(myzod.string()).optional(),
  communities: myzod.array(myzod.string()).optional(),
  jobsites: jobsitePayloadSchema.optional(),
  detectedJobsites: jobsitePayloadSchema.optional(),
});
export type OrgUpdatePayload = Infer<typeof orgUpdatePayloadSchema>;

export const jobsiteActivatePayloadSchema = myzod.object({
  orgId: myzod.string(),
  jobsiteIds: myzod.array(myzod.string()),
});

export type JobsiteActivatePayload = Infer<typeof jobsiteActivatePayloadSchema>;
