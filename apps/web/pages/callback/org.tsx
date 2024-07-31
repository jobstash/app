import { useRef } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { useAccount } from 'wagmi';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useGithubLogin } from '@jobstash/auth/state';

const OrgGithubCallbackPage = () => {
  // TODO: use privy wallet address
  const { address } = useAccount();
  const { mutate } = useGithubLogin();

  const codeParam = new URLSearchParams(window.location.search).get('code');

  // Only attempt request once
  const ref = useRef(false);

  if (codeParam && address && !ref.current) {
    ref.current = true;
    mutate({ code: codeParam, wallet: address, role: CHECK_WALLET_ROLES.ORG });
  }

  return <LoadingPage />;
};

export default OrgGithubCallbackPage;
