import myzod, { Infer } from 'myzod';

const jobsiteSchema = myzod.object({
  url: myzod.string(),
  type: myzod.string(),
});

export const managedOrgSchema = myzod.object({
  orgId: myzod.string(),
  name: myzod.string().nullable(),
  website: myzod.array(myzod.string()),
  rawWebsite: myzod.array(myzod.string()),
  logoUrl: myzod.string().nullable(),
  description: myzod.string().nullable(),
  summary: myzod.string().nullable(),
  headcountEstimate: myzod.number().nullable(),
  location: myzod.string().nullable(),
  altName: myzod.string().nullable(),
  aliases: myzod.array(myzod.string()),
  twitter: myzod.array(myzod.string()),
  github: myzod.array(myzod.string()),
  discord: myzod.array(myzod.string()),
  docs: myzod.array(myzod.string()),
  telegram: myzod.array(myzod.string()),
  grants: myzod.array(myzod.string()),
  communities: myzod.array(myzod.string()),
  jobsites: myzod.array(jobsiteSchema),
  detectedJobsites: myzod.array(jobsiteSchema),
  //
  // updatedTimestamp: myzod.number().nullable(),
});

export type ManagedOrg = Infer<typeof managedOrgSchema>;
