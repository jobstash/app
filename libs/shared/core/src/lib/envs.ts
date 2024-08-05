/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ECOSYSTEMS, ECOSYSTEMS_SET } from './constants';

export const MW_URL = process.env.NEXT_PUBLIC_MW_URL!;
export const EDGE_URL = process.env.NEXT_PUBLIC_EDGE_URL!;
export const JOB_FRAME_URL = process.env.NEXT_PUBLIC_JOB_FRAME_URL!;
export const SCORER_URL = process.env.NEXT_PUBLIC_SCORER_URL!;
export const ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;
export const PAGE_SIZE = process.env.NEXT_PUBLIC_PAGE_SIZE!;
export const INFRURA_ID = process.env.NEXT_PUBLIC_INFURA_ID!;
export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
export const IS_DEBUG = process.env.NEXT_PUBLIC_IS_DEBUG === 'true';

export const NEW_FEATURE_DIFF = process.env.NEXT_PUBLIC_NEW_FEATURE_DIFF!;

export const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;

// TODO: put hardcode string in env
export const ORG_SIGNUP_FORM_URL = 'https://forms.gle/HWP6bUf3CB8RyJnw5';
export const TELEGRAM_URL = 'https://telegram.me/jobstash';
export const DUCK_TELEGRAM_URL = 'https://telegram.me/duckdegen';
export const PDF_SAFU_URL =
  'https://drive.google.com/file/d/1VVoyR3vy9xrzy8hwzPUzxOAMvRQLZEQb/view';
export const PDF_JOBSTASH_URL =
  'https://drive.google.com/file/d/1yuVMUrqBe6EgdB76ZVusSt5AWM_QaYxo/view';
export const ENABLE_BASIC_AUTH = process.env.ENABLE_BASIC_AUTH;
export const ORG_PAGE = '/hiring';

export const FRONTEND_URL = (() => {
  const HOSTNAME = 'jobstash.xyz';
  const frontendEnv = process.env.NEXT_PUBLIC_FRONTEND_URL!;

  if (typeof window === 'undefined') return frontendEnv;

  const subdomain = window.location.hostname.split('.')[0];
  const isSupported = ECOSYSTEMS_SET.has(
    subdomain as typeof ECOSYSTEMS[keyof typeof ECOSYSTEMS],
  );

  // Return as usual if subdomain is not supported, or instance is not deployed
  if (!isSupported || !frontendEnv.includes(HOSTNAME)) return frontendEnv;

  return `https://${subdomain}.${HOSTNAME}`;
})();
