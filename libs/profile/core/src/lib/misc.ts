import { ATS_PROVIDERS } from './constants';
import { ATSPreference } from './types';

export const DEFAULT_ATS_PREFERENCE: ATSPreference = {
  id: null,
  platformName: ATS_PROVIDERS.JOBSTASH.platformName,
  highlightOrgs: [],
  ecosystemActivations: [],
};
