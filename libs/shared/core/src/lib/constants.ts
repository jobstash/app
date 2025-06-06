import { Lato, Roboto } from 'next/font/google';
import React from 'react';

export const EVENT_CARD_CLICK = 'card-click';

export const ERR_NOT_FOUND = 'Not Found';
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
  tvl: 'tvl',
  monthlyVolume: 'monthly-volume',
  monthlyActiveUsers: 'monthly-active-users',
  monthlyFees: 'monthly-fees',
  monthlyRevenue: 'monthly-revenue',
  seniority: 'seniority',
  salary: 'salary',
  location: 'location',
  locationType: 'location-type',
  commitment: 'commitment',
  fundingDate: 'funding-date',
  lastFunding: 'last-funding',
  fundingRounds: 'funding-rounds',
  token: 'token',
  defiLlama: 'defi-llama',
  paysInCrypto: 'pays-in-cryto',
  offersTokenAllocation: 'offers-token-allocation',
  classification: 'classification',
  headcountEstimate: 'head-count-estimate',
  jobs: 'jobs',
  projects: 'projects',
  audit: 'audit',
  hack: 'hack',
  timezone: 'timezone',
  workingHours: 'working-hours',
} as const;

// Sentry MSG
export const SENTRY_MW_NON_200_RESPONSE = 'Non-200 mw response';
export const SENTRY_MW_INVALID_JSON_RESPONSE = 'Invalid JSON mw response';
export const SENTRY_MW_UNSUCCESSFUL_RESPONSE = 'Unsuccessful mw response';
export const SENTRY_SCHEMA_VALIDATION_ERROR = 'Invalid Schema';

export const ROUTE_SECTION = {
  JOBS: '/jobs' as const,
  JOBS_FOR_EXPERTS: '/jobs-for-experts' as const,
  ORGANIZATIONS: '/organizations' as const,
  PROJECTS: '/projects' as const,
  JOB_BOOKMARKS: '/bookmarks/jobs' as const,
  PROFILE_REPO: '/profile/repositories' as const,
} as const;

export const TAB_SEGMENT = {
  details: 'details' as const,
  organization: 'organization' as const,
  organizations: 'organizations' as const,
  projects: 'projects' as const,
  jobs: 'jobs' as const,
  otherJobs: 'other-jobs' as const,
  competitors: 'competitors' as const,
  reviews: 'reviews' as const,
} as const;

export const GA_EVENT_ACTION = {
  DONATE_CLICK: 'donate_click' as const,
  JOB_APPLY: 'job_apply' as const,
  JOB_EXPAND_DETAILS: 'job_expand_details' as const,
  FILTER_ACTION: 'filter_action' as const,
} as const;

export const featuredGradientBorderStyle: React.CSSProperties = {
  background:
    'linear-gradient(90deg, #1e1e1e, #1e1e1e) padding-box, linear-gradient(270deg, #D68800, #8743FF) border-box',
  border: '3px solid transparent',
  borderRadius: '1.7em',
  boxSizing: 'border-box',
  backgroundSize: '400% 400%',
  cursor: 'pointer',
  animation: 'featuredbg 5s ease infinite',
  WebkitAnimation: 'featuredbg 5s ease infinite',
  MozAnimation: 'featuredbg 5s ease infinite',
};

export const featuredButtonStyle: React.CSSProperties = {
  width: 'fit-content',
  minWidth: '96px',
  paddingLeft: '0.75rem',
  paddingRight: '0.75rem',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  background:
    'linear-gradient(270deg, rgba(253, 179, 49, 0.8), #8743FF, #4436F1)',
  backgroundSize: '400% 400%',
  animation: 'featuredbg 5s ease infinite',
  WebkitAnimation: 'featuredbg 5s ease infinite',
  MozAnimation: 'featuredbg 5s ease infinite',
};

export const REPORT_UI_CTX = {
  JOB_DETAILS_CARD: 'Job Details Card',
  ORG_DETAILS_CARD: 'Org Details Card',
  PROJECT_DETAILS_CARD: 'Project Details Card',
  COMPETITOR_CARD: 'Competitor Card',
  OTHER_JOBS_CARD: 'Other Jobs Card',
  ORG_REVIEW_CARD: 'Org Review Card',
} as const;

export const COMMUNITIES = {
  ETHDAM: 'ethdam',
  ETHLONDON: 'ethlondon',
  LOBSTERDAO: 'lobsterdao',
  SUPERCHAIN: 'superchain',
  DEV: 'devcommunity',
  STAGING: 'stagingcommunity',
} as const;
export type Community = typeof COMMUNITIES[keyof typeof COMMUNITIES];

export const COMMUNITY_SET = new Set(Object.values(COMMUNITIES));
export const COMMUNITY_HEADER_KEY = 'X-Community';

export const SESSION_STORAGE_KEYS = {
  MW_VERSION: 'jobstash-mw-version',
  SCHEMA_VALIDATION_RELOAD: 'schema-validation-reload',
} as const;

export const LOCAL_STORAGE_KEYS = {
  AUTH_JWT: 'jobstash:jwt',
  CHECK_WALLET_RESPONSE: 'jobstash:check-wallet-response',
} as const;

export const CALENDLY_SCHEDULE_LINK =
  'https://calendly.com/jobstash-intro/30min';

export const PORTAL_IDS = {
  TOP_NAV_MAIN: 'top-nav-main',
};

export const NOTE_UPDATE_UNDO_EVENT = 'note-update-undo-event';
