export const orgDynamicSlugSet = new Set(['slug', 'tab']);

export const ORG_RATING_LABELS = {
  onboarding: 'Onboarding' as const,
  careerGrowth: 'Career Growth' as const,
  benefits: 'Benefits' as const,
  workLifeBalance: 'Work Life Balance' as const,
  diversityInclusion: 'Diversity & Inclusion' as const,
  travel: 'Travel' as const,
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
//  [
//   '00:00',
//   '01:00',
//   '02:00',
//   '03:00',
//   '04:00',
//   '05:00',
//   '06:00',
//   '07:00',
//   '08:00',
//   '09:00',
//   '10:00',
//   '11:00',
//   '12:00',
//   '13:00',
//   '14:00',
//   '15:00',
//   '16:00',
//   '17:00',
//   '18:00',
//   '19:00',
//   '20:00',
//   '21:00',
//   '22:00',
//   '23:00',
// ];
