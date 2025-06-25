import myzod, { Infer } from 'myzod';

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
  normalizedName: myzod.string().min(1),
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

export const grantFundingSchema = myzod.object(
  {
    id: myzod.string().min(1),
    tokenAmount: myzod.number().nullable().optional(),
    tokenUnit: myzod.string().min(1).nullable().optional(),
    fundingDate: myzod.number().nullable().optional(),
    amount: myzod.number().nullable().optional(),
    programName: myzod.string().min(1).nullable().optional(),
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
    normalizedName: myzod.string().min(1),
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
  salary: myzod.number().nullable(),
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
    url: myzod.string().min(1).nullable(),
    access: myzod.literals('public', 'protected'),
    shortUUID: myzod.string().min(1),
    timestamp: myzod.number(),
    requirements: myzod.array(myzod.string().min(1)),
    responsibilities: myzod.array(myzod.string().min(1)),
    benefits: myzod.array(myzod.string().min(1)),
    summary: myzod.string().min(1).nullable(),
    description: myzod.string().min(1).nullable(),
    culture: myzod.string().min(1).nullable(),
    title: myzod.string().min(1),
    featured: myzod.boolean(),
    featureStartDate: myzod.number().nullable(),
    featureEndDate: myzod.number().nullable(),
    onboardIntoWeb3: myzod.boolean(),
    ethSeasonOfInternships: myzod.boolean().optional(),
  }),
);

export const jobsiteSchema = myzod.object({
  id: myzod.string(),
  url: myzod.string(),
  type: myzod.string(),
});

export const orgInfoSchema = myzod.object(
  {
    id: myzod.string().min(1),
    name: myzod.string().min(1),
    normalizedName: myzod.string(),
    orgId: myzod.string().min(1),
    summary: myzod.string().min(1),
    location: myzod.string().min(1),
    description: myzod.string().min(1),
    logoUrl: myzod.string().min(1).nullable(),
    headcountEstimate: myzod.number().nullable(),
    createdTimestamp: myzod.number().nullable(),
    updatedTimestamp: myzod.number().nullable(),
    discord: myzod.string().min(1).nullable(),
    website: myzod.string().min(1).nullable(),
    telegram: myzod.string().min(1).nullable(),
    github: myzod.string().min(1).nullable(),
    aliases: myzod.array(myzod.string().min(1)),
    docs: myzod.string().min(1).nullable(),
    twitter: myzod.string().min(1).nullable(),
    ecosystems: myzod.array(myzod.string()),
  },
  { allowUnknown: true },
);

export const projectInfoSchema = myzod.object(
  {
    id: myzod.string().min(1),
    name: myzod.string().min(1),
    normalizedName: myzod.string(),
    website: myzod.string().min(1).nullable(),
    logo: myzod.string().nullable(),

    category: myzod.string().min(1).nullable(),
    tokenSymbol: myzod.string().min(1).nullable(),

    tvl: myzod.number().nullable(),
    monthlyRevenue: myzod.number().nullable(),
    monthlyVolume: myzod.number().nullable(),
    monthlyFees: myzod.number().nullable(),
    monthlyActiveUsers: myzod.number().nullable(),

    chains: myzod.array(chainSchema),
    hacks: myzod.array(hackSchema),
    audits: myzod.array(auditSchema),

    ecosystems: myzod.array(myzod.string()),
    orgIds: myzod.array(myzod.string()),
  },
  { allowUnknown: true },
);

export const projectMoreInfoSchema = myzod.object({
  description: myzod.string().min(1).nullable(),
  github: myzod.string().min(1).nullable(), // Rename this to github
  twitter: myzod.string().min(1).nullable(),
  discord: myzod.string().min(1).nullable(),
  telegram: myzod.string().min(1).nullable(),
  docs: myzod.string().min(1).nullable(),

  defiLlamaId: myzod.string().nullable(),
  defiLlamaSlug: myzod.string().nullable(),
  defiLlamaParent: myzod.string().nullable(),
});

export const repositoryInfoSchema = myzod
  .object({
    id: myzod.string().min(1),
    name: myzod.string().min(1),
    description: myzod.string().nullable(),
    timestamp: myzod.number().nullable(),
  })
  .allowUnknownKeys(true);

export const mwMessageResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
});

export const reportPayloadSchema = myzod.object({
  subject: myzod.string().min(1, 'Subject is required'),
  description: myzod.string().min(1, 'Description is required'),
  ctx: myzod.object({
    ui: myzod.string(),
    url: myzod.string(),
    ts: myzod.number(),
    other: myzod.string(),
  }),
  attachments: myzod.array(
    myzod.object({
      path: myzod.string(),
    }),
  ),
});

export const affiliationRequestItemSchema = myzod.object({
  wallet: myzod.string(),
  orgId: myzod.string(),
  status: myzod.literals('pending', 'approved', 'rejected').nullable(),
  timestamp: myzod.number().nullable(),
});
export type AffiliationRequestItem = Infer<typeof affiliationRequestItemSchema>;

export const affiliationRequestResponseSchema = myzod.array(
  affiliationRequestItemSchema,
);
export type AffiliationRequestsResponse = Infer<
  typeof affiliationRequestResponseSchema
>;

const projectAllInfoSchema = myzod.intersection(
  projectInfoSchema,
  projectMoreInfoSchema,
);

export const jobPostSchema = myzod
  .intersection(
    jobInfoSchema,
    myzod.object({
      tags: myzod.array(tagSchema),
      organization: myzod
        .intersection(
          orgInfoSchema,
          myzod.object({
            grants: myzod.array(grantFundingSchema),
            fundingRounds: myzod.array(fundingRoundSchema),
            investors: myzod.array(investorSchema),
            projects: myzod.array(projectAllInfoSchema.allowUnknownKeys(true)),
            aggregateRating: myzod.number().min(0).max(5),
            reviewCount: myzod.number(),
            hasUser: myzod.boolean(),
            atsClient: myzod
              .literals('jobstash', 'greenhouse', 'lever', 'workable')
              .nullable(),
          }),
        )
        .allowUnknownKeys(true)
        .nullable(),
      project: myzod
        .intersection(
          projectAllInfoSchema,
          myzod.object({
            hasUser: myzod.boolean(),
            grants: myzod.array(grantFundingSchema),
          }),
        )
        .allowUnknownKeys(true)
        .nullable(),
    }),
  )
  .allowUnknownKeys(true);

export const linkedAccountsSchema = myzod.object({
  discord: myzod.string().nullable(),
  telegram: myzod.string().nullable(),
  google: myzod.string().nullable(),
  apple: myzod.string().nullable(),
  github: myzod.string().nullable(),
  farcaster: myzod.string().nullable(),
  twitter: myzod.string().nullable(),
  email: myzod.string().nullable(),
  wallets: myzod.array(myzod.string()),
});
export type LinkedAccounts = Infer<typeof linkedAccountsSchema>;

export const userLocationSchema = myzod.object({
  country: myzod.string().nullable(),
  city: myzod.string().nullable(),
});
export type UserProfileLocation = Infer<typeof userLocationSchema>;

export const userProfileSchema = myzod.object({
  wallet: myzod.string().min(1),
  githubAvatar: myzod.string().min(1).nullable(),
  name: myzod.string().min(1).nullable(),
  alternateEmails: myzod.array(myzod.string()),
  location: userLocationSchema,
  availableForWork: myzod.boolean().nullable(),
  linkedAccounts: linkedAccountsSchema,
  cryptoNative: myzod.boolean().optional(),
  cryptoAdjacent: myzod.boolean().optional(),
});
export type UserProfile = Infer<typeof userProfileSchema>;

export const userProfileResponseSchema = myzod
  .object({
    data: userProfileSchema,
    success: myzod.boolean(),
    message: myzod.string(),
  })
  .allowUnknownKeys(true);
export type UserProfileResponse = Infer<typeof userProfileResponseSchema>;

export const userWorkHistorySchema = myzod.object({
  login: myzod.string(),
  name: myzod.string().nullable(),
  logoUrl: myzod.string().nullable(),
  description: myzod.string().nullable(),
  url: myzod.string().nullable(),
  firstContributedAt: myzod.number(),
  lastContributedAt: myzod.number(),
  commitsCount: myzod.number().nullable(),
  tenure: myzod.number(),
  cryptoNative: myzod.boolean(),
  repositories: myzod.array(
    myzod.object({
      name: myzod.string().nullable(),
      url: myzod.string(),
      cryptoNative: myzod.boolean(),
      firstContributedAt: myzod.number(),
      lastContributedAt: myzod.number(),
      description: myzod.string().nullable(),
      commitsCount: myzod.number(),
      skills: myzod.array(myzod.string()),
      tenure: myzod.number(),
      stars: myzod.number(),
      createdAt: myzod.number(),
    }),
  ),
  createdAt: myzod.number(),
});
export type UserWorkHistory = Infer<typeof userWorkHistorySchema>;

export const userSkillSchema = myzod
  .object({
    id: myzod.string().min(1),
    name: myzod.string().min(1),
    canTeach: myzod.boolean(),
  })
  .allowUnknownKeys(true);
export type UserSkill = Infer<typeof userSkillSchema>;

export const userSkillResponseSchema = myzod.object({
  data: myzod.array(userSkillSchema),
  success: myzod.boolean(),
  message: myzod.string(),
});
export type UserSkillResponse = Infer<typeof userSkillResponseSchema>;

export const userSkillsPayloadSchema = myzod.object({
  skills: myzod.array(userSkillSchema),
});
export type UserSkillsPayload = Infer<typeof userSkillsPayloadSchema>;

export const userShowcaseSchema = myzod.object({
  id: myzod.string().min(1),
  label: myzod.string().min(1),
  url: myzod.string().min(1),
});
export type UserShowcase = Infer<typeof userShowcaseSchema>;

export const userShowcaseResponseSchema = myzod.object({
  data: myzod.array(userShowcaseSchema),
  success: myzod.boolean(),
  message: myzod.string().min(1),
});
export type UserShowcaseResponse = Infer<typeof userShowcaseResponseSchema>;

export const userShowcasePayloadSchema = myzod.object({
  showcase: myzod.array(myzod.omit(userShowcaseSchema, ['id'])),
});
export type UserShowcasePayload = Infer<typeof userShowcasePayloadSchema>;

export const userAvailableForWorkSchema = myzod.intersection(
  userProfileSchema,
  myzod.object({
    cryptoNative: myzod.boolean(),
    cryptoAdjacent: myzod.boolean(),
    attestations: myzod.object({
      upvotes: myzod.number().nullable(),
      downvotes: myzod.number().nullable(),
    }),
    note: myzod.string().nullable(),
    ecosystemActivations: myzod.array(myzod.string()),
    skills: myzod.array(userSkillSchema),
    showcases: myzod.array(userShowcaseSchema),
    workHistory: myzod.array(userWorkHistorySchema),
    jobCategoryInterests: myzod.array(myzod.string()),
  }),
);
export type UserAvailableForWork = Infer<typeof userAvailableForWorkSchema>;

export const userAvailableForWorkResponseSchema = myzod.array(
  userAvailableForWorkSchema,
);
export type UserAvailableForWorkResponse = Infer<
  typeof userAvailableForWorkResponseSchema
>;

export const updateApplicantNotePayloadSchema = myzod.object({
  wallet: myzod.string(),
  note: myzod.string(),
});
export type UpdateApplicantNotePayload = Infer<
  typeof updateApplicantNotePayloadSchema
>;
