export const orgDynamicSlugSet = new Set(['slug', 'tab']);

export const ORG_RATING_LABELS = {
  benefits: 'Benefits' as const,
  careerGrowth: 'Career Growth' as const,
  diversityInclusion: 'DEI' as const,
  management: 'Management' as const,
  product: 'Product' as const,
  compensation: 'Compensation' as const,
  onboarding: 'Onboarding' as const,
  workLifeBalance: 'Work Life Balance' as const,
};

export const ORG_REVIEW_LOCATIONS = ['ONSITE', 'REMOTE', 'HYBRID'];

export const ORG_REVIEW_TIMEZONES = [
  'ASYNC',
  'GMT-12',
  'GMT-11',
  'GMT-10',
  'GMT-09',
  'GMT-08',
  'GMT-07',
  'GMT-06',
  'GMT-05',
  'GMT-04',
  'GMT-03',
  'GMT-02',
  'GMT-01',
  'GMT',
  'GMT+01',
  'GMT+02',
  'GMT+03',
  'GMT+04',
  'GMT+05',
  'GMT+06',
  'GMT+07',
  'GMT+08',
  'GMT+09',
  'GMT+10',
  'GMT+11',
  'GMT+12',
  'GMT+13',
  'GMT+14',
];

export const ORG_REVIEW_WORKING_HOURS = Array.from({ length: 24 }, (_, index) =>
  index.toString(),
);

export const ATS_PROVIDERS = {
  DEFAULT: {
    label: 'None',
    siteLabel: 'Disable ATS',
    platformName: 'none',
    infoUrl: null,
    setupGuideUrl: null,
  },
  JOBSTASH: {
    label: 'Jobstash',
    siteLabel: 'jobstash.xyz',
    platformName: 'jobstash',
    infoUrl: '#',
    setupGuideUrl: '#',
  },
  GREENHOUSE: {
    label: 'Greenhouse',
    siteLabel: 'greenhouse.com',
    platformName: 'greenhouse',
    infoUrl: '#',
    setupGuideUrl: '#',
  },
  LEVER: {
    label: 'Lever',
    siteLabel: 'lever.co',
    platformName: 'lever',
    infoUrl: '#',
    setupGuideUrl: '#',
  },
  WORKABLE: {
    label: 'Workable',
    siteLabel: 'workable.com',
    platformName: 'workable',
    infoUrl: '#',
    setupGuideUrl: '#',
  },
} as const;
