import myzod from 'myzod';

export const undefinedSchema = myzod.undefined();

export const messageResponseSchema = myzod
  .object({
    success: myzod.boolean(),
    message: myzod.string().min(1),
  })
  .allowUnknownKeys(true);

export const tagSchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
  normalizedName: myzod.string().min(1),
});

export const allTagsResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(tagSchema),
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
    logo: myzod.string().min(1).nullable(),
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

export const jobCardSetSchema = myzod.object({
  seniority: myzod.string().min(1).nullable(),
  minimumSalary: myzod.number().nullable(),
  maximumSalary: myzod.number().nullable(),
  salary: myzod.number().nullable(), // TODO: maybe unused
  location: myzod.string().min(1).nullable(),
  locationType: myzod.string().min(1).nullable(),
  commitment: myzod.string().min(1).nullable(),
  paysInCrypto: myzod.boolean().nullable(),
  offersTokenAllocation: myzod.boolean().nullable(),
  salaryCurrency: myzod.string().min(1).nullable(),
  classification: myzod.string().min(1).nullable(),
});

export const jobInfoSchema = myzod.intersection(
  jobCardSetSchema,
  myzod.object({
    id: myzod.string().min(1),
    url: myzod.string().min(1),
    shortUUID: myzod.string().min(1),
    timestamp: myzod.number(),
    requirements: myzod.array(myzod.string().min(1)),
    responsibilities: myzod.array(myzod.string().min(1)),
    benefits: myzod.array(myzod.string().min(1)),
    summary: myzod.string().min(1).nullable(),
    description: myzod.string().min(1).nullable(),
    culture: myzod.string().min(1).nullable(),
    title: myzod.string().min(1),
  }),
);

export const orgInfoSchema = myzod.object(
  {
    id: myzod.string().min(1),
    name: myzod.string().min(1),
    orgId: myzod.string().min(1),
    summary: myzod.string().min(1),
    location: myzod.string().min(1),
    description: myzod.string().min(1),
    logoUrl: myzod.string().min(1).nullable(),
    headcountEstimate: myzod.number().nullable(),
    createdTimestamp: myzod.number().nullable(),
    updatedTimestamp: myzod.number().nullable(),
    discord: myzod.string().min(1).nullable(),
    website: myzod.string().min(1),
    telegram: myzod.string().min(1).nullable(),
    github: myzod.string().min(1).nullable(),
    alias: myzod.string().min(1).nullable(),
    docs: myzod.string().min(1).nullable(),
    twitter: myzod.string().min(1).nullable(),
  },
  { allowUnknown: true },
);

export const projectInfoSchema = myzod.object(
  {
    id: myzod.string().min(1),
    name: myzod.string().min(1),
    website: myzod.string().min(1),
    logo: myzod.string().nullable(),

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

export const projectMoreInfoSchema = myzod.object({
  description: myzod.string().min(1),
  github: myzod.string().min(1).nullable(), // Rename this to github
  twitter: myzod.string().min(1).nullable(),
  discord: myzod.string().min(1).nullable(),
  telegram: myzod.string().min(1).nullable(),
  docs: myzod.string().min(1).nullable(),
});

export const repositoryInfoSchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
  description: myzod.string(),
  timestamp: myzod.number(),
  projectName: myzod.string().nullable(),
  committers: myzod.number().nullable(),
});

export const mwResponseFieldsSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
});
