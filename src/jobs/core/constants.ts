import { MW_URL, PAGE_SIZE } from '~/shared/core/envs';

export const JOB_LIST_FIRST_PAGE_URL = `${MW_URL}/jobs/list?page=1&limit=${PAGE_SIZE}`;

export const JOB_TEST_IDS = {
  JOB_CARD: 'job-card',
} as const;

export const JOB_SENIORITY_MAP = {
  Intern: '1',
  Junior: '2',
  Senior: '3',
  Lead: '4',
  Head: '5',
} as const;

export const JOB_SENIORITY_SET = new Set(Object.keys(JOB_SENIORITY_MAP));

export const DEFAULT_JOB_LIST_PAGE_PARAM = 1;
