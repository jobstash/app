import myzod from 'myzod';

export const undefinedSchema = myzod.undefined();

export const technologySchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
  normalizedName: myzod.string().min(1),
});

export const investorSchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
});

export const fundingRoundSchema = myzod.object(
  {
    id: myzod.string().min(1),
    date: myzod.number(),
    roundName: myzod.string().min(1).nullable(),
    raisedAmount: myzod.number().nullable(),
  },
  { allowUnknown: true },
);

export const categorySchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
});

export const chainSchema = myzod
  .object({
    id: myzod.string().min(1),
    name: myzod.string().min(1),
  })
  .allowUnknownKeys(true);

export const hackSchema = myzod
  .object({
    id: myzod.string().min(1),
    defiId: myzod.string(),
    category: myzod.string(),
    fundsLost: myzod.number(),
    issueType: myzod.string(),
    date: myzod.number().nullable(),
    description: myzod.string().nullable(),
    fundsReturned: myzod.number().nullable(),
  })
  .allowUnknownKeys(true);

export const auditSchema = myzod
  .object({
    id: myzod.string().min(1),
    name: myzod.string().min(1),
    date: myzod.number().nullable(),
    link: myzod.string().nullable(),
    defiId: myzod.string().nullable(),
    techIssues: myzod.number().nullable().optional(),
  })
  .allowUnknownKeys(true);

export const jobInfoSchema = myzod.object(
  {
    id: myzod.string().min(1),
    shortUUID: myzod.string().min(1),
    jobTitle: myzod.string().min(1),
    jobLocation: myzod.string().min(1).nullable(),
    jobCommitment: myzod.string().min(1).nullable(),
    jobCreatedTimestamp: myzod.number(),
    jobApplyPageUrl: myzod.string().min(1),
    minSalaryRange: myzod.number().nullable(),
    maxSalaryRange: myzod.number().nullable(),
    seniority: myzod.string().min(1).nullable(),
    role: myzod.string().min(1).nullable(),
    benefits: myzod.string().min(1).nullable(),
    team: myzod.string().min(1).nullable(),
    culture: myzod.string().min(1).nullable(),
    offersTokenAllocation: myzod.boolean().nullable(),
    paysInCrypto: myzod.boolean().nullable(),
    salaryCurrency: myzod.string().min(1).nullable(),
  },
  { allowUnknown: true },
);

export const orgInfoSchema = myzod.object(
  {
    id: myzod.string().min(1),
    orgId: myzod.string().min(1),
    url: myzod.string().min(1),
    name: myzod.string().min(1),
    location: myzod.string().min(1),
    description: myzod.string().min(1),
    summary: myzod.string().min(1),
    altName: myzod.string().min(1).nullable(),
    jobsiteLink: myzod.string().min(1).nullable(),
    createdTimestamp: myzod.number().nullable(),
    updatedTimestamp: myzod.number().nullable(),
    github: myzod.string().min(1).nullable(),
    twitter: myzod.string().min(1).nullable(),
    discord: myzod.string().min(1).nullable(),
    docs: myzod.string().min(1).nullable(),
    telegram: myzod.string().min(1).nullable(),
    headCount: myzod.number().nullable(),
  },
  { allowUnknown: true },
);

export const mwResponseFieldsSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
});
