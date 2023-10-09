export interface Competitor {
  id: string;
  logo: string;
  name: string;
  url: string;
  description: string;
  isMainnet: boolean;
  telegram: string;
  orgId: string;
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
}
