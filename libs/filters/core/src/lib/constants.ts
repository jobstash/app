export const FILTER_KIND = {
  RANGE: 'RANGE',
  SINGLE_SELECT: 'SINGLE_SELECT',
  MULTI_SELECT: 'MULTI_SELECT',
  MULTI_SELECT_WITH_SEARCH: 'MULTI_SELECT_WITH_SEARCH',
} as const;

// Seniority mapping (single use case)
export const seniorityMapping = {
  Intern: '1',
  Junior: '2',
  Senior: '3',
  Lead: '4',
  Head: '5',
};

export const FILTER_SECTION = {
  JOBS: 'jobs' as const,
  ORGANIZATIONS: 'organizations' as const,
} as const;
