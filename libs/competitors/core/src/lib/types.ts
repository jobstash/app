import { type Chain } from '@jobstash/shared/core';

export interface Competitor {
  id: string;
  logo: string;
  name: string;
  url: string;
  description: string;
  telegram: string;
  orgId: string | null;
  twitter: string;
  discord: string;
  docs: string;
  githubOrganization: string;
  category?: string;

  defiLlamaSlug?: string;
  tvl?: number;
  monthlyVolume?: number;
  monthlyRevenue?: number;
  monthlyFees?: number;

  chains: Chain[];
  ecoSystems: string[];
}
