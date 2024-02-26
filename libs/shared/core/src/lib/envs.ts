/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const MW_URL = process.env.NEXT_PUBLIC_MW_URL!;
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;
export const EDGE_URL = process.env.NEXT_PUBLIC_EDGE_URL!;
export const JOB_FRAME_URL = process.env.NEXT_PUBLIC_JOB_FRAME_URL!;
export const ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;
export const PAGE_SIZE = process.env.NEXT_PUBLIC_PAGE_SIZE!;
export const INFRURA_ID = process.env.NEXT_PUBLIC_INFURA_ID!;
export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
export const IS_DEBUG = process.env.NEXT_PUBLIC_IS_DEBUG === 'true';

// TODO: put hardcode string in env
export const ORG_SIGNUP_FORM_URL = 'https://forms.gle/HWP6bUf3CB8RyJnw5';
export const TELEGRAM_URL = 'https://telegram.me/jobstash';

export const ENABLE_BASIC_AUTH = process.env.ENABLE_BASIC_AUTH;
