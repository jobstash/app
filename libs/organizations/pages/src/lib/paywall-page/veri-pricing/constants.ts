import { Section, Tier } from './types';

export const PRICING_TIERS: Tier[] = [
  { name: 'Basic', id: 'tier-starter', priceMonthly: '$49' },
  { name: 'Advanced', id: 'tier-growth', priceMonthly: '$99' },
  { name: 'Premium', id: 'tier-scale', priceMonthly: '$179' },
];

export const PRICING_SECTIONS: Section[] = [
  {
    name: 'Candidate Verification',
    features: [
      {
        name: 'Profile Verifications',
        tiers: {
          Basic: '100 profiles',
          Advanced: '500 profiles',
          Premium: '1000 profiles',
        },
      },
      {
        name: 'Roll-over credits',
        tiers: {
          Basic: '30 days',
          Advanced: '60 days',
          Premium: '90 days',
        },
      },
      {
        name: 'Crypto Native Detection',
        tiers: {
          Basic: true,
          Advanced: true,
          Premium: true,
        },
      },
      {
        name: 'Work History Legitimacy Check',
        tiers: {
          Basic: true,
          Advanced: true,
          Premium: true,
        },
      },
      {
        name: 'Rising Star Identification',
        tiers: {
          Basic: false,
          Advanced: false,
          Premium: true,
        },
      },
      {
        name: 'Crypto Adjacent Analysis',
        tiers: {
          Basic: false,
          Advanced: false,
          Premium: true,
        },
      },
    ],
  },
  {
    name: 'GitHub Integration',
    features: [
      {
        name: 'GitHub Organization Verification',
        tiers: {
          Basic: true,
          Advanced: true,
          Premium: true,
        },
      },
      {
        name: 'Internal Developer Detection',
        tiers: {
          Basic: true,
          Advanced: true,
          Premium: true,
        },
      },
      {
        name: 'Commit History Analysis',
        tiers: {
          Basic: false,
          Advanced: true,
          Premium: true,
        },
      },
      {
        name: 'Developer Ranking & Scoring',
        tiers: {
          Basic: false,
          Advanced: true,
          Premium: true,
        },
      },
    ],
  },
  {
    name: 'Ecosystem Integration',
    features: [
      {
        name: 'POAP Verification',
        tiers: {
          Basic: true,
          Advanced: true,
          Premium: true,
        },
      },
      {
        name: 'NFT Wallet Analysis',
        tiers: {
          Basic: true,
          Advanced: true,
          Premium: true,
        },
      },
      {
        name: 'DegenScore Integration',
        tiers: {
          Basic: false,
          Advanced: true,
          Premium: true,
        },
      },
      {
        name: 'Custom Ecosystem Activations',
        tiers: {
          Basic: false,
          Advanced: true,
          Premium: true,
        },
      },
    ],
  },

  {
    name: 'ATS Integration',
    features: [
      {
        name: 'Lever Integration',
        tiers: {
          Basic: true,
          Advanced: true,
          Premium: true,
        },
      },
      {
        name: 'Workable Integration',
        tiers: {
          Basic: true,
          Advanced: true,
          Premium: true,
        },
      },
      {
        name: 'Greenhouse Integration',
        tiers: {
          Basic: false,
          Advanced: false,
          Premium: true,
        },
      },
      {
        name: 'Custom ATS Solution',
        tiers: {
          Basic: false,
          Advanced: false,
          Premium: true,
        },
      },
    ],
  },
  {
    name: 'Data Coverage',
    features: [
      {
        name: 'Organization Coverage',
        tiers: {
          Basic: '1000+',
          Advanced: '3000+',
          Premium: '6600+',
        },
      },
      {
        name: 'Developer Database Access',
        tiers: {
          Basic: '100K+',
          Advanced: '500K+',
          Premium: '1M+',
        },
      },
      {
        name: 'Repository Analysis',
        tiers: {
          Basic: 'Basic',
          Advanced: 'Advanced',
          Premium: 'Full',
        },
      },
      {
        name: 'Custom Data Pipeline',
        tiers: {
          Basic: false,
          Advanced: false,
          Premium: true,
        },
      },
    ],
  },
];
