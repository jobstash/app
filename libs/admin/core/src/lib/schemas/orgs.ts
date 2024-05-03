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
    jobCount: myzod.number(),
    discord: myzod.array(myzod.string()),
    website: myzod.array(myzod.string()),
    rawWebsite: myzod.array(myzod.string()),
    telegram: myzod.array(myzod.string()),
    github: myzod.array(myzod.string()),
    aliases: myzod.array(myzod.string()),
    grant: myzod.array(myzod.string()),
    twitter: myzod.array(myzod.string()),
    docs: myzod.array(myzod.string()),
    community: myzod.array(myzod.string()),
    jobsite: myzod.array(
      myzod.object({
        url: myzod.string(),
        type: myzod.string(),
      }),
    ),
    detectedJobsite: myzod.array(
      myzod.object({
        url: myzod.string(),
        type: myzod.string(),
      }),
    ),
    // Projects
    // FundingRoudns
    // Investors
  })
  .allowUnknownKeys(true);
export type OrgItem = Infer<typeof orgItemSchema>;

export const orgWebsiteStatusItemSchema = myzod.object({
  website: myzod.string(),
  status: myzod.literals('alive', 'dead', 'invalid', 'pending'),
  statusCode: myzod.number().optional(),
});
export type OrgWebsiteStatusItem = Infer<typeof orgWebsiteStatusItemSchema>;

export const orgRowItemSchema = myzod.intersection(
  orgItemSchema,
  myzod.object({
    websiteStatus: myzod.array(orgWebsiteStatusItemSchema),
  }),
);
export type OrgRowItem = Infer<typeof orgRowItemSchema>;
