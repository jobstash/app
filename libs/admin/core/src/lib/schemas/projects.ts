import myzod, { Infer } from 'myzod';

export const projectItemSchema = myzod.object({
  id: myzod.string(),
  name: myzod.string(),
  normalizedName: myzod.string(),
  orgId: myzod.string().nullable().optional(),
  tvl: myzod.number().nullable().optional(),
  logo: myzod.string().nullable().optional(),
  isMainnet: myzod.boolean().nullable().optional(),
  tokenSymbol: myzod.string().nullable().optional(),
  monthlyFees: myzod.number().nullable().optional(),
  monthlyVolume: myzod.number().nullable().optional(),
  monthlyRevenue: myzod.number().nullable().optional(),
  monthlyActiveUsers: myzod.number().nullable().optional(),
  //
  // ecosystems: myzod.array(myzod.string()),
});

export type ProjectItem = Infer<typeof projectItemSchema>;
