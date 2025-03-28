import { mainnet, polygon } from 'wagmi/chains';

import { COMMUNITIES } from '@jobstash/shared/core';

export const PROFILE_RIGHT_PANEL_TAB = {
  SKILLS_USED: 'Skills Used' as const,
  YOUR_CONTRIBUTION: 'Your Contribution' as const,
  COMPENSATION: 'Compensation' as const,
  RATING: 'Rating' as const,
  YOUR_REVIEW: 'Your Review' as const,
};

export const PROFILE_RIGHT_PANEL_TABS = {
  REPOSITORIES: [
    PROFILE_RIGHT_PANEL_TAB.SKILLS_USED,
    PROFILE_RIGHT_PANEL_TAB.YOUR_CONTRIBUTION,
  ] as const,
  ORG_REVIEWS: [
    PROFILE_RIGHT_PANEL_TAB.COMPENSATION,
    PROFILE_RIGHT_PANEL_TAB.RATING,
    PROFILE_RIGHT_PANEL_TAB.YOUR_REVIEW,
  ] as const,
};

export const MAX_CONTRIBUTION_SUMMARY_LENGTH = 500;

export const LS_KEYS = {
  TOURS: {
    TECHS_USED: 'tour-techs-used' as const,
    YOUR_CONTRIBUTION: 'tour-your-contribution' as const,
    COMPENSATION: 'tour-compensation' as const,
    RATING: 'tour-rating' as const,
    YOUR_REVIEW: 'tour-your-review' as const,
  },
} as const;

// Currently all tour focus component lives inside bordered component in right-panel
// We use this constant to target highlight the content
export const TOUR_SELECTOR_ID = 'tour-selector-id';

export const COMMUNITY_NFT_ADDRESSES = {
  [COMMUNITIES.ETHDAM]: {
    address: '0xb71df844faBa80EEcE907B421652E07FFFF505B4',
    label: 'EthDam',
    chainId: polygon.id,
  },
  [COMMUNITIES.LOBSTERDAO]: {
    address: '0x026224a2940bfe258d0dbe947919b62fe321f042',
    label: 'LobsterDAO',
    chainId: mainnet.id,
  },
} as const;

export const CONTACT_FIELDS = [
  'email',
  'discord',
  'telegram',
  'farcaster',
  'lens',
  'twitter',
];

export const LOCATION_FIELDS = ['city', 'country'];
