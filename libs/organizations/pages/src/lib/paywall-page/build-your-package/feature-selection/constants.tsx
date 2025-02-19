import {
  MegaphoneIcon,
  ShieldCheckIcon,
  UserRoundSearchIcon,
} from 'lucide-react';

import { Feature } from '../types';

export const FEATURES: Feature[] = [
  {
    icon: <ShieldCheckIcon size={36} />,
    title: 'VERI',
    description:
      'Effortlessly validate candidate credentials to build trust and reduce hiring risk.',
    section: 'veri',
    price: [
      { title: 'Basic', price: 49 },
      { title: 'Advanced', price: 99 },
      { title: 'Premium', price: 179 },
    ],
  },
  {
    icon: <UserRoundSearchIcon size={36} />,
    title: 'StashPool',
    description:
      'Access a curated pool of skilled candidates to simplify and speed up recruitment.',
    section: 'stash-pool',
    price: 299,
  },
  {
    icon: <MegaphoneIcon size={36} />,
    title: 'StashAlert',
    description:
      "Stay ahead with real-time alerts that reveal your competitors' latest recruitment trends.",
    section: 'stash-alert',
    price: 149,
  },
];
