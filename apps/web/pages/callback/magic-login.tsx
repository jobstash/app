import { LoadingPage } from '@jobstash/shared/pages';

import { useSendMagicLinkToken } from '@jobstash/auth/state';

const MagicLoginCallbackPage = () => {
  const tokenParam = new URLSearchParams(window.location.search).get('token');

  useSendMagicLinkToken(tokenParam);

  return <LoadingPage />;
};

export default MagicLoginCallbackPage;
