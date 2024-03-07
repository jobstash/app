import { z } from 'zod';

export const genericResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type GenericResponse = z.infer<typeof genericResponseSchema>;

export const tagSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  normalizedName: z.string(),
});
export type Tag = z.infer<typeof tagSchema>;

export const investorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});
export type Investor = z.infer<typeof investorSchema>;

export const fundingRoundSchema = z.object({
  id: z.string().uuid(),
  date: z.number(),
  roundName: z.string().nullable(),
  raisedAmount: z.number().nullable(),
  sourceLink: z.string().nullable(),
});
export type FundingRound = z.infer<typeof fundingRoundSchema>;

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});
export type Category = z.infer<typeof categorySchema>;

export const jobInfoTagsSchema = z.object({
  seniority: z.string().nullable(),
  salary: z.number().nullable(),
  minimumSalary: z.number().nullable(),
  maximumSalary: z.number().nullable(),
  salaryCurrency: z.string().nullable(),
  location: z.string().nullable(),
  locationType: z.string().nullable(),
  commitment: z.string().nullable(),
  paysInCrypto: z.boolean().nullable(),
  offersTokenAllocation: z.boolean().nullable(),
  classification: z.string().nullable(),
});
export type JobInfoTags = z.infer<typeof jobInfoTagsSchema>;

export const jobInfoSchema = z
  .object({
    // Basic
    id: z.string().uuid(),
    url: z.string().url(),
    title: z.string(),
    shortUUID: z.string().length(6),
    timestamp: z.number(),

    // Details
    requirements: z.array(z.string()),
    responsibilities: z.array(z.string()),
    benefits: z.array(z.string()),
    summary: z.string().nullable(),
    description: z.string().nullable(),
    culture: z.string().nullable(),
  })
  .merge(jobInfoTagsSchema);
export type JobInfo = z.infer<typeof jobInfoSchema>;

export const socialsInfoSchema = z.object({
  website: z.string().nullable(),
  discord: z.string().nullable(),
  telegram: z.string().nullable(),
  github: z.string().nullable(),
  docs: z.string().nullable(),
  twitter: z.string().nullable(),
});
export type SocialsInfo = z.infer<typeof socialsInfoSchema>;

export const starRatingSchema = z.number().min(0).max(5).nullable();
export type StarRating = z.infer<typeof starRatingSchema>;

export const orgInfoTagPropsSchema = z.object({
  website: z.string().nullable(),
  aggregateRating: starRatingSchema,
  location: z.string(),
  headcountEstimate: z.number().nullable(),
});
export type OrgInfoTagProps = z.infer<typeof orgInfoTagPropsSchema>;

export const orgSocialsSchema = socialsInfoSchema.omit({ website: true });
export type OrgSocials = z.infer<typeof orgSocialsSchema>;

export const orgInfoSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    orgId: z.string(),
    summary: z.string(),
    description: z.string(),
    logoUrl: z.string().url().nullable(),
    reviewCount: z.number().min(0),
  })
  .merge(orgInfoTagPropsSchema)
  .merge(orgSocialsSchema);
export type OrgInfo = z.infer<typeof orgInfoSchema>;

export const chainSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  logo: z.string().nullable(),
});
export type Chain = z.infer<typeof chainSchema>;

export const hackSchema = z.object({
  id: z.string().uuid(),
  category: z.string().nullable(),
  issueType: z.string().nullable(),
  fundsLost: z.number().nullable(),
});
export type Hack = z.infer<typeof hackSchema>;

export const auditSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  link: z.string().nullable(),
  techIssues: z.number().nullable().optional(),
});
export type Audit = z.infer<typeof auditSchema>;

export const projectInfoTagsSchema = z.object({
  category: z.string().nullable(),
  isMainnet: z.boolean(),
  tvl: z.number().nullable(),
  monthlyRevenue: z.number().nullable(),
  monthlyVolume: z.number().nullable(),
  monthlyFees: z.number().nullable(),
  monthlyActiveUsers: z.number().nullable(),
});
export type ProjectInfoTags = z.infer<typeof projectInfoTagsSchema>;

export const projectInfoSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    website: z.string(),
    logo: z.string().nullable(),
    chains: z.array(chainSchema),
    hacks: z.array(hackSchema),
    audits: z.array(auditSchema),
  })
  .merge(projectInfoTagsSchema);
export type ProjectInfo = z.infer<typeof projectInfoSchema>;

export const projectAllInfoSchema = projectInfoSchema
  .merge(
    z.object({
      description: z.string(),
    }),
  )
  .merge(socialsInfoSchema.omit({ website: true }));
export type ProjectAllInfo = z.infer<typeof projectAllInfoSchema>;

export const competitorSchema = z
  .object({
    orgId: z.string(),
    description: z.string(),
    jobs: z.array(z.any()),
    repos: z.array(z.any()),
  })
  .merge(projectInfoSchema);
export type Competitor = z.infer<typeof competitorSchema>;

export const competitorsResponseSchema = z
  .object({
    data: z.array(competitorSchema),
  })
  .merge(genericResponseSchema);
