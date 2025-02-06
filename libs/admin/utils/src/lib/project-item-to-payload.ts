import { ProjectItem, UpdateProjectPayload } from '@jobstash/admin/core';
import { makeNullable } from '@jobstash/shared/utils';

export const projectItemToPayload = (
  item: ProjectItem,
): UpdateProjectPayload => ({
  name: item.name,
  description: makeNullable(item.description),
  category: item.category,
  logo: makeNullable(item.logoUrl),
  tvl: makeNullable(item.tvl),
  monthlyFees: makeNullable(item.monthlyFees),
  monthlyVolume: makeNullable(item.monthlyVolume),
  monthlyRevenue: makeNullable(item.monthlyRevenue),
  monthlyActiveUsers: makeNullable(item.monthlyActiveUsers),
  website: item.website,
  docs: item.docs,
  twitter: item.twitter,
  discord: item.discord,
  github: item.github,
  telegram: item.telegram,
  tokenAddress: item.tokenAddress,
  tokenSymbol: makeNullable(item.tokenSymbol),
  defiLlamaId: item.defiLlamaId,
  defiLlamaSlug: item.defiLlamaSlug,
  defiLlamaParent: item.defiLlamaParent,
  jobsites: item.jobsites,
  detectedJobsites: item.detectedJobsites,
});
