import { GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROUTE,
  CheckWalletResponse,
  redirectFlowsSet,
} from '@jobstash/auth/core';

import { getCheckWallet } from '@jobstash/auth/data';


export const getServerSideProps = (async ({req}) => {

	// Wait 3 sec see if cookie gets value
	// eslint-disable-next-line no-promise-executor-return
	await new Promise(r => setTimeout(r, 3000))

  const cookieString = req.headers.cookie;
	const reqCookies = req.cookies

  const checkWalletResponse = await getCheckWallet(cookieString);

  const queryClient = new QueryClient();
  queryClient.setQueryData(['check-wallet'], checkWalletResponse);
  const dehydratedState = dehydrate(queryClient);

  const {
    data: { flow },
  } = checkWalletResponse;

  if (
    redirectFlowsSet.has(flow) &&
    flow !== CHECK_WALLET_FLOWS.ONBOARD_PROFILE
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
      isOnboardSSR: flow === CHECK_WALLET_FLOWS.ONBOARD_PROFILE,
      cookieString,
      checkWalletResponse,
			reqCookies
    },
  };
}) satisfies GetServerSideProps<{
	isOnboardSSR: boolean,
	cookieString: string | undefined,
	checkWalletResponse: CheckWalletResponse,
	reqCookies:  Partial<{
    [key: string]: string;
}>
}>;

export { ProfilePage as default } from '@jobstash/profile/pages';
