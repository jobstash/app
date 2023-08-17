export const PROFILE_RIGHT_PANEL_TAB = {
  TECHNOLOGIES_USED: 'Technologies Used' as const,
  YOUR_CONTRIBUTION: 'Your Contribution' as const,
  SALARY: 'Salary' as const,
  RATING: 'Rating' as const,
  YOUR_REVIEW: 'Your Review' as const,
};

export const PROFILE_RIGHT_PANEL_TABS = {
  REPOSITORIES: [
    PROFILE_RIGHT_PANEL_TAB.TECHNOLOGIES_USED,
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