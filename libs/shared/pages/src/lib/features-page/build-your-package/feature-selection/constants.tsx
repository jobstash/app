import { PackageOpenIcon, ShieldCheckIcon } from 'lucide-react';

import { Feature } from '../types';

export const FEATURES: Feature[] = [
  {
    icon: <PackageOpenIcon size={33} />,
    title: 'JobStash',
    defaultTierTitle: 'Bundles',
    description:
      'Streamline your hiring process with our comprehensive job posting and candidate management platform.',
    section: 'bundled',
    price: [
      {
        title: 'Starter 🔥',
        price: 0,
        description:
          'Get to know JobStash & Veri. Completely FREE',
      },
      {
        title: 'Growth',
        price: 29,
        description:
          'Access our Talent Pool to accelerate your recruiting.',
      },
      {
        title: 'Pro',
        price: 150,
        description:
          'Get 2 free job promotions every month.Ideal for to kickstart your talent search',
      },
      {
        title: 'Max',
        price: 299,
        description:
          'Get 5 free job promotions every month. Ideal for crypto projects or orgs in growth, requiring high-volume, rapid recruitment.',
      },
    ],
  },
  {
    icon: <ShieldCheckIcon size={36} />,
    title: 'VERI',
    defaultTierTitle: 'Addons',
    description:
      'Effortlessly validate candidate credentials to build trust and reduce hiring risk.',
    section: 'veri',
    price: [
      {
        title: 'Lite',
        price: 19,
        description:
          'Include this addon for additional 100 profile verifications.',
      },
      {
        title: 'Plus',
        price: 29,
        description:
          'Include this addon for additional 250 profile verifications.',
      },
      {
        title: 'Elite',
        price: 39,
        description:
          'Include this addon for additional 500 profile verifications.',
      },
      {
        title: 'Ultra',
        price: 69,
        description:
          'Include this addon for additional 1000 profile verifications.',
      },
    ],
  },
  
];
