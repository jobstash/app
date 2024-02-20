import 'isomorphic-fetch';

jest.setTimeout(30_000);

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// eslint-disable-next-line unicorn/consistent-function-scoping
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    publicEnvs: {
      NEXT_PUBLIC_MW_URL: '',
      NEXT_PUBLIC_FRONTEND_URL: '',
      NEXT_PUBLIC_EDGE_URL: '',
      NEXT_PUBLIC_PAGE_SIZE: '',
    },
  },
}));

jest.mock('next/font/google', () => ({
  Roboto: () => ({
    style: {
      fontFamily: 'mocked',
    },
  }),
  Lato: () => ({
    style: {
      fontFamily: 'mocked',
    },
  }),
}));
