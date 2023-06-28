import { Lato, Roboto } from '@next/font/google';

export const EVENT_CARD_CLICK = 'card-click';

export const ERR_INTERNAL = 'Something went wrong :(';
export const ERR_OFFLINE = 'No internet connection';

export const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
});

export const MEDIA_QUERY_MOBILE = '(max-width: 1024px)';

export const TAG_ELEMENT_ID = {
  website: 'website',
  github: 'github',
  twitter: 'twitter',
  telegram: 'telegram',
  discord: 'discord',
  //
  // linkedin: 'linkedin',
  docs: 'docs',
  category: 'category',
  teamSize: 'team-size',
  tvl: 'tvl',
  monthlyVolume: 'monthly-volume',
  monthlyActiveUsers: 'monthly-active-users',
  monthlyFees: 'monthly-fees',
  monthlyRevenue: 'monthly-revenue',
  seniority: 'seniority',
  salary: 'salary',
  location: 'location',
  commitment: 'commitment',
  fundingDate: 'funding-date',
  lastFunding: 'last-funding',
  fundingRounds: 'funding-rounds',
  token: 'token',
  defiLlama: 'defi-llama',
  mainnet: 'mainnet',
  paysInCrypto: 'pays-in-cryto',
  offersTokenAllocation: 'offers-token-allocation',
  headCount: 'head-count',
  jobs: 'jobs',
  projects: 'projects',
} as const;

// Sentry MSG
export const SENTRY_MW_NON_200_RESPONSE = 'Non-200 mw response';
export const SENTRY_MW_INVALID_JSON_RESPONSE = 'Invalid JSON mw response';
export const SENTRY_MW_UNSUCCESSFUL_RESPONSE = 'Unsuccessful mw response';
export const SENTRY_SCHEMA_VALIDATION_ERROR = 'Invalid Schema';

export const TAB_SEGMENT = {
  details: 'details' as const,
  organization: 'organization' as const,
  projects: 'projects' as const,
  jobs: 'jobs' as const,
  competitors: 'competitors' as const,
} as const;

export const LIST_PATHS = {
  jobs: '/jobs',
  organizations: '/organizations',
  projects: '/projects',
};
