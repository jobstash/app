import { dehydrate, QueryClient } from '@tanstack/react-query';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { withCSR } from '@jobstash/shared/utils';

import { getCheckWallet } from '@jobstash/auth/data';

export { BlockedTermsPage as default } from '@jobstash/admin/pages';

export const getServerSideProps = withCSR(async (ctx) => {
  const cookieString = ctx.req.headers.cookie;

  const checkWalletResponse = await getCheckWallet(cookieString);

  const queryClient = new QueryClient();
  queryClient.setQueryData(['check-wallet'], checkWalletResponse);
  const dehydratedState = dehydrate(queryClient);

  const {
    data: { role },
  } = checkWalletResponse;

  if (role !== CHECK_WALLET_ROLES.ADMIN) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState,
    },
  };
});
