import { Section, Tier } from './types';

export const PRICING_TIERS: Tier[] = [
  { name: 'Starter', id: 'tier-starter', priceMonthly: '$0' },
  { name: 'Growth', id: 'tier-growth', priceMonthly: '$199' },
  { name: 'Pro', id: 'tier-scale', priceMonthly: '$399' },
  { name: 'Max', id: 'tier-max', priceMonthly: '$599' },
];

export const PRICING_SECTIONS: Section[] = [
  {
    name: 'Candidate Verification',
    features: [
      {
        name: 'VERI Credits',
        tiers: {
          Starter: '10 profiles',
          Growth: '250 profiles',
          Pro: '500 profiles',
          Max: '1000 profiles',
        },
      },
      {
        name: 'Roll-over credits',
        tiers: {
          Starter: false,
          Growth: '30 days',
          Pro: '60 days',
          Max: '90 days',
        },
      },
      {
        name: 'StashPool',
        tiers: {
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Boosted Vacancy',
        tiers: {
          Starter: false,
          Growth: false,
          Pro: 'Boosted Vacancy',
          Max: '2x Boosted Vacancy',
        },
      },
      {
        name: 'Crypto Native Detection',
        tiers: {
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Work History Legitimacy Check',
        tiers: {
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Rising Star Identification',
        tiers: {
          Starter: false,
          Growth: false,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Crypto Adjacent Analysis',
        tiers: {
          Starter: false,
          Growth: false,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Additional Seats',
        tiers: {
          Starter: false,
          Growth: '$50',
          Pro: '$100',
          Max: '$150',
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
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Workable Integration',
        tiers: {
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Greenhouse Integration',
        tiers: {
          Starter: false,
          Growth: false,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Custom ATS Solution',
        tiers: {
          Starter: false,
          Growth: false,
          Pro: true,
          Max: true,
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
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Internal Developer Detection',
        tiers: {
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Commit History Analysis',
        tiers: {
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Developer Ranking & Scoring',
        tiers: {
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
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
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'NFT Wallet Analysis',
        tiers: {
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'DegenScore Integration',
        tiers: {
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
        },
      },
      {
        name: 'Custom Ecosystem Activations',
        tiers: {
          Starter: false,
          Growth: true,
          Pro: true,
          Max: true,
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
          Starter: false,
          Growth: '3000+',
          Pro: '6600+',
          Max: '10000+',
        },
      },
      {
        name: 'Developer Database Access',
        tiers: {
          Starter: false,
          Growth: '500K+',
          Pro: '1M+',
          Max: '2M+',
        },
      },
      {
        name: 'Custom Data Pipeline',
        tiers: {
          Starter: false,
          Growth: false,
          Pro: true,
          Max: true,
        },
      },
    ],
  },
];
