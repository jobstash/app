export type TierName = 'Basic' | 'Advanced' | 'Premium';

export interface Tier {
  name: TierName;
  id: string;
  priceMonthly: string;
}

export type FeatureTiers = {
  [key in TierName]: boolean | string;
};

export interface Feature {
  name: string;
  tiers: FeatureTiers;
}

export interface Section {
  name: string;
  features: Feature[];
}
