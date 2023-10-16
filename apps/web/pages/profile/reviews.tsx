import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROUTE,
  redirectFlowsSet,
} from '@jobstash/auth/core';
import { withCSR } from '@jobstash/shared/utils';

import { getCheckWallet } from '@jobstash/auth/data';

export const getServerSideProps = withCSR(async (ctx) => {
  const cookieString = ctx.req.headers.cookie;

  const checkWalletResponse = await getCheckWallet(cookieString);

  const queryClient = new QueryClient();
  queryClient.setQueryData(['check-wallet'], checkWalletResponse);
  const dehydratedState = dehydrate(queryClient);

  const {
    data: { flow },
  } = checkWalletResponse;

  if (
    redirectFlowsSet.has(flow) &&
    flow !== CHECK_WALLET_FLOWS.ONBOARD_REVIEWS
  ) {
    return {
      redirect: {
        destination: CHECK_WALLET_ROUTE[flow],
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState,
      isOnboardSSR: flow === CHECK_WALLET_FLOWS.ONBOARD_REVIEWS,
    },
  };
});

export { ProfileReviewsPage as default } from '@jobstash/profile/pages';
