import myzod, { Infer } from 'myzod';

export const projectItemSchema = myzod
  .object({
    id: myzod.string(),
    name: myzod.string(),
    normalizedName: myzod.string(),
    logoUrl: myzod.string().nullable(),
    tvl: myzod.number().nullable().optional(),
    isMainnet: myzod.boolean().nullable().optional(),
    tokenSymbol: myzod.string().nullable().optional(),
    monthlyFees: myzod.number().nullable().optional(),
    monthlyVolume: myzod.number().nullable().optional(),
    monthlyRevenue: myzod.number().nullable().optional(),
    monthlyActiveUsers: myzod.number().nullable().optional(),
    description: myzod.string().nullable().optional(),
    category: myzod.string().nullable(),
    website: myzod.string().nullable(),
    docs: myzod.string().nullable(),
    twitter: myzod.string().nullable(),
    discord: myzod.string().nullable(),
    github: myzod.string().nullable(),
    telegram: myzod.string().nullable(),
    tokenAddress: myzod.string().nullable(),
    defiLlamaId: myzod.string().nullable(),
    defiLlamaSlug: myzod.string().nullable(),
    defiLlamaParent: myzod.string().nullable(),

    aliases: myzod.array(myzod.string()),
    createdTimestamp: myzod.number().nullable(),
    orgIds: myzod.array(myzod.string()),
    updatedTimestamp: myzod.number().nullable(),
  })
  .allowUnknownKeys(true);

export type ProjectItem = Infer<typeof projectItemSchema>;

export const updateProjectPayloadSchema = myzod.object({
  name: myzod.string(),
  description: myzod.string().nullable(),
  category: myzod.string().nullable(),
  logo: myzod.string().nullable(),
  isMainnet: myzod.boolean().nullable(),
  tvl: myzod.number().nullable(),
  monthlyFees: myzod.number().nullable(),
  monthlyVolume: myzod.number().nullable(),
  monthlyRevenue: myzod.number().nullable(),
  monthlyActiveUsers: myzod.number().nullable(),
  website: myzod.string().nullable(),
  docs: myzod.string().nullable(),
  twitter: myzod.string().nullable(),
  discord: myzod.string().nullable(),
  github: myzod.string().nullable(),
  telegram: myzod.string().nullable(),
  tokenAddress: myzod.string().nullable(),
  tokenSymbol: myzod.string().nullable(),
  defiLlamaId: myzod.string().nullable(),
  defiLlamaSlug: myzod.string().nullable(),
  defiLlamaParent: myzod.string().nullable(),
});

export type UpdateProjectPayload = Infer<typeof updateProjectPayloadSchema>;
