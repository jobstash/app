import { MegaphoneIcon, PackageOpenIcon, ShieldCheckIcon } from 'lucide-react';

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
          'Idea for new projects in the crypto industry just starting out with talent acquisition. Completely FREE',
      },
      {
        title: 'Growth',
        price: 199,
        description:
          'Ideal for growing crypto orgs needing more checks and additional support for recruiting.',
      },
      {
        title: 'Pro',
        price: 399,
        description:
          'Ideal for mid-sized crypto orgs looking to grow their teams with more recruiting flexibility and efficiency.',
      },
      {
        title: 'Max',
        price: 599,
        description:
          'Ideal for crypto projects or orgs in hyper-growth, requiring high-volume, rapid recruitment.',
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
        price: 49,
        description:
          'Include this addon for additional 100 profile verifications.',
      },
      {
        title: 'Plus',
        price: 99,
        description:
          'Include this addon for additional 250 profile verifications.',
      },
      {
        title: 'Elite',
        price: 149,
        description:
          'Include this addon for additional 500 profile verifications.',
      },
      {
        title: 'Ultra',
        price: 229,
        description:
          'Include this addon for additional 1000 profile verifications.',
      },
    ],
  },
  {
    icon: <MegaphoneIcon size={36} />,
    title: 'StashAlert',
    description:
      "Stay ahead with real-time alerts that reveal your competitors' latest recruitment trends.",
    section: 'stash-alert',
    price: 99,
  },
];
