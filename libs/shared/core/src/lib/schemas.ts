import myzod from 'myzod';

export const undefinedSchema = myzod.undefined();

export const messageResponseSchema = myzod
  .object({
    success: myzod.boolean(),
    message: myzod.string().min(1),
  })
  .allowUnknownKeys(true);

export const technologySchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
  normalizedName: myzod.string().min(1),
});

export const allTechnologiesResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(technologySchema),
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
    category: myzod.string().nullable(),
    fundsLost: myzod.number().nullable(),
    issueType: myzod.string().nullable(),
    date: myzod.number().nullable(),
    fundsReturned: myzod.number().nullable(),
  })
  .allowUnknownKeys(true);

export const auditSchema = myzod
  .object({
    id: myzod.string().min(1),
    defiId: myzod.string(),
    name: myzod.string().min(1).nullable(),
    date: myzod.number().nullable(),
    link: myzod.string().nullable(),
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
    logo: myzod.string().min(1).nullable(),
  },
  { allowUnknown: true },
);

export const projectInfoSchema = myzod.object(
  {
    id: myzod.string().min(1),
    name: myzod.string().min(1),
    url: myzod.string().min(1),
    logo: myzod.string().nullable(),

    teamSize: myzod.number().min(1).nullable(),
    category: myzod.string().min(1).nullable(),
    isMainnet: myzod.boolean(),
    tokenSymbol: myzod.string().min(1).nullable(),

    tvl: myzod.number().nullable(),
    monthlyRevenue: myzod.number().nullable(),
    monthlyVolume: myzod.number().nullable(),
    monthlyFees: myzod.number().nullable(),
    monthlyActiveUsers: myzod.number().nullable(),

    chains: myzod.array(chainSchema),
    hacks: myzod.array(hackSchema),
    audits: myzod.array(auditSchema),
  },
  { allowUnknown: true },
);

export const repositoryInfoSchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
  description: myzod.string(),
  timestamp: myzod.number(),
  projectName: myzod.string().nullable(),
  committers: myzod.number().nullable(),
});

export const projectMoreInfoSchema = myzod.object({
  description: myzod.string().min(1),
  githubOrganization: myzod.string().min(1).nullable(),
  twitter: myzod.string().min(1).nullable(),
  discord: myzod.string().min(1).nullable(),
  telegram: myzod.string().min(1).nullable(),
  docs: myzod.string().min(1).nullable(),
});

export const projectCompleteInfoSchema = myzod
  .intersection(projectInfoSchema, projectMoreInfoSchema)
  .allowUnknownKeys(true);

export const mwResponseFieldsSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
});
