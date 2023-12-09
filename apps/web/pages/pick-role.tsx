import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROUTE,
  redirectFlowsSet,
} from '@jobstash/auth/core';
import { withCSR } from '@jobstash/shared/utils';

import { getCheckWallet } from '@jobstash/auth/data';

// TODO: Should be connected otherwise redirect

export const getServerSideProps = withCSR(async (ctx) => {
  const cookieString = ctx.req.headers.cookie;

  const checkWalletResponse = await getCheckWallet(cookieString);

  const queryClient = new QueryClient();
  queryClient.setQueryData(['check-wallet'], checkWalletResponse);
  const dehydratedState = dehydrate(queryClient);

  const {
    data: { flow },
  } = checkWalletResponse;

  console.log(
    'SSR PICK-ROLE',
    'flow',
    flow,
    'redirectFlowsSet.has(flow)',
    redirectFlowsSet.has(flow),
    'flow !== CHECK_WALLET_FLOWS.PICK_ROLE',
    flow !== CHECK_WALLET_FLOWS.PICK_ROLE,
  );

  if (flow !== CHECK_WALLET_FLOWS.PICK_ROLE) {
    return {
      redirect: {
        destination: redirectFlowsSet.has(flow)
          ? CHECK_WALLET_ROUTE[flow]
          : '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState,
      flow,
    },
  };
});

export { PickRolePage as default } from '@jobstash/auth/pages';
