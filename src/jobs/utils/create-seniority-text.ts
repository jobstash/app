import { JOB_SENIORITY_MAP } from '~/jobs/core/constants';

export const createSeniorityText = (seniority: string | null) => {
  if (!seniority) return null;

  for (const [k, v] of Object.entries(JOB_SENIORITY_MAP)) {
    if (v === seniority) return k;
  }

  return null;
};
