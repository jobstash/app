export const PROFILE_RIGHT_PANEL_TAB = {
  TAGS_USED: 'Tags Used' as const,
  YOUR_CONTRIBUTION: 'Your Contribution' as const,
  SALARY: 'Salary' as const,
  RATING: 'Rating' as const,
  YOUR_REVIEW: 'Your Review' as const,
};

export const PROFILE_RIGHT_PANEL_TABS = {
  REPOSITORIES: [
    PROFILE_RIGHT_PANEL_TAB.TAGS_USED,
    PROFILE_RIGHT_PANEL_TAB.YOUR_CONTRIBUTION,
  ] as const,
  ORG_REVIEWS: [
    PROFILE_RIGHT_PANEL_TAB.SALARY,
    PROFILE_RIGHT_PANEL_TAB.RATING,
    PROFILE_RIGHT_PANEL_TAB.YOUR_REVIEW,
  ] as const,
};

export const MAX_CONTRIBUTION_SUMMARY_LENGTH = 500;

export const RATING_TITLE_MAP = {
  management: 'Management',
  careerGrowth: 'Career Growth',
  benefits: 'Benefits',
  workLifeBalance: 'Work/Life Balance',
  cultureValues: 'Culture & Values',
  diversityInclusion: 'Diversity & Inclusion',
  interviewProcess: 'Interview Process',
} as const;

export const LS_KEYS = {
  TOURS: {
    TECHS_USED: 'tour-techs-used' as const,
    YOUR_CONTRIBUTION: 'tour-your-contribution' as const,
    SALARY: 'tour-salary' as const,
    RATING: 'tour-rating' as const,
    YOUR_REVIEW: 'tour-your-review' as const,
  },
} as const;

// Currently all tour focus component lives inside bordered component in right-panel
// We use this constant to target highlight the content
export const TOUR_SELECTOR_ID = 'tour-selector-id';
